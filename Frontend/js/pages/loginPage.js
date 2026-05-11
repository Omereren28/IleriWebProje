/**
 * HomeOfEmlak — Login Page
 */
import { showToast } from '../components/toast.js';
import { navigate } from '../router.js';

export function renderLoginPage(container) {
  container.innerHTML = `
    <div class="form-page">
      <div class="container">
        <div class="form-card" style="max-width:400px;margin-top:var(--space-10)">
          <div style="text-align:center;margin-bottom:var(--space-8)">
            <h1 class="heading-2">Giriş Yap</h1>
            <p class="text-body" style="margin-top:var(--space-2)">Hesabınıza giriş yaparak favorilerinizi ve ilanlarınızı yönetin.</p>
          </div>
          
          <form id="login-form">
            <div class="form-group">
              <label>E-posta</label>
              <input type="email" id="login-email" required placeholder="ornek@email.com">
            </div>
            
            <div class="form-group">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-2)">
                <label style="margin-bottom:0">Şifre</label>
                <a href="#" class="text-small" style="color:var(--primary)">Şifremi Unuttum</a>
              </div>
              <input type="password" id="login-password" required placeholder="••••••••">
            </div>
            
            <button type="submit" class="btn btn--primary btn--lg" style="width:100%;margin-top:var(--space-4)">Giriş Yap</button>
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

  container.querySelector('#login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Simple mock validation
    if (email && password) {
      showToast('Giriş başarılı! Yönlendiriliyorsunuz...', 'success');
      setTimeout(() => {
        // Mock setting a user token
        localStorage.setItem('emlak_user', JSON.stringify({ email, name: email.split('@')[0] }));
        // Dispatch event so header can update
        window.dispatchEvent(new Event('user-login'));
        navigate('/');
      }, 1500);
    }
  });
}
