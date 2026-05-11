/**
 * HomeOfEmlak — Contact Page
 */
import { showToast } from '../components/toast.js';
import { setupScrollReveal } from '../utils/helpers.js';

export function renderContactPage(container) {
  container.innerHTML = `
    <div class="form-page">
      <div class="container">
        <div class="form-page__header reveal">
          <p class="section__eyebrow">İletişim</p>
          <h1 class="heading-2">Bize Ulaşın</h1>
          <p class="section__subtitle">Sorularınız için bize yazın, en kısa sürede dönüş yapalım.</p>
        </div>

        <div class="contact-grid">
          <!-- Contact Form -->
          <div class="form-card reveal">
            <form id="contact-form">
              <div class="form-row">
                <div class="form-group"><label>Ad Soyad</label><input type="text" required placeholder="Adınız Soyadınız"></div>
                <div class="form-group"><label>E-posta</label><input type="email" required placeholder="ornek@email.com"></div>
              </div>
              <div class="form-row">
                <div class="form-group"><label>Telefon</label><input type="tel" placeholder="0532 xxx xx xx"></div>
                <div class="form-group"><label>Konu</label>
                  <select required>
                    <option value="">Seçiniz</option>
                    <option>Genel Bilgi</option>
                    <option>İlan Hakkında</option>
                    <option>Teknik Destek</option>
                    <option>Şikayet</option>
                    <option>İş Birliği</option>
                  </select>
                </div>
              </div>
              <div class="form-group"><label>Mesajınız</label><textarea required placeholder="Mesajınızı buraya yazın..." rows="5"></textarea></div>
              <button type="submit" class="btn btn--primary btn--lg" style="width:100%">Mesaj Gönder</button>
            </form>
          </div>

          <!-- Contact Info -->
          <div class="reveal">
            <div style="display:flex;flex-direction:column;gap:var(--space-4)">
              <div class="contact-info-card">
                <span class="contact-info-icon">📍</span>
                <div><strong>Adres</strong><p class="text-small">Levent Mah. Büyükdere Cad. No:123, Beşiktaş, İstanbul</p></div>
              </div>
              <div class="contact-info-card">
                <span class="contact-info-icon">📞</span>
                <div><strong>Telefon</strong><p class="text-small">0212 123 45 67</p></div>
              </div>
              <div class="contact-info-card">
                <span class="contact-info-icon">✉️</span>
                <div><strong>E-posta</strong><p class="text-small">info@homeofemlak.com</p></div>
              </div>
              <div class="contact-info-card">
                <span class="contact-info-icon">🕐</span>
                <div><strong>Çalışma Saatleri</strong><p class="text-small">Pzt-Cum: 09:00 - 18:00<br>Cmt: 10:00 - 14:00</p></div>
              </div>
            </div>

            <div id="contact-map" style="height:250px;border-radius:var(--radius-lg);overflow:hidden;margin-top:var(--space-6);border:1px solid var(--border)"></div>
          </div>
        </div>
      </div>
    </div>
  `;

  container.querySelector('#contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Mesajınız gönderildi! En kısa sürede dönüş yapacağız.', 'success');
    e.target.reset();
  });

  // Map
  try {
    if (window.L) {
      const map = L.map('contact-map').setView([41.0812, 29.0107], 15);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap' }).addTo(map);
      L.marker([41.0812, 29.0107]).addTo(map).bindPopup('HomeOfEmlak Ofis').openPopup();
    }
  } catch (e) { console.warn('Map error:', e); }

  setupScrollReveal();
}
