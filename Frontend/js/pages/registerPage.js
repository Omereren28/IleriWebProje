/**
 * HomeOfEmlak — Register Page
 */
import { showToast } from '../components/toast.js';
import { navigate } from '../router.js';

export function renderRegisterPage(container) {
  container.innerHTML = `
    <div class="form-page">
      <div class="container">
        <div class="form-card" style="max-width:500px;margin-top:var(--space-10)">
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
            
            <button type="submit" class="btn btn--primary btn--lg" style="width:100%;margin-top:var(--space-2)">Üye Ol</button>
          </form>
          
          <div style="text-align:center;margin-top:var(--space-6);padding-top:var(--space-6);border-top:1px solid var(--border)">
            <p class="text-small" style="color:var(--text-secondary)">
              Zaten hesabınız var mı? <a href="#/giris" style="color:var(--primary);font-weight:600">Giriş Yapın</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  `;

  container.querySelector('#register-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    
    if (password.length < 6) {
      showToast('Şifre en az 6 karakter olmalıdır.', 'error');
      return;
    }
    
    // Mock register
    showToast('Kayıt başarılı! Yönlendiriliyorsunuz...', 'success');
    setTimeout(() => {
      localStorage.setItem('emlak_user', JSON.stringify({ email, name }));
      window.dispatchEvent(new Event('user-login'));
      navigate('/');
    }, 1500);
  });
}
