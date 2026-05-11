/**
 * HomeOfEmlak — Home Page
 */
import { getFeaturedProperties, getLatestProperties, categories, stats, testimonials, cities } from '../data.js';
import { createPropertyCard } from '../components/propertyCard.js';
import { setupScrollReveal, animateCounter } from '../utils/helpers.js';
import { navigate } from '../router.js';

export function renderHomePage(container) {
  const featured = getFeaturedProperties();
  const latest = getLatestProperties(6);

  container.innerHTML = `
    <!-- HERO -->
    <section class="hero" id="hero">
      <div class="hero__bg"></div>
      <div class="hero__overlay"></div>
      <div class="container hero__content">
        <span class="hero__badge reveal">🏠 Türkiye'nin Güvenilir Emlak Platformu</span>
        <h1 class="heading-1 hero__title reveal">Hayalinizdeki<br><span class="hero__accent">Evi Bulun</span></h1>
        <p class="hero__sub reveal">Binlerce ilan arasından size en uygun gayrimenkulü kolayca keşfedin.</p>

        <form class="hero-search reveal" id="hero-search-form">
          <div class="hero-search__row">
            <div class="hero-search__field">
              <label class="hero-search__label">Konum</label>
              <select id="hero-city" class="hero-search__select">
                <option value="">Tüm Şehirler</option>
                ${cities.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
              </select>
            </div>
            <div class="hero-search__field">
              <label class="hero-search__label">Tür</label>
              <select id="hero-type" class="hero-search__select">
                <option value="">Hepsi</option>
                <option value="sale">Satılık</option>
                <option value="rent">Kiralık</option>
              </select>
            </div>
            <div class="hero-search__field">
              <label class="hero-search__label">Kategori</label>
              <select id="hero-category" class="hero-search__select">
                <option value="">Tümü</option>
                ${categories.map(c => `<option value="${c.key}">${c.label}</option>`).join('')}
              </select>
            </div>
            <div class="hero-search__field">
              <label class="hero-search__label">Min Fiyat</label>
              <input type="number" id="hero-min-price" class="hero-search__input" placeholder="₺ Min">
            </div>
            <div class="hero-search__field">
              <label class="hero-search__label">Max Fiyat</label>
              <input type="number" id="hero-max-price" class="hero-search__input" placeholder="₺ Max">
            </div>
            <button type="submit" class="btn btn--accent btn--lg hero-search__btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              Ara
            </button>
          </div>
        </form>

        <div class="hero__mini-stats reveal">
          <div class="mini-stat"><strong>12.500+</strong><span>Aktif İlan</span></div>
          <div class="mini-stat"><strong>81</strong><span>Şehir</span></div>
          <div class="mini-stat"><strong>3.200+</strong><span>Mutlu Müşteri</span></div>
        </div>
      </div>
    </section>

    <!-- CATEGORIES -->
    <section class="section" id="categories-section">
      <div class="container">
        <div class="section__header reveal">
          <p class="section__eyebrow">Kategoriler</p>
          <h2 class="section__title">Ne Arıyorsunuz?</h2>
          <p class="section__subtitle">İhtiyacınıza uygun gayrimenkul türünü seçin</p>
        </div>
        <div class="categories-grid" id="categories-grid"></div>
      </div>
    </section>

    <!-- FEATURED -->
    <section class="section section--alt" id="featured-section">
      <div class="container">
        <div class="section__header reveal">
          <p class="section__eyebrow">Öne Çıkanlar</p>
          <h2 class="section__title">Seçili İlanlar</h2>
          <p class="section__subtitle">Editörlerimizin özenle seçtiği ilanları keşfedin</p>
        </div>
        <div class="featured-slider" id="featured-slider">
          <button class="slider-arrow slider-arrow--prev" id="slider-prev" aria-label="Önceki">‹</button>
          <div class="slider-track" id="slider-track"></div>
          <button class="slider-arrow slider-arrow--next" id="slider-next" aria-label="Sonraki">›</button>
        </div>
      </div>
    </section>

    <!-- STATS -->
    <section class="section stats-section" id="stats-section">
      <div class="container">
        <div class="stats-grid" id="stats-grid"></div>
      </div>
    </section>

    <!-- LATEST -->
    <section class="section" id="latest-section">
      <div class="container">
        <div class="section__header reveal">
          <p class="section__eyebrow">Son Eklenenler</p>
          <h2 class="section__title">Yeni İlanlar</h2>
          <p class="section__subtitle">En son eklenen ilanları kaçırmayın</p>
        </div>
        <div class="property-grid" id="latest-grid"></div>
        <div class="text-center" style="margin-top:var(--space-10)">
          <a href="#/ilanlar" class="btn btn--outline btn--lg">Tüm İlanları Gör →</a>
        </div>
      </div>
    </section>

    <!-- WHY US -->
    <section class="section section--alt" id="why-section">
      <div class="container">
        <div class="section__header reveal">
          <p class="section__eyebrow">Neden HomeOfEmlak?</p>
          <h2 class="section__title">Avantajlarımız</h2>
        </div>
        <div class="advantages-grid reveal"></div>
      </div>
    </section>

    <!-- TESTIMONIALS -->
    <section class="section" id="testimonials-section">
      <div class="container">
        <div class="section__header reveal">
          <p class="section__eyebrow">Müşteri Yorumları</p>
          <h2 class="section__title">Ne Diyorlar?</h2>
        </div>
        <div class="testimonials-grid" id="testimonials-grid"></div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section cta-section reveal" id="cta-section">
      <div class="container">
        <div class="cta-box">
          <h2 class="heading-2">İlanınızı <span style="color:var(--accent)">Hemen</span> Yayınlayın</h2>
          <p class="text-body" style="margin: var(--space-4) auto; max-width:500px;">Gayrimenkulünüzü binlerce potansiyel alıcıya ulaştırın. Ücretsiz ilan verin!</p>
          <a href="#/ilan-ver" class="btn btn--accent btn--lg">Ücretsiz İlan Ver →</a>
        </div>
      </div>
    </section>
  `;

  // Render categories
  const catGrid = container.querySelector('#categories-grid');
  categories.forEach((cat, i) => {
    const card = document.createElement('a');
    card.href = `#/ilanlar?category=${cat.key}`;
    card.className = `category-card reveal stagger-${i + 1}`;
    card.innerHTML = `
      <span class="category-card__icon">${cat.icon}</span>
      <h3 class="category-card__title">${cat.label}</h3>
      <p class="category-card__count">${cat.count} ilan</p>
    `;
    catGrid.appendChild(card);
  });

  // Render featured slider
  const track = container.querySelector('#slider-track');
  featured.forEach(prop => {
    const card = createPropertyCard(prop, { compact: true });
    card.classList.add('slider-card');
    track.appendChild(card);
  });

  // Slider controls
  let sliderPos = 0;
  const prevBtn = container.querySelector('#slider-prev');
  const nextBtn = container.querySelector('#slider-next');

  function updateSlider() {
    const cards = track.querySelectorAll('.slider-card');
    const cardWidth = cards[0]?.offsetWidth + 24 || 360;
    const maxPos = Math.max(0, cards.length - Math.floor(track.parentElement.offsetWidth / cardWidth));
    sliderPos = Math.max(0, Math.min(sliderPos, maxPos));
    track.style.transform = `translateX(-${sliderPos * cardWidth}px)`;
  }

  prevBtn?.addEventListener('click', () => { sliderPos--; updateSlider(); });
  nextBtn?.addEventListener('click', () => { sliderPos++; updateSlider(); });

  // Render stats
  const statsGrid = container.querySelector('#stats-grid');
  stats.forEach(stat => {
    const div = document.createElement('div');
    div.className = 'stat-card reveal';
    div.innerHTML = `
      <span class="stat-card__value" data-target="${stat.value}">0</span><span class="stat-card__suffix">${stat.suffix}</span>
      <span class="stat-card__label">${stat.label}</span>
    `;
    statsGrid.appendChild(div);
  });

  // Render latest
  const latestGrid = container.querySelector('#latest-grid');
  latest.forEach(prop => {
    const card = createPropertyCard(prop);
    card.classList.add('reveal');
    latestGrid.appendChild(card);
  });

  // Render advantages
  const advantages = [
    { icon: '🔍', title: 'Kolay Arama', desc: 'Gelişmiş filtrelerle aradığınızı saniyeler içinde bulun' },
    { icon: '✅', title: 'Güvenilir İlanlar', desc: 'Tüm ilanlar kontrol edilir ve doğrulanır' },
    { icon: '📱', title: 'Her Cihazda', desc: 'Mobil, tablet ve masaüstünde mükemmel deneyim' },
    { icon: '💬', title: 'Anında İletişim', desc: 'İlan sahipleriyle kolayca iletişime geçin' },
  ];

  const advGrid = container.querySelector('.advantages-grid');
  advantages.forEach((a, i) => {
    const card = document.createElement('div');
    card.className = `advantage-card reveal stagger-${i + 1}`;
    card.innerHTML = `
      <span class="advantage-card__icon">${a.icon}</span>
      <h3 class="advantage-card__title">${a.title}</h3>
      <p class="advantage-card__desc">${a.desc}</p>
    `;
    advGrid.appendChild(card);
  });

  // Render testimonials
  const testGrid = container.querySelector('#testimonials-grid');
  testimonials.forEach((t, i) => {
    const card = document.createElement('div');
    card.className = `testimonial-card reveal stagger-${i + 1}`;
    card.innerHTML = `
      <div class="testimonial-card__stars">${'★'.repeat(t.rating)}${'☆'.repeat(5 - t.rating)}</div>
      <p class="testimonial-card__text">"${t.text}"</p>
      <div class="testimonial-card__author">
        <div class="testimonial-card__avatar">${t.name.charAt(0)}</div>
        <div><strong>${t.name}</strong><span>${t.city}</span></div>
      </div>
    `;
    testGrid.appendChild(card);
  });

  // Hero search form
  container.querySelector('#hero-search-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    const city = container.querySelector('#hero-city').value;
    const type = container.querySelector('#hero-type').value;
    const category = container.querySelector('#hero-category').value;
    const minPrice = container.querySelector('#hero-min-price').value;
    const maxPrice = container.querySelector('#hero-max-price').value;
    if (city) params.set('city', city);
    if (type) params.set('type', type);
    if (category) params.set('category', category);
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);
    navigate(`/ilanlar${params.toString() ? '?' + params.toString() : ''}`);
  });

  // Setup scroll reveal & counter animation
  setupScrollReveal();

  // Counter animation with IntersectionObserver
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('[data-target]').forEach(el => {
          animateCounter(el, parseInt(el.dataset.target));
        });
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  counterObserver.observe(statsGrid);
}
