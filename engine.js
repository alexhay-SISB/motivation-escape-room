import {STAGES} from './content.js';
export function shuffle(items,random=()=>crypto.getRandomValues(new Uint32Array(1))[0]/4294967296){const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
export function check(task,answer){
 if(task.type==='number')return String(answer).trim()!==''&&Number(answer)===task.answer;
 if(task.type==='code')return String(answer).trim()===task.answer;
 if(!Array.isArray(answer)||answer.length!==task.items.length)return false;
 if(task.type==='order')return answer.every((v,i)=>v===i);
 return answer.every((v,i)=>Number.isInteger(v)&&v===task.items[i].answer);
}
export class Classroom{
 constructor(){this.players=new Map();this.teams=[];this.started=false;this.paused=false;this.created=Date.now();}
 join(token,name){
  if(!/^[a-f0-9]{32}$/.test(token)||typeof name!=='string')throw Error('Please reload and enter a nickname.');
  const clean=name.trim().replace(/[\u0000-\u001f\u007f]/g,'').slice(0,20);
  if(!clean)throw Error('Enter a nickname first.');
  let p=this.players.get(token);
  if(!p){if(this.players.size>=80)throw Error('This class is full.');p={token,name:clean,team:null,seat:0,online:true};this.players.set(token,p);}
  p.online=true;p.seen=Date.now();return p;
 }
 pair(){
  this.started=true;
  const waiting=shuffle([...this.players.values()].filter(p=>p.online&&p.team===null));
  while(waiting.length>=2){const pair=waiting.splice(0,2);const id=this.teams.length;const t={id,tokens:pair.map(p=>p.token),step:0,solved:[false,false],ready:[false,false],feedback:['',''],attempts:[0,0],mistakes:0,hints:0,hinted:false,score:0,history:[],started:Date.now(),finished:null};this.teams.push(t);pair.forEach((p,seat)=>{p.team=id;p.seat=seat;});}
 }
 action(token,msg){
  const p=this.players.get(token);if(!p||!p.online||p.team===null)return;
  const t=this.teams[p.team];if(this.paused||t.finished||msg.step!==t.step)return;
  // Do not progress while a partner is disconnected.
  if(t.tokens.some(k=>!this.players.get(k)?.online))return;
  const s=STAGES[t.step],seat=p.seat;
  if(msg.type==='answer'&&!t.solved[seat]){
   t.attempts[seat]++;
   if(check(s.tasks[seat],msg.answer)){t.solved[seat]=true;t.feedback[seat]='Correct — your part is unlocked.';}
   else{t.feedback[seat]='Not quite. Check your clue, talk to your partner and try again.';t.mistakes++;t.score=Math.max(0,t.score-10);}
   if(t.solved.every(Boolean))t.score+=100;
  }
  if(msg.type==='hint'&&!t.hinted){t.hinted=true;t.hints++;t.score=Math.max(0,t.score-15);}
  if(msg.type==='ready'&&t.solved.every(Boolean)){
   t.ready[seat]=true;
   if(t.ready.every(Boolean)){
    t.history.push({step:t.step,attempts:[...t.attempts],hint:t.hinted});
    t.step++;
    if(t.step>=STAGES.length)t.finished=Date.now();
    else Object.assign(t,{solved:[false,false],ready:[false,false],feedback:['',''],attempts:[0,0],hinted:false});
   }
  }
  const earned=t.history.length+(t.solved.every(Boolean)&&!t.finished?1:0);
  t.score=Math.max(0,earned*100-t.mistakes*10-t.hints*15);
 }
 view(token){
  const p=this.players.get(token);if(!p)return null;
  const base={name:p.name,waiting:[...this.players.values()].filter(x=>x.online&&x.team===null).length,started:this.started,paused:this.paused};
  if(p.team===null)return {...base,screen:'waiting'};
  const t=this.teams[p.team],partner=this.players.get(t.tokens[1-p.seat]);
  return {...base,screen:t.finished?'finished':'game',team:t.id+1,seat:p.seat,partner:partner.name,partnerOnline:partner.online,step:t.step,solved:[...t.solved],ready:[...t.ready],feedback:t.feedback[p.seat],attempts:[...t.attempts],score:t.score,mistakes:t.mistakes,hints:t.hints,hinted:t.hinted,startedAt:t.started,finishedAt:t.finished,history:t.history};
 }
 disconnect(token){const p=this.players.get(token);if(p)p.online=false;}
 remove(token){const p=this.players.get(token);if(p?.team===null)this.players.delete(token);}
}
