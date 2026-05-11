/**
 * HomeOfEmlak — Header Component
 */
import { toggleTheme, getTheme } from '../utils/storage.js';
import { getCompareList } from '../utils/storage.js';

export function renderHeader() {
  const header = document.getElementById('site-header');
  const theme = getTheme();
  const compareCount = getCompareList().length;

  const userStr = localStorage.getItem('emlak_user');
  const user = userStr ? JSON.parse(userStr) : null;

  header.innerHTML = `
    <nav class="navbar" id="navbar">
      <div class="container navbar__inner">
        <a href="#/" class="navbar__logo" aria-label="HomeOfEmlak Ana Sayfa">
          <span class="logo-icon">🏠</span>
          <span class="logo-text">Home<span class="logo-accent">Of</span>Emlak</span>
        </a>

        <div class="navbar__links" id="nav-links">
          <a href="#/" class="nav-link nav-link--active">Ana Sayfa</a>
          <a href="#/ilanlar" class="nav-link">İlanlar</a>
          <a href="#/ilan-ver" class="nav-link">İlan Ver</a>
          <a href="#/hakkimizda" class="nav-link">Hakkımızda</a>
          <a href="#/iletisim" class="nav-link">İletişim</a>
        </div>

        <div class="navbar__actions">
          ${user ? `
            <div style="display:flex;align-items:center;gap:8px;margin-right:8px;cursor:pointer" onclick="localStorage.removeItem('emlak_user');window.location.reload()" title="Çıkış Yap">
              <div style="width:32px;height:32px;border-radius:50%;background:var(--primary);color:white;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px">${user.name.charAt(0).toUpperCase()}</div>
            </div>
          ` : `
            <a href="#/giris" class="btn btn--primary btn--sm" style="margin-right:8px;padding:6px 12px">Giriş Yap</a>
          `}
          <a href="#/favorilerim" class="nav-action" aria-label="Favoriler" title="Favoriler">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </a>
          <a href="#/karsilastir" class="nav-action nav-action--compare" aria-label="Karşılaştır" title="Karşılaştır">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
            ${compareCount > 0 ? `<span class="nav-badge">${compareCount}</span>` : ''}
          </a>
          <button class="nav-action theme-toggle" id="theme-toggle" aria-label="Tema Değiştir" title="Tema Değiştir">
            ${theme === 'light'
              ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>'
              : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
            }
          </button>
          <button class="navbar__hamburger" id="hamburger" aria-label="Menü" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </nav>

    <div class="mobile-menu" id="mobile-menu" aria-hidden="true">
      <div class="mobile-menu__overlay" id="mobile-overlay"></div>
      <div class="mobile-menu__panel">
        <div class="mobile-menu__header">
          <span class="logo-text">Home<span class="logo-accent">Of</span>Emlak</span>
          <button class="mobile-menu__close" id="mobile-close" aria-label="Menüyü Kapat">✕</button>
        </div>
        <nav class="mobile-menu__nav">
          <a href="#/" class="mobile-link">Ana Sayfa</a>
          <a href="#/ilanlar" class="mobile-link">İlanlar</a>
          <a href="#/ilan-ver" class="mobile-link">İlan Ver</a>
          <a href="#/favorilerim" class="mobile-link">Favorilerim</a>
          <a href="#/karsilastir" class="mobile-link">Karşılaştır</a>
          <a href="#/hakkimizda" class="mobile-link">Hakkımızda</a>
          <a href="#/iletisim" class="mobile-link">İletişim</a>
        </nav>
      </div>
    </div>
  `;

  setupHeaderEvents(header);
}

function setupHeaderEvents(header) {
  // Scroll effect
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    const scrolled = window.scrollY > 20;
    navbar.classList.toggle('navbar--scrolled', scrolled);
  });

  // Theme toggle
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      toggleTheme();
      renderHeader(); // Re-render to update icon
    });
  }

  // Hamburger
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const mobileClose = document.getElementById('mobile-close');

  function openMobile() {
    mobileMenu.classList.add('mobile-menu--open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeMobile() {
    mobileMenu.classList.remove('mobile-menu--open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburger) hamburger.addEventListener('click', openMobile);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobile);
  if (mobileClose) mobileClose.addEventListener('click', closeMobile);

  // Close mobile on link click
  mobileMenu?.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', closeMobile);
  });

  // Update compare badge on change
  window.addEventListener('compare-changed', () => {
    const badge = header.querySelector('.nav-action--compare .nav-badge');
    const count = getCompareList().length;
    if (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? '' : 'none';
    } else if (count > 0) {
      const compareLink = header.querySelector('.nav-action--compare');
      if (compareLink) {
        const span = document.createElement('span');
        span.className = 'nav-badge';
        span.textContent = count;
        compareLink.appendChild(span);
      }
    }
  });

  // Update header when user logs in/out
  window.addEventListener('user-login', () => {
    renderHeader();
  });
}
