-- Signal: synthetic scenario reconciliation. SQLite-compatible.
-- 1. Amount and transfer counts by direction.
SELECT direction, COUNT(*) AS transfers, SUM(amount) AS total_cad
FROM transactions GROUP BY direction;

-- 2. Daily incoming value for the chart.
SELECT date, SUM(amount) AS incoming_cad FROM transactions
WHERE direction = 'Incoming' GROUP BY date ORDER BY date;

-- 3. Distinct incoming counterparties.
SELECT COUNT(DISTINCT counterparty) AS incoming_counterparties
FROM transactions WHERE direction = 'Incoming';

-- 4. Outflow timing following the final inflow. Timestamps use scenario ET.
WITH last_inflow AS (
 SELECT MAX(date || ' ' || time) AS at FROM transactions WHERE direction = 'Incoming'
)
SELECT id, amount, ROUND((julianday(date || ' ' || time)-julianday(last_inflow.at))*1440) AS minutes_after
FROM transactions CROSS JOIN last_inflow WHERE direction = 'Outgoing' ORDER BY date, time;

-- 5. Ratios use an assumed CAD 7,600 weekly baseline, not an observed baseline table.
SELECT ROUND(SUM(CASE WHEN direction='Incoming' THEN amount ELSE 0 END)/7600.0, 4) AS baseline_ratio,
 ROUND(100.0*SUM(CASE WHEN direction='Outgoing' THEN amount ELSE 0 END)/SUM(CASE WHEN direction='Incoming' THEN amount ELSE 0 END), 2) AS outflow_value_percent
FROM transactions;
