/**
 * HomeOfEmlak — Footer Component
 */

export function renderFooter() {
  const footer = document.getElementById('site-footer');
  const year = new Date().getFullYear();

  footer.innerHTML = `
    <div class="footer">
      <div class="container">
        <div class="footer__grid">
          <div class="footer__brand">
            <a href="#/" class="footer__logo">
              <span class="logo-icon">🏠</span>
              <span class="logo-text">Home<span class="logo-accent">Of</span>Emlak</span>
            </a>
            <p class="footer__desc">Türkiye'nin güvenilir gayrimenkul platformu. Hayalinizdeki evi bulmak için doğru adres.</p>
            <div class="footer__social">
              <a href="#" class="social-link" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" class="social-link" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
              </a>
              <a href="#" class="social-link" aria-label="Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
              </a>
              <a href="#" class="social-link" aria-label="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white"/></svg>
              </a>
            </div>
          </div>

          <div class="footer__col">
            <h4 class="footer__heading">Hızlı Linkler</h4>
            <a href="#/" class="footer__link">Ana Sayfa</a>
            <a href="#/ilanlar" class="footer__link">Tüm İlanlar</a>
            <a href="#/ilan-ver" class="footer__link">İlan Ver</a>
            <a href="#/hakkimizda" class="footer__link">Hakkımızda</a>
            <a href="#/iletisim" class="footer__link">İletişim</a>
          </div>

          <div class="footer__col">
            <h4 class="footer__heading">Kategoriler</h4>
            <a href="#/ilanlar?category=apartment" class="footer__link">Konut</a>
            <a href="#/ilanlar?category=villa" class="footer__link">Villa</a>
            <a href="#/ilanlar?category=land" class="footer__link">Arsa</a>
            <a href="#/ilanlar?category=commercial" class="footer__link">İş Yeri</a>
            <a href="#/ilanlar?category=summer" class="footer__link">Yazlık</a>
          </div>

          <div class="footer__col">
            <h4 class="footer__heading">İletişim</h4>
            <p class="footer__info">📍 Levent, İstanbul, Türkiye</p>
            <p class="footer__info">📞 0212 123 45 67</p>
            <p class="footer__info">✉️ info@homeofemlak.com</p>
            <p class="footer__info">🕐 Pzt-Cum: 09:00 - 18:00</p>
          </div>
        </div>

        <div class="footer__bottom">
          <span>© ${year} HomeOfEmlak. Tüm hakları saklıdır.</span>
          <div class="footer__bottom-links">
            <a href="#">Gizlilik Politikası</a>
            <a href="#">Kullanım Şartları</a>
            <a href="#">KVKK</a>
          </div>
        </div>
      </div>
    </div>
  `;
}
