/**
 * HomeOfEmlak — Register Page (6 Haneli Kod Doğrulamalı)
 */
import { showToast } from '../components/toast.js';
import { navigate } from '../router.js';
import { register, verifyCode, resendCode, isLoggedIn, setToken, setUser } from '../services/api.js';

export function renderRegisterPage(container) {
  if (isLoggedIn()) { navigate('/'); return; }

  container.innerHTML = `
    <div class="form-page">
      <div class="container">
        <div class="form-card" style="max-width:500px;margin-top:var(--space-10)">
          <!-- Step 1: Registration Form -->
          <div id="register-step-1">
            <div style="text-align:center;margin-bottom:var(--space-8)">
              <h1 class="heading-2">Üye Ol</h1>
              <p class="text-body" style="margin-top:var(--space-2)">Aramıza katılın ve hayalinizdeki evi bulun.</p>
            </div>
            
            <form id="register-form">
              <div class="form-row">
                <div class="form-group">
                  <label>Ad</label>
                  <input type="text" id="reg-name" required placeholder="Adınız">
                </div>
                <div class="form-group">
                  <label>Soyad</label>
                  <input type="text" id="reg-surname" required placeholder="Soyadınız">
                </div>
              </div>
              
              <div class="form-group">
                <label>E-posta</label>
                <input type="email" id="reg-email" required placeholder="ornek@email.com">
              </div>
              
              <div class="form-group">
                <label>Telefon (Opsiyonel)</label>
                <input type="tel" id="reg-phone" placeholder="0532 xxx xx xx">
              </div>
              
              <div class="form-group">
                <label>Şifre</label>
                <input type="password" id="reg-password" required placeholder="En az 6 karakter">
              </div>
              
              <label class="filter-checkbox" style="margin:var(--space-4) 0">
                <input type="checkbox" required> 
                <span><a href="#" style="color:var(--primary)">Kullanıcı Sözleşmesi</a> ve <a href="#" style="color:var(--primary)">Gizlilik Politikası</a>'nı okudum, kabul ediyorum.</span>
              </label>
              
              <button type="submit" class="btn btn--primary btn--lg" id="reg-btn" style="width:100%;margin-top:var(--space-2)">Üye Ol</button>
            </form>
            
            <div style="text-align:center;margin-top:var(--space-6);padding-top:var(--space-6);border-top:1px solid var(--border)">
              <p class="text-small" style="color:var(--text-secondary)">
                Zaten hesabınız var mı? <a href="#/giris" style="color:var(--primary);font-weight:600">Giriş Yapın</a>
              </p>
            </div>
          </div>

          <!-- Step 2: Verification Code -->
          <div id="register-step-2" style="display:none">
            <div style="text-align:center;margin-bottom:var(--space-8)">
              <div style="font-size:48px;margin-bottom:var(--space-4)">📧</div>
              <h1 class="heading-2">E-posta Doğrulama</h1>
              <p class="text-body" style="margin-top:var(--space-2)">
                <strong id="verify-email-display"></strong> adresine 6 haneli doğrulama kodu gönderdik.
              </p>
            </div>
            
            <form id="verify-form">
              <div class="form-group">
                <label>Doğrulama Kodu</label>
                <div style="display:flex;gap:8px;justify-content:center;margin-top:var(--space-2)">
                  <input type="text" id="code-1" class="code-input" maxlength="1" style="width:48px;height:56px;text-align:center;font-size:24px;font-weight:700;border-radius:var(--radius-lg)">
                  <input type="text" id="code-2" class="code-input" maxlength="1" style="width:48px;height:56px;text-align:center;font-size:24px;font-weight:700;border-radius:var(--radius-lg)">
                  <input type="text" id="code-3" class="code-input" maxlength="1" style="width:48px;height:56px;text-align:center;font-size:24px;font-weight:700;border-radius:var(--radius-lg)">
                  <input type="text" id="code-4" class="code-input" maxlength="1" style="width:48px;height:56px;text-align:center;font-size:24px;font-weight:700;border-radius:var(--radius-lg)">
                  <input type="text" id="code-5" class="code-input" maxlength="1" style="width:48px;height:56px;text-align:center;font-size:24px;font-weight:700;border-radius:var(--radius-lg)">
                  <input type="text" id="code-6" class="code-input" maxlength="1" style="width:48px;height:56px;text-align:center;font-size:24px;font-weight:700;border-radius:var(--radius-lg)">
                </div>
              </div>
              
              <button type="submit" class="btn btn--primary btn--lg" id="verify-btn" style="width:100%;margin-top:var(--space-4)">Doğrula</button>
            </form>
            
            <div style="text-align:center;margin-top:var(--space-6);padding-top:var(--space-6);border-top:1px solid var(--border)">
              <p class="text-small" style="color:var(--text-secondary)">
                Kod gelmedi mi? 
                <button id="resend-btn" style="color:var(--primary);font-weight:600;background:none;border:none;cursor:pointer;font-size:inherit">Tekrar Gönder</button>
              </p>
              <p id="resend-timer" class="text-small" style="color:var(--text-muted);margin-top:var(--space-2);display:none"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  let pendingEmail = '';

  // Code input auto-focus
  function setupCodeInputs() {
    const inputs = container.querySelectorAll('.code-input');
    inputs.forEach((input, idx) => {
      input.addEventListener('input', (e) => {
        const val = e.target.value.replace(/[^0-9]/g, '');
        e.target.value = val;
        if (val && idx < 5) inputs[idx + 1].focus();
      });
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !e.target.value && idx > 0) {
          inputs[idx - 1].focus();
        }
      });
      input.addEventListener('paste', (e) => {
        e.preventDefault();
        const paste = (e.clipboardData || window.clipboardData).getData('text').replace(/[^0-9]/g, '');
        for (let i = 0; i < Math.min(paste.length, 6); i++) {
          inputs[i].value = paste[i];
        }
        if (paste.length >= 6) inputs[5].focus();
      });
    });
  }

  function getCode() {
    let code = '';
    for (let i = 1; i <= 6; i++) {
      code += document.getElementById(`code-${i}`).value;
    }
    return code;
  }

  function showStep2(email) {
    pendingEmail = email;
    document.getElementById('register-step-1').style.display = 'none';
    document.getElementById('register-step-2').style.display = 'block';
    document.getElementById('verify-email-display').textContent = email;
    setupCodeInputs();
    document.getElementById('code-1').focus();
    startResendTimer();
  }

  let resendTimer = null;
  function startResendTimer() {
    const btn = document.getElementById('resend-btn');
    const timer = document.getElementById('resend-timer');
    let seconds = 60;
    btn.disabled = true;
    btn.style.opacity = '0.5';
    timer.style.display = 'block';
    timer.textContent = `Yeni kod ${seconds} saniye sonra gönderilebilir`;
    
    resendTimer = setInterval(() => {
      seconds--;
      timer.textContent = `Yeni kod ${seconds} saniye sonra gönderilebilir`;
      if (seconds <= 0) {
        clearInterval(resendTimer);
        btn.disabled = false;
        btn.style.opacity = '1';
        timer.style.display = 'none';
      }
    }, 1000);
  }

  // Step 1: Register
  container.querySelector('#register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const firstName = document.getElementById('reg-name').value;
    const lastName = document.getElementById('reg-surname').value;
    const email = document.getElementById('reg-email').value;
    const phone = document.getElementById('reg-phone').value;
    const password = document.getElementById('reg-password').value;
    const btn = document.getElementById('reg-btn');

    if (password.length < 6) {
      showToast('Şifre en az 6 karakter olmalıdır.', 'error');
      return;
    }
    
    btn.disabled = true;
    btn.textContent = 'Kayıt yapılıyor...';

    try {
      const result = await register({ firstName, lastName, email, phone, password });
      showToast(result.message || 'Doğrulama kodu gönderildi!', 'success');
      showStep2(email);
    } catch (error) {
      showToast(error.message || 'Kayıt başarısız', 'error');
      btn.disabled = false;
      btn.textContent = 'Üye Ol';
    }
  });

  // Step 2: Verify code
  container.querySelector('#verify-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const code = getCode();
    const btn = document.getElementById('verify-btn');

    if (code.length !== 6) {
      showToast('Lütfen 6 haneli kodu eksiksiz girin.', 'error');
      return;
    }

    btn.disabled = true;
    btn.textContent = 'Doğrulanıyor...';

    try {
      const result = await verifyCode(pendingEmail, code);
      if (result.data) {
        setToken(result.data.token);
        setUser(result.data.user);
      }
      showToast(result.message || 'Hesabınız doğrulandı! 🎉', 'success');
      window.dispatchEvent(new Event('user-login'));
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      showToast(error.message || 'Geçersiz kod', 'error');
      btn.disabled = false;
      btn.textContent = 'Doğrula';
    }
  });

  // Resend code
  document.getElementById('resend-btn')?.addEventListener('click', async () => {
    try {
      await resendCode(pendingEmail);
      showToast('Yeni doğrulama kodu gönderildi!', 'success');
      startResendTimer();
    } catch (error) {
      showToast(error.message || 'Kod gönderilemedi', 'error');
    }
  });
}
