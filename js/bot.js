/* ================================================================
   AI HEALTH ASSISTANT — Dr. Sarojdhara Hospital
   Clean White/Navy theme matching site design
   ================================================================ */
(function(){

const CSS = `
#sdh-fab {
  position:fixed!important; bottom:140px!important; right:24px!important;
  z-index:2147483640!important; display:flex!important; align-items:center!important;
  gap:10px!important; background:linear-gradient(135deg,#0369a1,#0d9488)!important;
  color:#fff!important; border:none!important; border-radius:50px!important;
  padding:10px 18px 10px 12px!important; cursor:pointer!important;
  box-shadow:0 4px 20px rgba(3,105,161,0.4)!important;
  font-family:'Inter',sans-serif!important;
  transition:all 0.25s!important;
}
#sdh-fab:hover{transform:translateY(-2px)!important;box-shadow:0 8px 28px rgba(3,105,161,0.5)!important;}
#sdh-fab .f-ico{font-size:18px!important;flex-shrink:0!important;}
#sdh-fab .f-txt{display:flex!important;flex-direction:column!important;line-height:1.25!important;}
#sdh-fab .f-main{font-size:12px!important;font-weight:700!important;}
#sdh-fab .f-sub {font-size:10px!important;opacity:0.8!important;}

#sdh-panel {
  position:fixed!important; bottom:140px!important; right:24px!important;
  z-index:2147483641!important; width:340px!important;
  background:#ffffff!important; border-radius:20px!important;
  box-shadow:0 20px 60px rgba(13,43,78,0.2),0 0 0 1px rgba(13,43,78,0.08)!important;
  display:none!important; flex-direction:column!important; overflow:hidden!important;
  font-family:'Inter',sans-serif!important; max-height:580px!important;
}
#sdh-panel.open{display:flex!important;animation:panelIn 0.3s cubic-bezier(.16,1,.3,1) both!important;}

.p-head{
  background:linear-gradient(135deg,#0d2b4e,#0369a1)!important;
  padding:14px 16px!important; display:flex!important; align-items:center!important;
  justify-content:space-between!important; flex-shrink:0!important;
}
.p-head-l{display:flex!important;align-items:center!important;gap:10px!important;}
.p-av{width:36px!important;height:36px!important;background:rgba(255,255,255,0.15)!important;border-radius:50%!important;display:flex!important;align-items:center!important;justify-content:center!important;font-size:18px!important;}
.p-name{font-size:13px!important;color:#fff!important;font-weight:700!important;}
.p-status{font-size:10px!important;color:rgba(255,255,255,0.7)!important;display:flex!important;align-items:center!important;gap:4px!important;margin-top:1px!important;}
.p-dot{width:6px!important;height:6px!important;background:#4ade80!important;border-radius:50%!important;animation:blink 1.5s infinite!important;}
.p-close{background:rgba(255,255,255,0.15)!important;border:none!important;color:#fff!important;width:28px!important;height:28px!important;border-radius:50%!important;cursor:pointer!important;font-size:13px!important;display:flex!important;align-items:center!important;justify-content:center!important;}
.p-close:hover{background:rgba(255,255,255,0.25)!important;}

.p-prog{background:#f1f5f9!important;padding:7px 14px!important;display:flex!important;align-items:center!important;gap:8px!important;flex-shrink:0!important;}
.prog-bar{flex:1!important;height:3px!important;background:#e2e8f0!important;border-radius:2px!important;overflow:hidden!important;}
.prog-fill{height:100%!important;background:linear-gradient(135deg,#0369a1,#0d9488)!important;border-radius:2px!important;transition:width 0.4s!important;}
.prog-lbl{font-size:10px!important;color:#94a3b8!important;white-space:nowrap!important;}

.p-body{flex:1!important;overflow-y:auto!important;padding:12px 10px!important;display:flex!important;flex-direction:column!important;gap:8px!important;background:#f8fafc!important;min-height:160px!important;max-height:260px!important;}
.p-body::-webkit-scrollbar{width:3px!important;}
.p-body::-webkit-scrollbar-thumb{background:#cbd5e1!important;border-radius:2px!important;}

.msg{display:flex!important;gap:7px!important;align-items:flex-end!important;animation:msgIn 0.2s ease!important;}
.msg.user{flex-direction:row-reverse!important;}
.bubble{max-width:82%!important;padding:9px 13px!important;border-radius:12px!important;font-size:12.5px!important;line-height:1.55!important;}
.msg.bot  .bubble{background:#fff!important;color:#1e293b!important;border:1px solid #e2e8f0!important;border-bottom-left-radius:3px!important;}
.msg.user .bubble{background:linear-gradient(135deg,#0369a1,#0d9488)!important;color:#fff!important;border-bottom-right-radius:3px!important;}
.av{font-size:16px!important;flex-shrink:0!important;}

.typing{display:flex!important;gap:4px!important;align-items:center!important;padding:9px 13px!important;background:#fff!important;border:1px solid #e2e8f0!important;border-radius:12px!important;border-bottom-left-radius:3px!important;width:fit-content!important;}
.typing span{width:6px!important;height:6px!important;background:#94a3b8!important;border-radius:50%!important;animation:dot 1.2s infinite!important;}
.typing span:nth-child(2){animation-delay:0.2s!important;}
.typing span:nth-child(3){animation-delay:0.4s!important;}

.p-opts{padding:8px 10px!important;display:flex!important;flex-wrap:wrap!important;gap:6px!important;background:#fff!important;border-top:1px solid #f1f5f9!important;min-height:48px!important;flex-shrink:0!important;}
.opt{
  background:#f8fafc!important;border:1.5px solid #e2e8f0!important;
  color:#0369a1!important;padding:6px 12px!important;border-radius:20px!important;
  font-size:11.5px!important;font-weight:500!important;cursor:pointer!important;
  transition:all 0.2s!important;font-family:'Inter',sans-serif!important;
}
.opt:hover,.opt.picked{background:linear-gradient(135deg,#0369a1,#0d9488)!important;color:#fff!important;border-color:transparent!important;}

.summary-box{background:#f0fdf4!important;border:1px solid #bbf7d0!important;border-radius:12px!important;padding:12px!important;margin:4px 0!important;}
.sb-title{font-size:10px!important;font-weight:700!important;letter-spacing:1px!important;text-transform:uppercase!important;color:#0d9488!important;margin-bottom:8px!important;}
.sb-row{display:flex!important;gap:7px!important;margin-bottom:5px!important;font-size:11.5px!important;}
.sb-lbl{color:#94a3b8!important;min-width:80px!important;flex-shrink:0!important;}
.sb-val{color:#1e293b!important;font-weight:600!important;}
.wa-final{width:100%!important;padding:10px!important;margin-top:10px!important;background:#25d366!important;color:#fff!important;border:none!important;border-radius:10px!important;font-size:12.5px!important;font-weight:700!important;cursor:pointer!important;display:flex!important;align-items:center!important;justify-content:center!important;gap:7px!important;font-family:'Inter',sans-serif!important;transition:all 0.2s!important;}
.wa-final:hover{background:#20ba58!important;transform:translateY(-1px)!important;}

.p-inp{padding:8px 10px!important;background:#fff!important;border-top:1px solid #f1f5f9!important;display:flex!important;gap:7px!important;flex-shrink:0!important;}
.inp{flex:1!important;background:#f8fafc!important;border:1.5px solid #e2e8f0!important;border-radius:10px!important;padding:8px 11px!important;color:#1e293b!important;font-size:12.5px!important;font-family:'Inter',sans-serif!important;outline:none!important;}
.inp:focus{border-color:#0369a1!important;}
.send{width:34px!important;height:34px!important;background:linear-gradient(135deg,#0369a1,#0d9488)!important;border:none!important;border-radius:10px!important;color:#fff!important;font-size:13px!important;cursor:pointer!important;display:flex!important;align-items:center!important;justify-content:center!important;flex-shrink:0!important;}

@keyframes panelIn{from{opacity:0;transform:translateY(16px) scale(0.97)}to{opacity:1;transform:translateY(0) scale(1)}}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0.3}}
@keyframes dot{0%,80%,100%{transform:scale(0.7);opacity:0.4}40%{transform:scale(1);opacity:1}}
@keyframes msgIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}

@media(max-width:480px){
  #sdh-panel{width:calc(100vw - 16px)!important;right:8px!important;}
  #sdh-fab{right:8px!important;}
}
`;

const style = document.createElement('style');
style.textContent = CSS;
document.head.appendChild(style);

const state = { step:0, name:'', age:'', gender:'', phone:'', problem:'', symptoms:[], duration:'', severity:'', time:'' };
const TOTAL = 9;

const flow = [
  { bot:"👋 Namaste! I'm Dr. Sarojdhara's AI Assistant.\n\nI'll help you describe your concern and book an appointment. May I have your name?", type:'input', placeholder:'Your full name...', save:v=>{state.name=v;}, next:()=>`Nice to meet you, ${state.name}! 😊` },
  { bot:()=>`How old are you, ${state.name.split(' ')[0]}?`, type:'opts', opts:['Under 18','18–25','26–35','36–45','46–55','55+'], save:v=>{state.age=v;}, next:()=>'Got it!' },
  { bot:'What is your gender?', type:'opts', opts:['Female 👩','Male 👨','Prefer not to say'], save:v=>{state.gender=v;}, next:()=>'Thank you!' },
  { bot:()=>`${state.name.split(' ')[0]}, what is your primary concern today?`, type:'opts', opts:['🤰 Pregnancy / Maternity','👶 Delivery Planning','🩺 Gynecology Issue','📷 Sonography / Ultrasound','💊 PCOS / Irregular Periods','🔬 Infertility','🏥 Laparoscopic Surgery','🍼 Newborn / Neonatal Care','✂️ Nsbandi / Sterilization','🩹 Post-Delivery Care','🆘 Emergency','❓ Other'], save:v=>{state.problem=v;}, next:()=>`Noted — ${state.problem}.` },
  { bot:'Which symptoms are you experiencing? (Select all, then tap Done)', type:'multi', opts:['Pain / Cramping','Bleeding','Nausea / Vomiting','Swelling','Fever','Dizziness','Fatigue','Back Pain','Irregular Periods','Discharge','No Symptoms'], save:v=>{state.symptoms.push(v);}, done:'✅ Done', next:()=>'Symptoms noted.' },
  { bot:'How long have you been experiencing this?', type:'opts', opts:['Just started today','1–3 days','4–7 days','1–2 weeks','More than 2 weeks','Months / Chronic'], save:v=>{state.duration=v;}, next:()=>'Understood.' },
  { bot:'How severe is your condition?', type:'opts', opts:['😌 Mild — manageable','😐 Moderate — affecting daily life','😣 Severe — urgent help needed','🚨 Emergency — critical'], save:v=>{state.severity=v;}, next:()=>'Thank you for sharing.' },
  { bot:'What is your WhatsApp number for appointment confirmation?', type:'input', placeholder:'10-digit WhatsApp number...', save:v=>{state.phone=v;}, next:()=>'📱 Perfect!' },
  { bot:'When would you prefer to visit?', type:'opts', opts:['🌅 Morning OPD (10AM–2PM)','🌆 Evening OPD (6PM–9PM)','📅 Any available slot','🚨 Urgent / Emergency'], save:v=>{state.time=v;}, next:()=>"Great! Here's your summary." }
];

let multiSel = [];

document.body.insertAdjacentHTML('beforeend',`
  <button id="sdh-fab">
    <span class="f-ico">🏥</span>
    <span class="f-txt"><span class="f-main">AI Health Assistant</span><span class="f-sub">Book Appointment</span></span>
  </button>
  <div id="sdh-panel">
    <div class="p-head">
      <div class="p-head-l"><div class="p-av">🏥</div><div><div class="p-name">Dr. Sarojdhara AI</div><div class="p-status"><span class="p-dot"></span>Online</div></div></div>
      <button class="p-close" id="pClose">✕</button>
    </div>
    <div class="p-prog"><div class="prog-bar"><div class="prog-fill" id="pFill" style="width:0%"></div></div><span class="prog-lbl" id="pLbl">Step 0/${TOTAL}</span></div>
    <div class="p-body" id="pBody"></div>
    <div class="p-opts" id="pOpts"></div>
    <div class="p-inp" id="pInp" style="display:none"><input class="inp" id="pInput" placeholder="Type here..."/><button class="send" id="pSend">➤</button></div>
  </div>
`);

const fab   = document.getElementById('sdh-fab');
const panel = document.getElementById('sdh-panel');
const pClose= document.getElementById('pClose');
const pBody = document.getElementById('pBody');
const pOpts = document.getElementById('pOpts');
const pInp  = document.getElementById('pInp');
const pInput= document.getElementById('pInput');
const pSend = document.getElementById('pSend');
const pFill = document.getElementById('pFill');
const pLbl  = document.getElementById('pLbl');

fab.addEventListener('click',()=>{
  panel.classList.toggle('open');
  if(panel.classList.contains('open') && pBody.children.length===0) setTimeout(()=>ask(0),350);
});
pClose.addEventListener('click',()=>panel.classList.remove('open'));

function scroll(){ pBody.scrollTop = pBody.scrollHeight; }
function addMsg(txt,who='bot'){
  const d=document.createElement('div'); d.className=`msg ${who}`;
  d.innerHTML=who==='bot'
    ?`<span class="av">🏥</span><div class="bubble">${txt.replace(/\n/g,'<br>')}</div>`
    :`<div class="bubble">${txt}</div><span class="av">👤</span>`;
  pBody.appendChild(d); scroll();
}
function showTyping(){ const d=document.createElement('div'); d.className='msg bot'; d.id='pTyp'; d.innerHTML='<span class="av">🏥</span><div class="typing"><span></span><span></span><span></span></div>'; pBody.appendChild(d); scroll(); }
function hideTyping(){ const t=document.getElementById('pTyp'); if(t) t.remove(); }
function clearOpts(){ pOpts.innerHTML=''; pInp.style.display='none'; }
function setProgress(n){ const p=Math.round(n/TOTAL*100); pFill.style.width=p+'%'; pLbl.textContent=`Step ${n}/${TOTAL}`; }

function ask(idx){
  if(idx>=flow.length){ showSummary(); return; }
  const s=flow[idx]; multiSel=[]; clearOpts(); setProgress(idx+1);
  const txt=typeof s.bot==='function'?s.bot():s.bot;
  showTyping();
  setTimeout(()=>{
    hideTyping(); addMsg(txt);
    if(s.type==='input'){
      pInp.style.display='flex'; pInput.value=''; pInput.placeholder=s.placeholder||'Type here...'; pInput.focus();
      const go=()=>{ const v=pInput.value.trim(); if(!v) return; addMsg(v,'user'); s.save(v); clearOpts(); const n=s.next?s.next():''; if(n){showTyping();setTimeout(()=>{hideTyping();addMsg(n);setTimeout(()=>ask(idx+1),400);},700);}else setTimeout(()=>ask(idx+1),300); };
      pSend.onclick=go; pInput.onkeydown=e=>{if(e.key==='Enter')go();};
    } else if(s.type==='opts'){
      s.opts.forEach(o=>{ const b=document.createElement('button'); b.className='opt'; b.textContent=o; b.onclick=()=>{ pOpts.querySelectorAll('.opt').forEach(x=>x.classList.remove('picked')); b.classList.add('picked'); addMsg(o,'user'); s.save(o); clearOpts(); const n=s.next?s.next():''; if(n){showTyping();setTimeout(()=>{hideTyping();addMsg(n);setTimeout(()=>ask(idx+1),400);},700);}else setTimeout(()=>ask(idx+1),300); }; pOpts.appendChild(b); });
    } else if(s.type==='multi'){
      s.opts.forEach(o=>{ const b=document.createElement('button'); b.className='opt'; b.textContent=o; b.onclick=()=>{ if(b.classList.contains('picked')){b.classList.remove('picked');multiSel=multiSel.filter(x=>x!==o);}else{b.classList.add('picked');multiSel.push(o);s.save(o);} }; pOpts.appendChild(b); });
      const db=document.createElement('button'); db.className='opt'; db.textContent=s.done||'✅ Done'; db.style.cssText='background:linear-gradient(135deg,#0369a1,#0d9488)!important;color:#fff!important;border-color:transparent!important;font-weight:700!important;';
      db.onclick=()=>{ const chosen=multiSel.length?multiSel.join(', '):'None'; addMsg(chosen,'user'); clearOpts(); const n=s.next?s.next():''; if(n){showTyping();setTimeout(()=>{hideTyping();addMsg(n);setTimeout(()=>ask(idx+1),400);},700);}else setTimeout(()=>ask(idx+1),300); }; pOpts.appendChild(db);
    }
  }, 800);
}

function showSummary(){
  setProgress(TOTAL); clearOpts();
  showTyping();
  setTimeout(()=>{
    hideTyping();
    const sym=state.symptoms.length?state.symptoms.join(', '):'None';
    const html=`<div class="summary-box"><div class="sb-title">📋 Appointment Summary</div><div class="sb-row"><span class="sb-lbl">👤 Name</span><span class="sb-val">${state.name}</span></div><div class="sb-row"><span class="sb-lbl">🎂 Age</span><span class="sb-val">${state.age}</span></div><div class="sb-row"><span class="sb-lbl">⚧ Gender</span><span class="sb-val">${state.gender}</span></div><div class="sb-row"><span class="sb-lbl">📞 WhatsApp</span><span class="sb-val">${state.phone}</span></div><div class="sb-row"><span class="sb-lbl">🩺 Concern</span><span class="sb-val">${state.problem}</span></div><div class="sb-row"><span class="sb-lbl">🔴 Symptoms</span><span class="sb-val">${sym}</span></div><div class="sb-row"><span class="sb-lbl">⏳ Duration</span><span class="sb-val">${state.duration}</span></div><div class="sb-row"><span class="sb-lbl">⏰ Preferred</span><span class="sb-val">${state.time}</span></div><button class="wa-final" id="waFinal">📲 Send WhatsApp &amp; Book Appointment</button></div>`;
    const d=document.createElement('div'); d.className='msg bot';
    d.innerHTML=`<span class="av">🏥</span><div class="bubble" style="max-width:96%!important;width:100%!important">${html}</div>`;
    pBody.appendChild(d); scroll();
    document.getElementById('waFinal').onclick=sendWA;
    const rb=document.createElement('button'); rb.className='opt'; rb.textContent='🔄 Start Over';
    rb.onclick=()=>{ Object.assign(state,{step:0,name:'',age:'',gender:'',phone:'',problem:'',symptoms:[],duration:'',severity:'',time:''}); pBody.innerHTML=''; clearOpts(); setTimeout(()=>ask(0),200); };
    pOpts.appendChild(rb);
  }, 900);
}

function sendWA(){
  const sym=state.symptoms.length?state.symptoms.join(', '):'None';
  const msg=`🏥 *Appointment Request — Dr. Sarojdhara Hospital*\n\n👤 *Name:* ${state.name}\n🎂 *Age:* ${state.age} | *Gender:* ${state.gender}\n📞 *WhatsApp:* ${state.phone}\n🩺 *Concern:* ${state.problem}\n🔴 *Symptoms:* ${sym}\n⏳ *Duration:* ${state.duration}\n📊 *Severity:* ${state.severity}\n⏰ *Preferred:* ${state.time}\n\n_Please confirm my appointment. Thank you!_\n_Dr. Sarojdhara Hospital, Shikargah, Jodhpur_`;
  window.open(`https://wa.me/919829888702?text=${encodeURIComponent(msg)}`,'_blank');
}
})();
