/**
 * HomeOfEmlak — Forgot Password Page (3 Adımlı)
 */
import { showToast } from '../components/toast.js';
import { navigate } from '../router.js';
import { forgotPassword, verifyResetCode, resetPassword, isLoggedIn } from '../services/api.js';

export function renderForgotPasswordPage(container) {
  if (isLoggedIn()) { navigate('/'); return; }

  container.innerHTML = `
    <div class="form-page">
      <div class="container">
        <div class="form-card" style="max-width:460px;margin-top:var(--space-10)">
          <div style="display:flex;justify-content:center;gap:8px;margin-bottom:var(--space-8)">
            <div id="step-dot-1" style="width:32px;height:4px;border-radius:2px;background:var(--primary);transition:all 0.3s"></div>
            <div id="step-dot-2" style="width:32px;height:4px;border-radius:2px;background:var(--border);transition:all 0.3s"></div>
            <div id="step-dot-3" style="width:32px;height:4px;border-radius:2px;background:var(--border);transition:all 0.3s"></div>
          </div>

          <div id="forgot-step-1">
            <div style="text-align:center;margin-bottom:var(--space-8)">
              <div style="font-size:48px;margin-bottom:var(--space-4)">🔐</div>
              <h1 class="heading-2">Şifremi Unuttum</h1>
              <p class="text-body" style="margin-top:var(--space-2)">E-posta adresinizi girin, size 6 haneli kod gönderelim.</p>
            </div>
            <form id="forgot-form">
              <div class="form-group">
                <label>E-posta Adresi</label>
                <input type="email" id="forgot-email" required placeholder="ornek@email.com">
              </div>
              <button type="submit" class="btn btn--primary btn--lg" id="forgot-btn" style="width:100%;margin-top:var(--space-4)">Kod Gönder</button>
            </form>
            <div style="text-align:center;margin-top:var(--space-6);padding-top:var(--space-6);border-top:1px solid var(--border)">
              <p class="text-small"><a href="#/giris" style="color:var(--primary);font-weight:600">← Giriş sayfasına dön</a></p>
            </div>
          </div>

          <div id="forgot-step-2" style="display:none">
            <div style="text-align:center;margin-bottom:var(--space-8)">
              <div style="font-size:48px;margin-bottom:var(--space-4)">📧</div>
              <h1 class="heading-2">Kodu Girin</h1>
              <p class="text-body" style="margin-top:var(--space-2)"><strong id="forgot-email-display"></strong> adresine gönderilen 6 haneli kodu girin.</p>
            </div>
            <form id="verify-reset-form">
              <div style="display:flex;gap:8px;justify-content:center;margin:var(--space-2) 0 var(--space-4)">
                <input type="text" id="rc-1" class="rc-input" maxlength="1" style="width:48px;height:56px;text-align:center;font-size:24px;font-weight:700;border-radius:var(--radius-lg)">
                <input type="text" id="rc-2" class="rc-input" maxlength="1" style="width:48px;height:56px;text-align:center;font-size:24px;font-weight:700;border-radius:var(--radius-lg)">
                <input type="text" id="rc-3" class="rc-input" maxlength="1" style="width:48px;height:56px;text-align:center;font-size:24px;font-weight:700;border-radius:var(--radius-lg)">
                <input type="text" id="rc-4" class="rc-input" maxlength="1" style="width:48px;height:56px;text-align:center;font-size:24px;font-weight:700;border-radius:var(--radius-lg)">
                <input type="text" id="rc-5" class="rc-input" maxlength="1" style="width:48px;height:56px;text-align:center;font-size:24px;font-weight:700;border-radius:var(--radius-lg)">
                <input type="text" id="rc-6" class="rc-input" maxlength="1" style="width:48px;height:56px;text-align:center;font-size:24px;font-weight:700;border-radius:var(--radius-lg)">
              </div>
              <button type="submit" class="btn btn--primary btn--lg" id="verify-reset-btn" style="width:100%">Kodu Doğrula</button>
            </form>
            <div style="text-align:center;margin-top:var(--space-6);padding-top:var(--space-6);border-top:1px solid var(--border)">
              <p class="text-small">Kod gelmedi mi? <button id="resend-reset-btn" style="color:var(--primary);font-weight:600;background:none;border:none;cursor:pointer;font-size:inherit">Tekrar Gönder</button></p>
              <p id="resend-timer" class="text-small" style="color:var(--text-muted);margin-top:4px;display:none"></p>
            </div>
          </div>

          <div id="forgot-step-3" style="display:none">
            <div style="text-align:center;margin-bottom:var(--space-8)">
              <div style="font-size:48px;margin-bottom:var(--space-4)">🔑</div>
              <h1 class="heading-2">Yeni Şifre</h1>
              <p class="text-body" style="margin-top:var(--space-2)">Yeni şifrenizi belirleyin.</p>
            </div>
            <form id="reset-form">
              <div class="form-group"><label>Yeni Şifre</label><input type="password" id="new-password" required placeholder="En az 6 karakter" minlength="6"></div>
              <div class="form-group"><label>Şifre Tekrar</label><input type="password" id="new-password-confirm" required placeholder="Şifrenizi tekrar girin" minlength="6"></div>
              <button type="submit" class="btn btn--primary btn--lg" id="reset-btn" style="width:100%;margin-top:var(--space-4)">Şifreyi Güncelle</button>
            </form>
          </div>

          <div id="forgot-success" style="display:none;text-align:center;padding:var(--space-8) 0">
            <div style="font-size:64px;margin-bottom:var(--space-4)">✅</div>
            <h2 class="heading-2">Şifreniz Güncellendi!</h2>
            <p class="text-body" style="margin-top:var(--space-2);margin-bottom:var(--space-6)">Yeni şifrenizle giriş yapabilirsiniz.</p>
            <a href="#/giris" class="btn btn--primary btn--lg">Giriş Yap</a>
          </div>
        </div>
      </div>
    </div>
  `;

  let pendingEmail = '', resetToken = '';

  function setStep(n) {
    for (let i = 1; i <= 3; i++) {
      const d = document.getElementById(`step-dot-${i}`);
      if (d) d.style.background = i <= n ? 'var(--primary)' : 'var(--border)';
    }
  }

  function setupCodeInputs() {
    const inputs = container.querySelectorAll('.rc-input');
    inputs.forEach((inp, idx) => {
      inp.addEventListener('input', e => { e.target.value = e.target.value.replace(/\D/g,''); if (e.target.value && idx < 5) inputs[idx+1].focus(); });
      inp.addEventListener('keydown', e => { if (e.key==='Backspace' && !e.target.value && idx>0) inputs[idx-1].focus(); });
      inp.addEventListener('paste', e => { e.preventDefault(); const p=(e.clipboardData||window.clipboardData).getData('text').replace(/\D/g,''); for(let i=0;i<Math.min(p.length,6);i++) inputs[i].value=p[i]; if(p.length>=6) inputs[5].focus(); });
    });
  }

  function getCode() { let c=''; for(let i=1;i<=6;i++) c+=document.getElementById(`rc-${i}`).value; return c; }

  let tmr=null;
  function startTimer() {
    const btn=document.getElementById('resend-reset-btn'), t=document.getElementById('resend-timer');
    let s=60; btn.disabled=true; btn.style.opacity='0.5'; t.style.display='block';
    t.textContent=`Yeni kod ${s}s sonra gönderilebilir`;
    if(tmr) clearInterval(tmr);
    tmr=setInterval(()=>{ s--; t.textContent=`Yeni kod ${s}s sonra gönderilebilir`; if(s<=0){clearInterval(tmr);btn.disabled=false;btn.style.opacity='1';t.style.display='none';} },1000);
  }

  // Step 1
  container.querySelector('#forgot-form').addEventListener('submit', async e => {
    e.preventDefault();
    const email=document.getElementById('forgot-email').value, btn=document.getElementById('forgot-btn');
    btn.disabled=true; btn.textContent='Gönderiliyor...';
    try {
      await forgotPassword(email); pendingEmail=email;
      showToast('Şifre sıfırlama kodu gönderildi!','success');
      document.getElementById('forgot-step-1').style.display='none';
      document.getElementById('forgot-step-2').style.display='block';
      document.getElementById('forgot-email-display').textContent=email;
      setStep(2); setupCodeInputs(); document.getElementById('rc-1').focus(); startTimer();
    } catch(err) { showToast(err.message||'Hata oluştu','error'); btn.disabled=false; btn.textContent='Kod Gönder'; }
  });

  // Step 2
  container.querySelector('#verify-reset-form').addEventListener('submit', async e => {
    e.preventDefault();
    const code=getCode(), btn=document.getElementById('verify-reset-btn');
    if(code.length!==6){showToast('6 haneli kodu eksiksiz girin.','error');return;}
    btn.disabled=true; btn.textContent='Doğrulanıyor...';
    try {
      const r=await verifyResetCode(pendingEmail,code); resetToken=r.data.resetToken;
      showToast('Kod doğrulandı!','success');
      document.getElementById('forgot-step-2').style.display='none';
      document.getElementById('forgot-step-3').style.display='block';
      setStep(3); document.getElementById('new-password').focus();
    } catch(err) { showToast(err.message||'Geçersiz kod','error'); btn.disabled=false; btn.textContent='Kodu Doğrula'; }
  });

  // Step 3
  container.querySelector('#reset-form').addEventListener('submit', async e => {
    e.preventDefault();
    const pw=document.getElementById('new-password').value, pw2=document.getElementById('new-password-confirm').value, btn=document.getElementById('reset-btn');
    if(pw.length<6){showToast('Şifre en az 6 karakter olmalıdır.','error');return;}
    if(pw!==pw2){showToast('Şifreler eşleşmiyor!','error');return;}
    btn.disabled=true; btn.textContent='Güncelleniyor...';
    try {
      await resetPassword(resetToken,pw);
      showToast('Şifreniz güncellendi!','success');
      document.getElementById('forgot-step-3').style.display='none';
      document.getElementById('forgot-success').style.display='block';
      document.querySelectorAll('[id^="step-dot"]').forEach(d=>d.style.display='none');
    } catch(err) { showToast(err.message||'Hata oluştu','error'); btn.disabled=false; btn.textContent='Şifreyi Güncelle'; }
  });

  // Resend
  document.getElementById('resend-reset-btn')?.addEventListener('click', async()=>{
    try { await forgotPassword(pendingEmail); showToast('Yeni kod gönderildi!','success'); for(let i=1;i<=6;i++) document.getElementById(`rc-${i}`).value=''; document.getElementById('rc-1').focus(); startTimer(); }
    catch(err) { showToast(err.message||'Kod gönderilemedi','error'); }
  });
}
