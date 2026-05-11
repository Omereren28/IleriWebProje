/**
 * HomeOfEmlak — About Page
 */
import { stats } from '../data.js';
import { setupScrollReveal, animateCounter } from '../utils/helpers.js';

export function renderAboutPage(container) {
  const team = [
    { name: 'Ahmet Yılmaz', role: 'CEO & Kurucu', initial: 'A' },
    { name: 'Elif Kaya', role: 'CTO', initial: 'E' },
    { name: 'Mehmet Demir', role: 'Satış Direktörü', initial: 'M' },
    { name: 'Selin Arslan', role: 'Pazarlama Müdürü', initial: 'S' },
  ];

  container.innerHTML = `
    <div class="form-page">
      <div class="container">
        <div class="about-hero reveal">
          <p class="section__eyebrow">Hakkımızda</p>
          <h1 class="heading-1">Home<span style="color:var(--primary)">Of</span>Emlak</h1>
          <p class="text-body" style="max-width:650px;margin:var(--space-6) auto">
            2011 yılından bu yana Türkiye'nin dört bir yanında binlerce insanın hayalindeki evi bulmasına yardımcı oluyoruz. Güvenilir ilanlar, şeffaf süreçler ve müşteri memnuniyeti odaklı anlayışımızla sektörde fark yaratıyoruz.
          </p>
        </div>

        <div class="stats-section" style="border-radius:var(--radius-xl);margin:var(--space-10) 0">
          <div class="stats-grid" id="about-stats"></div>
        </div>

        <div style="margin:var(--space-16) 0">
          <div class="section__header reveal">
            <p class="section__eyebrow">Ekibimiz</p>
            <h2 class="section__title">Uzman Kadromuz</h2>
          </div>
          <div class="team-grid" id="team-grid"></div>
        </div>

        <div class="advantages-grid reveal" style="margin-top:var(--space-16)">
          <div class="advantage-card"><span class="advantage-card__icon">🎯</span><h3 class="advantage-card__title">Misyonumuz</h3><p class="advantage-card__desc">Gayrimenkul süreçlerini herkese erişilebilir, şeffaf ve güvenilir hale getirmek.</p></div>
          <div class="advantage-card"><span class="advantage-card__icon">🔭</span><h3 class="advantage-card__title">Vizyonumuz</h3><p class="advantage-card__desc">Türkiye'nin en güvenilir ve yenilikçi gayrimenkul platformu olmak.</p></div>
          <div class="advantage-card"><span class="advantage-card__icon">💎</span><h3 class="advantage-card__title">Değerlerimiz</h3><p class="advantage-card__desc">Güven, şeffaflık, yenilikçilik ve müşteri odaklılık.</p></div>
        </div>
      </div>
    </div>
  `;

  // Stats
  const statsGrid = container.querySelector('#about-stats');
  stats.forEach(stat => {
    const div = document.createElement('div');
    div.className = 'stat-card';
    div.innerHTML = `<span class="stat-card__value" data-target="${stat.value}">0</span><span class="stat-card__suffix">${stat.suffix}</span><span class="stat-card__label">${stat.label}</span>`;
    statsGrid.appendChild(div);
  });

  // Team
  const teamGrid = container.querySelector('#team-grid');
  team.forEach((t, i) => {
    const card = document.createElement('div');
    card.className = `team-card reveal stagger-${i + 1}`;
    card.innerHTML = `<div class="team-card__avatar">${t.initial}</div><h3 style="font-family:var(--font-display);font-weight:700">${t.name}</h3><p style="font-size:var(--text-sm);color:var(--text-secondary)">${t.role}</p>`;
    teamGrid.appendChild(card);
  });

  setupScrollReveal();

  // Counter animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('[data-target]').forEach(el => animateCounter(el, parseInt(el.dataset.target)));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  observer.observe(statsGrid);
}
