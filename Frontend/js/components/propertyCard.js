/**
 * HomeOfEmlak — Property Card Component
 */
import { formatPrice, truncate, timeAgo, categoryLabels, typeLabels } from '../utils/helpers.js';
import { toggleFavorite, isFavorite, toggleCompare, isInCompare } from '../utils/storage.js';
import { showToast } from './toast.js';

export function createPropertyCard(property, options = {}) {
  const { compact = false } = options;
  const fav = isFavorite(property.id);
  const inCompare = isInCompare(property.id);

  const card = document.createElement('article');
  card.className = 'property-card card';
  card.dataset.id = property.id;

  card.innerHTML = `
    <a href="#/ilan/${property.id}" class="property-card__image img-zoom">
      <img src="${property.images[0]}" alt="${property.title}" loading="lazy" />
      ${property.images[1] ? `<img src="${property.images[1]}" alt="${property.title}" class="property-card__img-hover" loading="lazy" />` : ''}
      <div class="property-card__badges">
        <span class="badge badge--${property.type}">${typeLabels[property.type]}</span>
        <span class="badge badge--primary">${categoryLabels[property.category]}</span>
      </div>
      <div class="property-card__price">${formatPrice(property.price)}${property.type === 'rent' ? '/ay' : ''}</div>
    </a>
    <div class="property-card__body">
      <a href="#/ilan/${property.id}" class="property-card__title">${property.title}</a>
      <p class="property-card__location">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        ${property.location.district}, ${property.location.city}
      </p>
      ${!compact ? `<p class="property-card__desc">${truncate(property.description, 80)}</p>` : ''}
      <div class="property-card__features">
        ${property.features.rooms !== '-' ? `<span class="feature-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7v11a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V7"/><path d="M21 7H3l2-4h14l2 4z"/></svg> ${property.features.rooms}</span>` : ''}
        <span class="feature-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg> ${property.features.sqmNet} m²</span>
        ${property.features.bathrooms > 0 ? `<span class="feature-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12h16a1 1 0 0 1 1 1v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3a1 1 0 0 1 1-1z"/><path d="M6 12V5a2 2 0 0 1 2-2h1"/></svg> ${property.features.bathrooms}</span>` : ''}
        ${property.features.floor > 0 ? `<span class="feature-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="4" y1="10" x2="20" y2="10"/></svg> ${property.features.floor}. Kat</span>` : ''}
      </div>
      <div class="property-card__footer">
        <span class="property-card__date">${timeAgo(property.createdAt)}</span>
        <div class="property-card__actions">
          <button class="card-action fav-btn ${fav ? 'fav-btn--active' : ''}" data-id="${property.id}" aria-label="Favorilere Ekle" title="Favorilere Ekle">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="${fav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
          <button class="card-action compare-btn ${inCompare ? 'compare-btn--active' : ''}" data-id="${property.id}" aria-label="Karşılaştırmaya Ekle" title="Karşılaştırmaya Ekle">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
          </button>
        </div>
      </div>
    </div>
  `;

  // Event listeners
  card.querySelector('.fav-btn').addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const added = toggleFavorite(property.id);
    const btn = card.querySelector('.fav-btn');
    btn.classList.toggle('fav-btn--active', added);
    btn.querySelector('svg').setAttribute('fill', added ? 'currentColor' : 'none');
    if (added) btn.classList.add('fav-pulse');
    showToast(added ? 'Favorilere eklendi' : 'Favorilerden çıkarıldı', added ? 'success' : 'info');
  });

  card.querySelector('.compare-btn').addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const result = toggleCompare(property.id);
    if (result.full) {
      showToast('En fazla 3 ilan karşılaştırılabilir', 'warning');
      return;
    }
    card.querySelector('.compare-btn').classList.toggle('compare-btn--active', result.added);
    showToast(result.added ? 'Karşılaştırmaya eklendi' : 'Karşılaştırmadan çıkarıldı', result.added ? 'success' : 'info');
  });

  return card;
}
