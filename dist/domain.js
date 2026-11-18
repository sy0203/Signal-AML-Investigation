export const BASELINE=7600;
export const STATUS={escalate:'Escalated',request:'Information requested',close:'Closed'};
export const emptyState=()=>({version:1,evidence:false,records:[]});
export function calculate(transactions){
  const incoming=transactions.filter(t=>t.direction==='Incoming');
  const outgoing=transactions.filter(t=>t.direction==='Outgoing');
  const sum=rows=>rows.reduce((n,t)=>n+t.amount,0);
  const timestamp=t=>Date.parse(`${t.date}T${t.time}:00-05:00`);
  const last=Math.max(...incoming.map(timestamp));
  return {incoming:sum(incoming),outgoing:sum(outgoing),ratio:sum(incoming)/BASELINE,outflowShare:sum(outgoing)/sum(incoming),counterparties:new Set(incoming.map(t=>t.counterparty)).size,daily:[...new Set(incoming.map(t=>t.date))].sort().map(date=>({date,amount:sum(incoming.filter(t=>t.date===date))})),minutes:outgoing.map(t=>(timestamp(t)-last)/60000)};
}
export function validateDecision(draft,evidence){
  const errors=[];
  if(!Object.hasOwn(STATUS,draft.outcome))errors.push('Choose a decision.');
  if(typeof draft.rationale!=='string'||draft.rationale.trim().length<30)errors.push('Add a rationale of at least 30 characters explaining the evidence and the next step.');
  if(draft.rationale?.length>3000)errors.push('Keep the rationale under 3,000 characters.');
  if(draft.outcome==='close'&&!evidence)errors.push('Closure is blocked while the transfer purpose is unverified. Load the hypothetical supporting evidence to explore the closure path.');
  if(draft.outcome==='request'){
    if(!draft.requestItem?.trim())errors.push('Describe the information to request.');
    if(!draft.owner?.trim())errors.push('Add a responsible reviewer.');
    const due=Date.parse(draft.dueDate);
    if(!/^\d{4}-\d{2}-\d{2}$/.test(draft.dueDate||'')||!Number.isFinite(due)||new Date(due).toISOString().slice(0,10)!==draft.dueDate||draft.dueDate<'2026-11-14')errors.push('Choose a valid due date on or after the scenario review date, 14 Nov 2026.');
  }
  return errors;
}
export function addDecision(state,draft,now=new Date().toISOString()){
  const errors=validateDecision(draft,state.evidence);
  if(errors.length)return {errors};
  const record={id:`DEC-${String(state.records.length+1).padStart(3,'0')}`,outcome:draft.outcome,rationale:draft.rationale.trim(),at:now,evidence:state.evidence,reviewer:'Seyoung Yoo (demo)',...(draft.outcome==='request'?{requestItem:draft.requestItem.trim(),owner:draft.owner.trim(),dueDate:draft.dueDate}:{})};
  return {state:{...state,records:[...state.records,record]},record};
}
export function restoreState(raw){
  try{
    const s=JSON.parse(raw);
    if(s.version!==1||typeof s.evidence!=='boolean'||!Array.isArray(s.records)||s.records.length>200)return emptyState();
    if(!s.records.every(r=>typeof r.id==='string'&&typeof r.at==='string'&&Number.isFinite(Date.parse(r.at))&&typeof r.reviewer==='string'&&typeof r.evidence==='boolean'&&validateDecision(r,r.evidence).length===0))return emptyState();
    return {version:1,evidence:s.evidence,records:s.records};
  }catch{return emptyState();}
}
export function currentStatus(state){return state.records.length?STATUS[state.records.at(-1).outcome]:'New';}
