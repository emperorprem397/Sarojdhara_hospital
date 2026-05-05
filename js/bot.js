/* ============================================================
   AI HEALTH ASSISTANT — Dr. Sarojdhara Hospital
   Patient Symptom Collector → WhatsApp Appointment
   Blue/Teal Medical Theme | Bottom-RIGHT corner
   ============================================================ */

(function () {

const CSS = `
  #sdh-fab {
    position:fixed!important; bottom:90px!important; right:24px!important;
    z-index:2147483640!important; display:flex!important; align-items:center!important;
    gap:10px!important; background:linear-gradient(135deg,#0369a1,#0d9488)!important;
    color:#fff!important; border:none!important; border-radius:50px!important;
    padding:11px 18px 11px 13px!important; cursor:pointer!important;
    box-shadow:0 6px 28px rgba(3,105,161,0.5)!important;
    font-family:'DM Sans',sans-serif!important;
    animation:sdhBounce 1s ease 3s both!important;
  }
  #sdh-fab:hover{transform:translateY(-3px)!important;box-shadow:0 12px 36px rgba(3,105,161,0.6)!important;}
  #sdh-fab .sdh-fab-icon{font-size:22px!important;flex-shrink:0!important;}
  #sdh-fab .sdh-fab-txt{display:flex!important;flex-direction:column!important;line-height:1.25!important;}
  #sdh-fab .sdh-fab-title{font-size:13px!important;font-weight:700!important;}
  #sdh-fab .sdh-fab-sub{font-size:10px!important;opacity:0.85!important;}

  #sdh-panel {
    position:fixed!important; bottom:90px!important; right:24px!important;
    z-index:2147483641!important; width:350px!important; max-height:600px!important;
    background:#03111f!important; border-radius:20px!important;
    box-shadow:0 24px 64px rgba(0,0,0,0.55),0 0 0 1px rgba(3,105,161,0.35)!important;
    display:none!important; flex-direction:column!important; overflow:hidden!important;
    font-family:'DM Sans',sans-serif!important;
  }
  #sdh-panel.sdh-open{display:flex!important;animation:sdhSlideUp 0.35s cubic-bezier(.16,1,.3,1) both!important;}

  .sdh-head{
    background:linear-gradient(135deg,#0369a1,#0d9488)!important;
    padding:16px 18px!important; display:flex!important; align-items:center!important;
    justify-content:space-between!important; flex-shrink:0!important;
  }
  .sdh-head-left{display:flex!important;align-items:center!important;gap:12px!important;}
  .sdh-head-avatar{
    width:42px!important;height:42px!important;
    background:rgba(255,255,255,0.2)!important;border-radius:50%!important;
    display:flex!important;align-items:center!important;justify-content:center!important;
    font-size:22px!important;flex-shrink:0!important;
  }
  .sdh-head-name{font-size:14px!important;color:#fff!important;font-weight:700!important;}
  .sdh-head-status{font-size:10px!important;color:rgba(255,255,255,0.8)!important;display:flex!important;align-items:center!important;gap:5px!important;margin-top:2px!important;}
  .sdh-head-dot{width:7px!important;height:7px!important;background:#4ade80!important;border-radius:50%!important;display:inline-block!important;animation:sdhBlink 1.5s infinite!important;}
  .sdh-close{background:rgba(255,255,255,0.2)!important;border:none!important;color:#fff!important;width:32px!important;height:32px!important;border-radius:50%!important;cursor:pointer!important;font-size:15px!important;display:flex!important;align-items:center!important;justify-content:center!important;}
  .sdh-close:hover{background:rgba(255,255,255,0.35)!important;}

  .sdh-progress{
    background:rgba(255,255,255,0.1)!important;padding:8px 16px!important;
    display:flex!important;align-items:center!important;gap:8px!important;flex-shrink:0!important;
  }
  .sdh-prog-bar{flex:1!important;height:3px!important;background:rgba(255,255,255,0.15)!important;border-radius:2px!important;overflow:hidden!important;}
  .sdh-prog-fill{height:100%!important;background:rgba(255,255,255,0.7)!important;border-radius:2px!important;transition:width 0.4s ease!important;}
  .sdh-prog-label{font-size:10px!important;color:rgba(255,255,255,0.7)!important;white-space:nowrap!important;}

  .sdh-body{
    flex:1!important;overflow-y:auto!important;padding:14px 12px!important;
    display:flex!important;flex-direction:column!important;gap:10px!important;
    background:#050e1a!important;min-height:180px!important;max-height:300px!important;
  }
  .sdh-body::-webkit-scrollbar{width:3px!important;}
  .sdh-body::-webkit-scrollbar-thumb{background:#0369a1!important;border-radius:2px!important;}

  .sdh-msg{display:flex!important;gap:8px!important;align-items:flex-end!important;animation:sdhMsgIn 0.25s ease!important;}
  .sdh-msg.sdh-user{flex-direction:row-reverse!important;}
  .sdh-bubble{max-width:84%!important;padding:10px 14px!important;border-radius:14px!important;font-size:13px!important;line-height:1.6!important;color:#e2eaf5!important;}
  .sdh-msg.sdh-bot .sdh-bubble{background:#0d1f35!important;border-bottom-left-radius:3px!important;}
  .sdh-msg.sdh-user .sdh-bubble{background:linear-gradient(135deg,#0369a1,#0d9488)!important;color:#fff!important;border-bottom-right-radius:3px!important;}
  .sdh-avatar{font-size:18px!important;flex-shrink:0!important;}

  .sdh-typing{display:flex!important;gap:4px!important;align-items:center!important;padding:10px 14px!important;background:#0d1f35!important;border-radius:14px!important;border-bottom-left-radius:3px!important;width:fit-content!important;}
  .sdh-typing span{width:7px!important;height:7px!important;background:#0369a1!important;border-radius:50%!important;animation:sdhDot 1.2s infinite!important;}
  .sdh-typing span:nth-child(2){animation-delay:0.2s!important;}
  .sdh-typing span:nth-child(3){animation-delay:0.4s!important;}

  .sdh-opts{
    padding:10px 12px!important;display:flex!important;flex-wrap:wrap!important;gap:7px!important;
    background:#03111f!important;border-top:1px solid rgba(3,105,161,0.2)!important;
    min-height:52px!important;flex-shrink:0!important;
  }
  .sdh-opt{
    background:#0d1f35!important;border:1.5px solid rgba(3,105,161,0.25)!important;
    color:#7dd3fc!important;padding:7px 13px!important;border-radius:20px!important;
    font-size:12px!important;font-weight:500!important;cursor:pointer!important;
    transition:all 0.2s!important;font-family:'DM Sans',sans-serif!important;
  }
  .sdh-opt:hover,.sdh-opt.sdh-picked{background:linear-gradient(135deg,#0369a1,#0d9488)!important;color:#fff!important;border-color:transparent!important;}

  .sdh-summary{
    background:#071526!important;border:1px solid rgba(3,105,161,0.3)!important;
    border-radius:12px!important;padding:14px!important;margin:4px 0!important;
  }
  .sdh-summary-title{font-size:11px!important;font-weight:700!important;letter-spacing:1px!important;text-transform:uppercase!important;color:#38bdf8!important;margin-bottom:10px!important;}
  .sdh-summary-row{display:flex!important;gap:8px!important;margin-bottom:6px!important;font-size:12px!important;}
  .sdh-summary-label{color:#64748b!important;min-width:90px!important;flex-shrink:0!important;}
  .sdh-summary-val{color:#e2eaf5!important;font-weight:500!important;}
  .sdh-wa-btn{
    width:100%!important;padding:12px!important;margin-top:12px!important;
    background:linear-gradient(135deg,#25d366,#128c7e)!important;
    color:#fff!important;border:none!important;border-radius:10px!important;
    font-size:13px!important;font-weight:700!important;cursor:pointer!important;
    display:flex!important;align-items:center!important;justify-content:center!important;gap:8px!important;
    font-family:'DM Sans',sans-serif!important;transition:all 0.2s!important;
  }
  .sdh-wa-btn:hover{transform:translateY(-2px)!important;box-shadow:0 6px 20px rgba(37,211,102,0.4)!important;}

  .sdh-input-row{
    padding:10px 12px!important;background:#03111f!important;
    border-top:1px solid rgba(3,105,161,0.15)!important;
    display:flex!important;gap:8px!important;flex-shrink:0!important;
  }
  .sdh-text-input{
    flex:1!important;background:#0d1f35!important;border:1.5px solid rgba(3,105,161,0.2)!important;
    border-radius:10px!important;padding:9px 12px!important;color:#e2eaf5!important;
    font-size:13px!important;font-family:'DM Sans',sans-serif!important;outline:none!important;
  }
  .sdh-text-input:focus{border-color:#0369a1!important;}
  .sdh-text-input::placeholder{color:#334155!important;}
  .sdh-send{
    width:36px!important;height:36px!important;background:linear-gradient(135deg,#0369a1,#0d9488)!important;
    border:none!important;border-radius:10px!important;color:#fff!important;
    font-size:14px!important;cursor:pointer!important;display:flex!important;
    align-items:center!important;justify-content:center!important;flex-shrink:0!important;
  }
  .sdh-send:hover{opacity:0.85!important;}

  @keyframes sdhSlideUp{from{opacity:0;transform:translateY(20px) scale(0.97)}to{opacity:1;transform:translateY(0) scale(1)}}
  @keyframes sdhBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
  @keyframes sdhBlink{0%,100%{opacity:1}50%{opacity:0.3}}
  @keyframes sdhDot{0%,80%,100%{transform:scale(0.7);opacity:0.4}40%{transform:scale(1);opacity:1}}
  @keyframes sdhMsgIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}

  @media(max-width:480px){
    #sdh-panel{width:calc(100vw - 20px)!important;right:10px!important;}
    #sdh-fab{right:10px!important;}
  }
`;

// ── INJECT CSS ──
const style = document.createElement('style');
style.textContent = CSS;
document.head.appendChild(style);

// ── STATE ──
const state = {
  step: 0,
  name: '', age: '', gender: '', phone: '',
  problem: '', symptoms: [], duration: '', severity: '',
  preferredTime: ''
};

const TOTAL_STEPS = 9;

// ── FLOW DEFINITION ──
const flow = [
  {
    bot: "👋 Namaste! I'm Dr. Sarojdhara's AI Health Assistant.\n\nI'll help you describe your health concern and book an appointment. May I have your name?",
    type: 'input',
    placeholder: 'Enter your full name…',
    save: v => { state.name = v; },
    next: () => `Nice to meet you, ${state.name}! 😊`
  },
  {
    bot: () => `How old are you, ${state.name.split(' ')[0]}?`,
    type: 'options',
    opts: ['Under 18','18–25','26–35','36–45','46–55','55+'],
    save: v => { state.age = v; },
    next: () => 'Got it!'
  },
  {
    bot: 'What is your gender?',
    type: 'options',
    opts: ['Female 👩','Male 👨','Prefer not to say'],
    save: v => { state.gender = v; },
    next: () => 'Thank you!'
  },
  {
    bot: () => `${state.name.split(' ')[0]}, what is your primary health concern today?`,
    type: 'options',
    opts: [
      '🤰 Pregnancy / Maternity',
      '👶 Delivery Planning',
      '🩺 Gynecology Issue',
      '📷 Sonography / Ultrasound',
      '💊 PCOS / Irregular Periods',
      '🔬 Infertility',
      '🏥 Laparoscopic Surgery',
      '🍼 Newborn / Neonatal Care',
      '✂️ Nsbandi / Sterilization',
      '🩹 Post-Delivery Care',
      '🆘 Emergency',
      '❓ Other / General'
    ],
    save: v => { state.problem = v; },
    next: () => `I see. Let me note down more about your ${state.problem} concern.`
  },
  {
    bot: 'Which symptoms are you experiencing? (Select all that apply — tap each one)',
    type: 'multi',
    opts: [
      'Pain / Cramping','Bleeding','Nausea / Vomiting','Swelling',
      'Fever','Dizziness','Fatigue','Back Pain',
      'Irregular Periods','Discharge','Difficulty Urinating','No Symptoms'
    ],
    save: v => { state.symptoms.push(v); },
    done: '✅ Done — Next',
    next: () => 'Noted your symptoms.'
  },
  {
    bot: 'How long have you been experiencing these symptoms?',
    type: 'options',
    opts: ['Just started (today)','1–3 days','4–7 days','1–2 weeks','More than 2 weeks','Months / Chronic'],
    save: v => { state.duration = v; },
    next: () => 'Understood.'
  },
  {
    bot: 'How would you rate the severity of your condition?',
    type: 'options',
    opts: ['😌 Mild — I can manage','😐 Moderate — Affecting daily life','😣 Severe — Need urgent help','🚨 Emergency — Critical'],
    save: v => { state.severity = v; },
    next: () => 'Thank you for sharing that.'
  },
  {
    bot: 'What is your WhatsApp number? (We will confirm your appointment on this number)',
    type: 'input',
    placeholder: 'Enter 10-digit WhatsApp number…',
    save: v => { state.phone = v; },
    next: () => '📱 Perfect!'
  },
  {
    bot: 'When would you prefer to visit?',
    type: 'options',
    opts: ['🌅 Morning OPD (10AM–2PM)','🌆 Evening OPD (6PM–9PM)','📅 Any Available Slot','🚨 Urgent / Emergency'],
    save: v => { state.preferredTime = v; },
    next: () => "Great! Here's a summary of your details."
  }
];

let multiSelected = [];

// ── DOM BUILD ──
function buildDOM() {
  document.body.insertAdjacentHTML('beforeend', `
    <button id="sdh-fab">
      <span class="sdh-fab-icon">🏥</span>
      <span class="sdh-fab-txt">
        <span class="sdh-fab-title">AI Health Assistant</span>
        <span class="sdh-fab-sub">Book Appointment</span>
      </span>
    </button>
    <div id="sdh-panel">
      <div class="sdh-head">
        <div class="sdh-head-left">
          <div class="sdh-head-avatar">🏥</div>
          <div>
            <div class="sdh-head-name">Dr. Sarojdhara AI Assistant</div>
            <div class="sdh-head-status"><span class="sdh-head-dot"></span>Online — Ready to help</div>
          </div>
        </div>
        <button class="sdh-close" id="sdhClose">✕</button>
      </div>
      <div class="sdh-progress">
        <div class="sdh-prog-bar"><div class="sdh-prog-fill" id="sdhProgFill" style="width:0%"></div></div>
        <span class="sdh-prog-label" id="sdhProgLabel">Step 0 / ${TOTAL_STEPS}</span>
      </div>
      <div class="sdh-body" id="sdhBody"></div>
      <div class="sdh-opts" id="sdhOpts"></div>
      <div class="sdh-input-row" id="sdhInputRow" style="display:none">
        <input class="sdh-text-input" id="sdhInput" placeholder="Type here…"/>
        <button class="sdh-send" id="sdhSend">➤</button>
      </div>
    </div>
  `);
}

buildDOM();

const fab      = document.getElementById('sdh-fab');
const panel    = document.getElementById('sdh-panel');
const closeBtn = document.getElementById('sdhClose');
const body     = document.getElementById('sdhBody');
const opts     = document.getElementById('sdhOpts');
const inputRow = document.getElementById('sdhInputRow');
const textInput= document.getElementById('sdhInput');
const sendBtn  = document.getElementById('sdhSend');
const progFill = document.getElementById('sdhProgFill');
const progLabel= document.getElementById('sdhProgLabel');

// ── TOGGLE ──
fab.addEventListener('click', () => {
  panel.classList.toggle('sdh-open');
  if (panel.classList.contains('sdh-open') && body.children.length === 0) {
    setTimeout(() => askStep(0), 400);
  }
});
closeBtn.addEventListener('click', () => panel.classList.remove('sdh-open'));

// ── UTILS ──
function scrollBottom() { body.scrollTop = body.scrollHeight; }

function addMsg(text, who='bot') {
  const div = document.createElement('div');
  div.className = `sdh-msg sdh-${who}`;
  div.innerHTML = who === 'bot'
    ? `<span class="sdh-avatar">🏥</span><div class="sdh-bubble">${text.replace(/\n/g,'<br>')}</div>`
    : `<div class="sdh-bubble">${text}</div><span class="sdh-avatar">👤</span>`;
  body.appendChild(div);
  scrollBottom();
}

function showTyping() {
  const d = document.createElement('div');
  d.className = 'sdh-msg sdh-bot'; d.id = 'sdhTyping';
  d.innerHTML = `<span class="sdh-avatar">🏥</span><div class="sdh-typing"><span></span><span></span><span></span></div>`;
  body.appendChild(d); scrollBottom();
}
function hideTyping() { const t = document.getElementById('sdhTyping'); if(t) t.remove(); }

function setProgress(step) {
  const pct = Math.round((step / TOTAL_STEPS) * 100);
  progFill.style.width = pct + '%';
  progLabel.textContent = `Step ${step} / ${TOTAL_STEPS}`;
}

function clearOpts() { opts.innerHTML = ''; inputRow.style.display = 'none'; }

// ── ASK STEP ──
function askStep(stepIdx) {
  if (stepIdx >= flow.length) { showSummary(); return; }
  const s = flow[stepIdx];
  setProgress(stepIdx + 1);
  multiSelected = [];
  clearOpts();

  const botText = typeof s.bot === 'function' ? s.bot() : s.bot;

  showTyping();
  setTimeout(() => {
    hideTyping();
    addMsg(botText);

    if (s.type === 'input') {
      inputRow.style.display = 'flex';
      textInput.value = '';
      textInput.placeholder = s.placeholder || 'Type here…';
      textInput.focus();

      const submit = () => {
        const val = textInput.value.trim();
        if (!val) return;
        addMsg(val, 'user');
        s.save(val);
        clearOpts();
        const nxt = s.next ? s.next() : '';
        if (nxt) {
          showTyping();
          setTimeout(() => { hideTyping(); addMsg(nxt); setTimeout(() => askStep(stepIdx + 1), 500); }, 800);
        } else {
          setTimeout(() => askStep(stepIdx + 1), 400);
        }
      };

      sendBtn.onclick = submit;
      textInput.onkeydown = e => { if (e.key === 'Enter') submit(); };

    } else if (s.type === 'options') {
      s.opts.forEach(o => {
        const btn = document.createElement('button');
        btn.className = 'sdh-opt';
        btn.textContent = o;
        btn.onclick = () => {
          opts.querySelectorAll('.sdh-opt').forEach(b => b.classList.remove('sdh-picked'));
          btn.classList.add('sdh-picked');
          addMsg(o, 'user');
          s.save(o);
          clearOpts();
          const nxt = s.next ? s.next() : '';
          if (nxt) {
            showTyping();
            setTimeout(() => { hideTyping(); addMsg(nxt); setTimeout(() => askStep(stepIdx + 1), 500); }, 800);
          } else {
            setTimeout(() => askStep(stepIdx + 1), 400);
          }
        };
        opts.appendChild(btn);
      });

    } else if (s.type === 'multi') {
      s.opts.forEach(o => {
        const btn = document.createElement('button');
        btn.className = 'sdh-opt';
        btn.textContent = o;
        btn.onclick = () => {
          if (btn.classList.contains('sdh-picked')) {
            btn.classList.remove('sdh-picked');
            multiSelected = multiSelected.filter(x => x !== o);
          } else {
            btn.classList.add('sdh-picked');
            multiSelected.push(o);
            s.save(o);
          }
        };
        opts.appendChild(btn);
      });
      // Done button
      const doneBtn = document.createElement('button');
      doneBtn.className = 'sdh-opt';
      doneBtn.textContent = s.done || '✅ Done';
      doneBtn.style.cssText = 'background:linear-gradient(135deg,#0369a1,#0d9488)!important;color:#fff!important;border-color:transparent!important;font-weight:700!important;';
      doneBtn.onclick = () => {
        const chosen = multiSelected.length ? multiSelected.join(', ') : 'None specified';
        addMsg(chosen, 'user');
        clearOpts();
        const nxt = s.next ? s.next() : '';
        if (nxt) {
          showTyping();
          setTimeout(() => { hideTyping(); addMsg(nxt); setTimeout(() => askStep(stepIdx + 1), 500); }, 800);
        } else {
          setTimeout(() => askStep(stepIdx + 1), 400);
        }
      };
      opts.appendChild(doneBtn);
    }
  }, 900);
}

// ── SUMMARY ──
function showSummary() {
  setProgress(TOTAL_STEPS);
  clearOpts();
  showTyping();
  setTimeout(() => {
    hideTyping();
    const symptomsText = state.symptoms.length ? state.symptoms.join(', ') : 'None specified';

    const summaryHTML = `
      <div class="sdh-summary">
        <div class="sdh-summary-title">📋 Appointment Summary</div>
        <div class="sdh-summary-row"><span class="sdh-summary-label">👤 Name</span><span class="sdh-summary-val">${state.name}</span></div>
        <div class="sdh-summary-row"><span class="sdh-summary-label">🎂 Age</span><span class="sdh-summary-val">${state.age}</span></div>
        <div class="sdh-summary-row"><span class="sdh-summary-label">⚧ Gender</span><span class="sdh-summary-val">${state.gender}</span></div>
        <div class="sdh-summary-row"><span class="sdh-summary-label">📞 WhatsApp</span><span class="sdh-summary-val">${state.phone}</span></div>
        <div class="sdh-summary-row"><span class="sdh-summary-label">🩺 Concern</span><span class="sdh-summary-val">${state.problem}</span></div>
        <div class="sdh-summary-row"><span class="sdh-summary-label">🔴 Symptoms</span><span class="sdh-summary-val">${symptomsText}</span></div>
        <div class="sdh-summary-row"><span class="sdh-summary-label">⏳ Duration</span><span class="sdh-summary-val">${state.duration}</span></div>
        <div class="sdh-summary-row"><span class="sdh-summary-label">📊 Severity</span><span class="sdh-summary-val">${state.severity}</span></div>
        <div class="sdh-summary-row"><span class="sdh-summary-label">⏰ Timing</span><span class="sdh-summary-val">${state.preferredTime}</span></div>
        <button class="sdh-wa-btn" id="sdhWaFinal">
          <span>📲</span> Send via WhatsApp & Book Appointment
        </button>
      </div>`;

    const div = document.createElement('div');
    div.className = 'sdh-msg sdh-bot';
    div.innerHTML = `<span class="sdh-avatar">🏥</span><div class="sdh-bubble" style="max-width:95%!important;width:100%!important">${summaryHTML}</div>`;
    body.appendChild(div);
    scrollBottom();

    document.getElementById('sdhWaFinal').onclick = sendToWhatsApp;

    // Also show restart option
    const restartBtn = document.createElement('button');
    restartBtn.className = 'sdh-opt';
    restartBtn.textContent = '🔄 Start Over';
    restartBtn.onclick = () => {
      // Reset state
      Object.assign(state, { step:0, name:'', age:'', gender:'', phone:'', problem:'', symptoms:[], duration:'', severity:'', preferredTime:'' });
      body.innerHTML = '';
      clearOpts();
      setTimeout(() => askStep(0), 300);
    };
    opts.appendChild(restartBtn);

  }, 1000);
}

// ── SEND TO WHATSAPP ──
function sendToWhatsApp() {
  const symptomsText = state.symptoms.length ? state.symptoms.join(', ') : 'None specified';
  const msg =
`🏥 *Appointment Request — Dr. Sarojdhara Hospital*

👤 *Patient Name:* ${state.name}
🎂 *Age Group:* ${state.age} | *Gender:* ${state.gender}
📞 *WhatsApp:* ${state.phone}

🩺 *Primary Concern:* ${state.problem}
🔴 *Symptoms:* ${symptomsText}
⏳ *Duration:* ${state.duration}
📊 *Severity:* ${state.severity}

⏰ *Preferred Timing:* ${state.preferredTime}

📍 *Via:* AI Health Assistant on Website

_Please confirm my appointment at the earliest. Thank you!_
_Dr. Sarojdhara Hospital, Shikargah, Jodhpur_`;

  window.open(`https://wa.me/919829888702?text=${encodeURIComponent(msg)}`, '_blank');
}

})();
