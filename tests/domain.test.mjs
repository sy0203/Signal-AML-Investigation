import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {transactions} from '../dist/data.js';
import {calculate,emptyState,addDecision,restoreState,currentStatus} from '../dist/domain.js';
test('Public CSV and prototype share exactly the same 16 synthetic records',()=>{
  const csv=readFileSync(new URL('../dist/downloads/synthetic_transactions.csv',import.meta.url),'utf8').trim().split(/\r?\n/);
  assert.equal(csv.length,17);assert.equal(transactions.length,16);
  csv.slice(1).forEach((row,i)=>{const [id,date,time,direction,counterparty,amount]=row.split(',');assert.deepEqual([transactions[i].id,transactions[i].date,transactions[i].time,transactions[i].direction,transactions[i].counterparty,transactions[i].amount],[id,date,time,direction,counterparty,Number(amount)]);assert.equal(transactions[i].synthetic,true);});
});
test('Totals, counterparties, daily values and actual transfer timing reconcile',()=>{
  const r=calculate(transactions);assert.equal(r.incoming,19600);assert.equal(r.outgoing,17800);assert.equal(r.counterparties,8);assert.deepEqual(r.minutes,[44,79]);assert.deepEqual(r.daily.map(d=>d.amount),[2750,3050,2650,3050,2550,2850,2700]);assert.equal(r.daily.reduce((n,d)=>n+d.amount,0),r.incoming);assert.ok(Math.abs(r.ratio-2.5789473684)<1e-8);assert.ok(Math.abs(r.outflowShare-.9081632653)<1e-8);
});
const draft={outcome:'escalate',rationale:'The rapid outgoing transfers and unverified purpose justify a deeper review.'};
test('Blank rationale and unsupported closure cannot produce a record',()=>{
  assert.ok(addDecision(emptyState(),{...draft,rationale:''}).errors.length);
  assert.ok(addDecision(emptyState(),{...draft,outcome:'close'}).errors.some(e=>e.includes('blocked')));
  assert.equal(emptyState().records.length,0);
});
test('Information request needs an item, responsible reviewer and valid date',()=>{
  assert.equal(addDecision(emptyState(),{...draft,outcome:'request'}).errors.length,3);
  assert.ok(addDecision(emptyState(),{...draft,outcome:'request',requestItem:'Invoices',owner:'Demo',dueDate:'2026-11-13'}).errors.length);
  assert.ok(addDecision(emptyState(),{...draft,outcome:'request',requestItem:'Invoices',owner:'Demo',dueDate:'2026-11-31'}).errors.length);
  const r=addDecision(emptyState(),{...draft,outcome:'request',requestItem:'Invoices and supplier schedule',owner:'Demo reviewer',dueDate:'2026-11-18'});
  assert.equal(currentStatus(r.state),'Information requested');assert.equal(r.record.requestItem,'Invoices and supplier schedule');
});
test('Evidence snapshot, sequential decisions and persistence remain consistent',()=>{
  const a=addDecision(emptyState(),draft,'2026-11-18T19:00:00.000Z');assert.equal(currentStatus(a.state),'Escalated');assert.equal(a.record.evidence,false);
  const b=addDecision({...a.state,evidence:true},{...draft,outcome:'close'},'2026-11-18T19:01:00.000Z');assert.equal(currentStatus(b.state),'Closed');assert.equal(b.state.records[0].evidence,false);assert.equal(b.state.records[1].evidence,true);assert.equal(b.record.id,'DEC-002');assert.deepEqual(restoreState(JSON.stringify(b.state)),b.state);
});
test('Corrupt or incompatible local records safely reset to the initial scenario',()=>{
  for(const raw of ['{bad','null','{}',JSON.stringify({version:1,evidence:true,records:[{outcome:'close'}]}),JSON.stringify({version:2,evidence:true,records:[]})])assert.deepEqual(restoreState(raw),emptyState());
});
