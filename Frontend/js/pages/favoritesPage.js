/**
 * HomeOfEmlak — Favorites Page (API Entegreli)
 */
import { getFavorites as getLocalFavorites } from '../utils/storage.js';
import * as API from '../services/api.js';
import { createPropertyCard } from '../components/propertyCard.js';

export async function renderFavoritesPage(container) {
  container.innerHTML = `
    <div class="form-page">
      <div class="container">
        <div class="form-page__header">
          <h1 class="heading-2">❤️ Favorilerim</h1>
          <p class="text-body">Yükleniyor...</p>
        </div>
        <div class="property-grid" id="fav-grid"></div>
      </div>
    </div>
  `;

  let properties = [];

  // Giriş yapmışsa API'den, yapmamışsa localStorage'dan
  if (API.isLoggedIn()) {
    try {
      const res = await API.getFavorites();
      properties = res.data?.properties || [];
    } catch (e) {
      console.warn('Favorites API error:', e);
    }
  }

  // localStorage favorileri de göster (offline destek)
  if (properties.length === 0) {
    const { getPropertyById } = await import('../data.js');
    const favIds = getLocalFavorites();
    properties = favIds.map(id => getPropertyById(id)).filter(Boolean);
  }

  container.querySelector('.text-body').textContent = `${properties.length} ilan favorilerinizde`;

  const grid = container.querySelector('#fav-grid');
  if (properties.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <div class="empty-state__icon">💔</div>
        <h3 class="empty-state__title">Henüz favori ilanınız yok</h3>
        <p class="empty-state__desc">İlan detay sayfalarından kalp ikonuna tıklayarak favorilerinize ekleyebilirsiniz.</p>
        <a href="#/ilanlar" class="btn btn--primary">İlanları Keşfet</a>
      </div>`;
    return;
  }
  properties.forEach(p => grid.appendChild(createPropertyCard(p)));

  window.addEventListener('favorites-changed', () => renderFavoritesPage(container), { once: true });
}
