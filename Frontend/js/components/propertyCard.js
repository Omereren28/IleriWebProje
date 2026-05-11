/**
 * HomeOfEmlak — Property Card Component (API + Legacy uyumlu)
 */
import { formatPrice, truncate, timeAgo, categoryLabels, typeLabels } from '../utils/helpers.js';
import { toggleFavorite, isFavorite, toggleCompare, isInCompare } from '../utils/storage.js';
import { showToast } from './toast.js';

/**
 * API verisini normalize et (hem eski data.js formatı hem API formatı desteklenir)
 */
function normalizeProperty(p) {
  // images: API'den {id, url, sortOrder}[] gelir, data.js'den string[] gelir
  let images = [];
  if (p.images && p.images.length > 0) {
    images = p.images.map(img => typeof img === 'string' ? img : img.url);
  }

  // location: data.js'de nested object, API'de flat
  const location = p.location || {
    city: p.city,
    district: p.district,
    neighborhood: p.neighborhood
  };

  // features: data.js'de nested object, API'de flat
  const features = p.features || {
    rooms: p.rooms,
    sqmGross: p.sqmGross || p.sqm_gross,
    sqmNet: p.sqmNet || p.sqm_net,
    floor: p.floor,
    totalFloors: p.totalFloors || p.total_floors,
    buildingAge: p.buildingAge || p.building_age,
    bathrooms: p.bathrooms,
    heating: p.heating,
    furnished: p.furnished,
    balcony: p.balcony,
    elevator: p.elevator,
    parking: p.parking,
    pool: p.pool,
    security: p.security
  };

  // owner: data.js'de nested, API'de flat
  const owner = p.owner || {
    name: p.ownerName || p.owner_name,
    phone: p.ownerPhone || p.owner_phone,
    type: p.ownerType || p.owner_type
  };

  return {
    ...p,
    images,
    location,
    features,
    owner,
    createdAt: p.createdAt || p.created_at
  };
}

export { normalizeProperty };

export function createPropertyCard(property, options = {}) {
  const { compact = false } = options;
  const p = normalizeProperty(property);
  const fav = isFavorite(p.id);
  const inCompare = isInCompare(p.id);

  const mainImg = p.images[0] || 'https://via.placeholder.com/600x400?text=Görsel+Yok';
  const hoverImg = p.images[1];

  const card = document.createElement('article');
  card.className = 'property-card card';
  card.dataset.id = p.id;

  card.innerHTML = `
    <a href="#/ilan/${p.id}" class="property-card__image img-zoom">
      <img src="${mainImg}" alt="${p.title}" loading="lazy" />
      ${hoverImg ? `<img src="${hoverImg}" alt="${p.title}" class="property-card__img-hover" loading="lazy" />` : ''}
      <div class="property-card__badges">
        <span class="badge badge--${p.type}">${typeLabels[p.type]}</span>
        <span class="badge badge--primary">${categoryLabels[p.category]}</span>
      </div>
      <div class="property-card__price">${formatPrice(p.price)}${p.type === 'rent' ? '/ay' : ''}</div>
    </a>
    <div class="property-card__body">
      <a href="#/ilan/${p.id}" class="property-card__title">${p.title}</a>
      <p class="property-card__location">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        ${p.location.district}, ${p.location.city}
      </p>
      ${!compact ? `<p class="property-card__desc">${truncate(p.description, 80)}</p>` : ''}
      <div class="property-card__features">
        ${p.features.rooms !== '-' ? `<span class="feature-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7v11a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V7"/><path d="M21 7H3l2-4h14l2 4z"/></svg> ${p.features.rooms}</span>` : ''}
        <span class="feature-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg> ${p.features.sqmNet} m²</span>
        ${p.features.bathrooms > 0 ? `<span class="feature-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12h16a1 1 0 0 1 1 1v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3a1 1 0 0 1 1-1z"/><path d="M6 12V5a2 2 0 0 1 2-2h1"/></svg> ${p.features.bathrooms}</span>` : ''}
        ${p.features.floor > 0 ? `<span class="feature-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="4" y1="10" x2="20" y2="10"/></svg> ${p.features.floor}. Kat</span>` : ''}
      </div>
      <div class="property-card__footer">
        <span class="property-card__date">${timeAgo(p.createdAt)}</span>
        <div class="property-card__actions">
          <button class="card-action fav-btn ${fav ? 'fav-btn--active' : ''}" data-id="${p.id}" aria-label="Favorilere Ekle" title="Favorilere Ekle">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="${fav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
          <button class="card-action compare-btn ${inCompare ? 'compare-btn--active' : ''}" data-id="${p.id}" aria-label="Karşılaştırmaya Ekle" title="Karşılaştırmaya Ekle">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
          </button>
        </div>
      </div>
    </div>
  `;

  // Favorite event
  card.querySelector('.fav-btn').addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const added = toggleFavorite(p.id);
    const btn = card.querySelector('.fav-btn');
    btn.classList.toggle('fav-btn--active', added);
    btn.querySelector('svg').setAttribute('fill', added ? 'currentColor' : 'none');
    if (added) btn.classList.add('fav-pulse');
    showToast(added ? 'Favorilere eklendi' : 'Favorilerden çıkarıldı', added ? 'success' : 'info');
  });

  // Compare event
  card.querySelector('.compare-btn').addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const result = toggleCompare(p.id);
    if (result.full) {
      showToast('En fazla 3 ilan karşılaştırılabilir', 'warning');
      return;
    }
    card.querySelector('.compare-btn').classList.toggle('compare-btn--active', result.added);
    showToast(result.added ? 'Karşılaştırmaya eklendi' : 'Karşılaştırmadan çıkarıldı', result.added ? 'success' : 'info');
  });

  return card;
}
