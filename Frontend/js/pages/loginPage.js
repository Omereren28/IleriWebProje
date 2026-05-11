/**
 * HomeOfEmlak — Login Page (API Entegreli)
 */
import { showToast } from '../components/toast.js';
import { navigate } from '../router.js';
import { login, isLoggedIn } from '../services/api.js';

export function renderLoginPage(container) {
  // Zaten giriş yapmışsa ana sayfaya yönlendir
  if (isLoggedIn()) {
    navigate('/');
    return;
  }

  container.innerHTML = `
    <div class="form-page">
      <div class="container">
        <div class="form-card" style="max-width:400px;margin-top:var(--space-10)">
          <div style="text-align:center;margin-bottom:var(--space-8)">
            <h1 class="heading-2">Giriş Yap</h1>
            <p class="text-body" style="margin-top:var(--space-2)">Hesabınıza giriş yaparak favorilerinizi ve ilanlarınızı yönetin.</p>
          </div>
          
          <form id="login-form" autocomplete="off">
            <div class="form-group">
              <label>E-posta</label>
              <input type="email" id="login-email" required placeholder="ornek@email.com" autocomplete="off">
            </div>
            
            <div class="form-group">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-2)">
                <label style="margin-bottom:0">Şifre</label>
                <a href="#/sifremi-unuttum" class="text-small" style="color:var(--primary)">Şifremi Unuttum</a>
              </div>
              <input type="password" id="login-password" required placeholder="••••••••" autocomplete="new-password">
            </div>
            
            <button type="submit" class="btn btn--primary btn--lg" id="login-btn" style="width:100%;margin-top:var(--space-4)">Giriş Yap</button>
          </form>
          
          <div style="text-align:center;margin-top:var(--space-6);padding-top:var(--space-6);border-top:1px solid var(--border)">
            <p class="text-small" style="color:var(--text-secondary)">
              Hesabınız yok mu? <a href="#/uye-ol" style="color:var(--primary);font-weight:600">Hemen Üye Olun</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  `;

  container.querySelector('#login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const btn = document.getElementById('login-btn');
    
    btn.disabled = true;
    btn.textContent = 'Giriş yapılıyor...';

    try {
      const result = await login(email, password);
      showToast(result.message || 'Giriş başarılı!', 'success');
      window.dispatchEvent(new Event('user-login'));
      setTimeout(() => navigate('/'), 1000);
    } catch (error) {
      // Doğrulanmamış hesap — üye ol sayfasına yönlendir (kod doğrulama için)
      if (error.data && error.data.requiresVerification) {
        showToast(error.message || 'Hesabınız doğrulanmamış. Doğrulama kodu gönderildi.', 'warning');
        setTimeout(() => navigate('/uye-ol'), 1500);
        return;
      }
      showToast(error.message || 'Giriş başarısız', 'error');
      btn.disabled = false;
      btn.textContent = 'Giriş Yap';
    }
  });
}

