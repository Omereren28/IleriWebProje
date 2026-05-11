/**
 * HomeOfEmlak — Favorites Page
 */
import { getFavorites, toggleFavorite } from '../utils/storage.js';
import { getPropertyById } from '../data.js';
import { createPropertyCard } from '../components/propertyCard.js';

export function renderFavoritesPage(container) {
  const favIds = getFavorites();
  const properties = favIds.map(id => getPropertyById(id)).filter(Boolean);

  container.innerHTML = `
    <div class="form-page">
      <div class="container">
        <div class="form-page__header">
          <h1 class="heading-2">❤️ Favorilerim</h1>
          <p class="text-body">${properties.length} ilan favorilerinizde</p>
        </div>
        <div class="property-grid" id="fav-grid"></div>
      </div>
    </div>
  `;

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
