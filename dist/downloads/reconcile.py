"""Reproduce the Signal scenario checks. Python 3; standard library only."""
from pathlib import Path
from datetime import datetime
from decimal import Decimal
import csv
import json
import sqlite3

HERE = Path(__file__).resolve().parent
rows = list(csv.DictReader((HERE / 'synthetic_transactions.csv').open(encoding='utf-8-sig')))
assert len(rows) == 16 and len({r['id'] for r in rows}) == 16
assert all(r['synthetic'] == 'True' and r['currency'] == 'CAD' and r['customer'] == 'C-0184' for r in rows)
for r in rows:
    r['amount'] = int(r['amount'])
    r['at'] = datetime.fromisoformat(r['date'] + 'T' + r['time'])
assert all(r['amount'] > 0 for r in rows)
assert [r['at'] for r in rows] == sorted(r['at'] for r in rows)
incoming = [r for r in rows if r['direction'] == 'Incoming']
outgoing = [r for r in rows if r['direction'] == 'Outgoing']
in_total = sum(r['amount'] for r in incoming)
out_total = sum(r['amount'] for r in outgoing)
last_in = max(r['at'] for r in incoming)
minutes = [int((r['at'] - last_in).total_seconds() / 60) for r in outgoing]
daily = {}
for r in incoming:
    daily[r['date']] = daily.get(r['date'], 0) + r['amount']
assert in_total == 19600 and out_total == 17800
assert len(incoming) == 14 and len(outgoing) == 2
assert len({r['counterparty'] for r in incoming}) == 8
assert minutes == [44, 79]
assert list(daily.values()) == [2750, 3050, 2650, 3050, 2550, 2850, 2700]

con = sqlite3.connect(':memory:')
con.execute('CREATE TABLE transactions (id TEXT PRIMARY KEY,date TEXT,time TEXT,direction TEXT,counterparty TEXT,amount INTEGER,currency TEXT,channel TEXT,customer TEXT,synthetic TEXT)')
con.executemany('INSERT INTO transactions VALUES (?,?,?,?,?,?,?,?,?,?)', [(r['id'],r['date'],r['time'],r['direction'],r['counterparty'],r['amount'],r['currency'],r['channel'],r['customer'],r['synthetic']) for r in rows])
sql_totals = dict(con.execute('SELECT direction,SUM(amount) FROM transactions GROUP BY direction'))
assert sql_totals == {'Incoming': in_total, 'Outgoing': out_total}
assert dict(con.execute("SELECT date,SUM(amount) FROM transactions WHERE direction='Incoming' GROUP BY date ORDER BY date")) == daily
assert con.execute("SELECT COUNT(DISTINCT counterparty) FROM transactions WHERE direction='Incoming'").fetchone()[0] == 8
sql_minutes = [int(r[0]) for r in con.execute("WITH last_in AS (SELECT MAX(date||' '||time) AS at FROM transactions WHERE direction='Incoming') SELECT ROUND((julianday(date||' '||time)-julianday(last_in.at))*1440) FROM transactions CROSS JOIN last_in WHERE direction='Outgoing' ORDER BY date,time")]
assert sql_minutes == minutes

result = {
    'dataset': 'Signal fictional investigation scenario',
    'rows': len(rows), 'unique_transaction_ids': 16,
    'incoming_transfers': len(incoming), 'outgoing_transfers': len(outgoing),
    'incoming_counterparties': 8, 'incoming_cad': in_total, 'outgoing_cad': out_total,
    'scenario_weekly_baseline_cad': 7600,
    'incoming_to_baseline_ratio': float(Decimal(in_total) / Decimal(7600)),
    'outgoing_to_incoming_percent': float(Decimal(out_total) / Decimal(in_total) * 100),
    'minutes_after_last_inflow': minutes, 'daily_incoming_cad': daily,
    'python_sql_agree': True,
    'limitations': ['One synthetic case', 'No ground-truth laundering labels', 'Assumed baseline and rule', 'No tracing of specific funds', 'No model or business-impact evaluation']
}
(HERE / 'reconciliation-results.json').write_text(json.dumps(result, indent=2) + '\n', encoding='utf-8')
print(json.dumps(result, indent=2))
print('PASS: all scenario assertions and independent SQL comparisons agree.')
