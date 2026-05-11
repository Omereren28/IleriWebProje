/**
 * HomeOfEmlak — Listing Page
 */
import { filterProperties, cities, categories } from '../data.js';
import { createPropertyCard } from '../components/propertyCard.js';
import { setupScrollReveal, categoryLabels } from '../utils/helpers.js';

const ITEMS_PER_PAGE = 6;

export function renderListingPage(container, params) {
  // Parse URL params
  const urlParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
  const filters = {
    type: urlParams.get('type') || '',
    category: urlParams.get('category') || '',
    city: urlParams.get('city') || '',
    district: urlParams.get('district') || '',
    minPrice: urlParams.get('minPrice') || '',
    maxPrice: urlParams.get('maxPrice') || '',
    rooms: urlParams.get('rooms') || '',
    sort: urlParams.get('sort') || 'date-desc',
    query: urlParams.get('q') || '',
  };

  let currentPage = 1;
  let viewMode = 'grid';

  container.innerHTML = `
    <div class="listing-page">
      <div class="container">
        <div class="listing-page__layout">
          <div class="listing-page__header">
            <div>
              <h1 class="heading-3">İlanlar</h1>
              <p class="listing-page__count" id="listing-count"></p>
            </div>
            <div class="listing-page__controls">
              <select class="sort-select" id="sort-select">
                <option value="date-desc" ${filters.sort === 'date-desc' ? 'selected' : ''}>En Yeni</option>
                <option value="date-asc" ${filters.sort === 'date-asc' ? 'selected' : ''}>En Eski</option>
                <option value="price-asc" ${filters.sort === 'price-asc' ? 'selected' : ''}>Fiyat (Artan)</option>
                <option value="price-desc" ${filters.sort === 'price-desc' ? 'selected' : ''}>Fiyat (Azalan)</option>
                <option value="sqm-desc" ${filters.sort === 'sqm-desc' ? 'selected' : ''}>m² (Büyük)</option>
              </select>
              <div class="view-toggle">
                <button class="view-toggle__btn view-toggle__btn--active" data-view="grid" title="Grid">▦</button>
                <button class="view-toggle__btn" data-view="list" title="Liste">☰</button>
              </div>
            </div>
          </div>

          <!-- Filter Panel -->
          <aside class="filter-panel" id="filter-panel">
            <h3 class="filter-panel__title">Filtreler</h3>

            <div class="filter-group">
              <label class="filter-group__label">İlan Türü</label>
              <div class="filter-type-toggle">
                <button class="filter-type-btn ${!filters.type ? 'filter-type-btn--active' : ''}" data-type="">Hepsi</button>
                <button class="filter-type-btn ${filters.type === 'sale' ? 'filter-type-btn--active' : ''}" data-type="sale">Satılık</button>
                <button class="filter-type-btn ${filters.type === 'rent' ? 'filter-type-btn--active' : ''}" data-type="rent">Kiralık</button>
              </div>
            </div>

            <div class="filter-group">
              <label class="filter-group__label">Kategori</label>
              <select id="filter-category" style="width:100%">
                <option value="">Tümü</option>
                ${categories.map(c => `<option value="${c.key}" ${filters.category === c.key ? 'selected' : ''}>${c.label}</option>`).join('')}
              </select>
            </div>

            <div class="filter-group">
              <label class="filter-group__label">Şehir</label>
              <select id="filter-city" style="width:100%">
                <option value="">Tümü</option>
                ${cities.map(c => `<option value="${c.name}" ${filters.city === c.name ? 'selected' : ''}>${c.name}</option>`).join('')}
              </select>
            </div>

            <div class="filter-group">
              <label class="filter-group__label">Fiyat Aralığı</label>
              <div class="filter-range">
                <input type="number" id="filter-min-price" placeholder="Min ₺" value="${filters.minPrice}">
                <input type="number" id="filter-max-price" placeholder="Max ₺" value="${filters.maxPrice}">
              </div>
            </div>

            <div class="filter-group">
              <label class="filter-group__label">Oda Sayısı</label>
              <div class="filter-rooms" id="filter-rooms">
                ${['1+0', '1+1', '2+1', '3+1', '4+1', '5+'].map(r =>
                  `<button class="filter-room-btn ${filters.rooms === r ? 'filter-room-btn--active' : ''}" data-room="${r}">${r}</button>`
                ).join('')}
              </div>
            </div>

            <div class="filter-actions">
              <button class="btn btn--ghost btn--sm" id="filter-clear" style="flex:1">Temizle</button>
              <button class="btn btn--primary btn--sm" id="filter-apply" style="flex:1">Uygula</button>
            </div>
          </aside>

          <!-- Results -->
          <div class="listing-page__results">
            <div class="property-grid" id="results-grid"></div>
            <div id="pagination-container"></div>
          </div>
        </div>
      </div>
    </div>
  `;

  function applyFilters() {
    const f = {
      type: container.querySelector('.filter-type-btn--active')?.dataset.type || '',
      category: container.querySelector('#filter-category').value,
      city: container.querySelector('#filter-city').value,
      minPrice: container.querySelector('#filter-min-price').value,
      maxPrice: container.querySelector('#filter-max-price').value,
      rooms: container.querySelector('.filter-room-btn--active')?.dataset.room || '',
      sort: container.querySelector('#sort-select').value,
    };

    const results = filterProperties(f);
    const totalPages = Math.ceil(results.length / ITEMS_PER_PAGE);
    currentPage = Math.min(currentPage, totalPages || 1);

    const paged = results.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    // Update count
    container.querySelector('#listing-count').textContent = `${results.length} ilan bulundu`;

    // Render results
    const grid = container.querySelector('#results-grid');
    grid.innerHTML = '';

    if (paged.length === 0) {
      grid.innerHTML = `
        <div class="empty-state" style="grid-column:1/-1">
          <div class="empty-state__icon">🔍</div>
          <h3 class="empty-state__title">İlan Bulunamadı</h3>
          <p class="empty-state__desc">Filtrelerinizi değiştirerek tekrar deneyin.</p>
        </div>
      `;
      container.querySelector('#pagination-container').innerHTML = '';
      return;
    }

    if (viewMode === 'list') {
      grid.style.gridTemplateColumns = '1fr';
    } else {
      grid.style.gridTemplateColumns = '';
    }

    paged.forEach(prop => {
      grid.appendChild(createPropertyCard(prop));
    });

    // Pagination
    renderPagination(container.querySelector('#pagination-container'), currentPage, totalPages);
  }

  function renderPagination(el, current, total) {
    if (total <= 1) { el.innerHTML = ''; return; }
    let html = '<div class="pagination">';
    html += `<button class="pagination__btn" data-page="${current - 1}" ${current === 1 ? 'disabled' : ''}>‹</button>`;
    for (let i = 1; i <= total; i++) {
      html += `<button class="pagination__btn ${i === current ? 'pagination__btn--active' : ''}" data-page="${i}">${i}</button>`;
    }
    html += `<button class="pagination__btn" data-page="${current + 1}" ${current === total ? 'disabled' : ''}>›</button>`;
    html += '</div>';
    el.innerHTML = html;

    el.querySelectorAll('.pagination__btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const page = parseInt(btn.dataset.page);
        if (page >= 1 && page <= total) {
          currentPage = page;
          applyFilters();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    });
  }

  // Event listeners
  container.querySelectorAll('.filter-type-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.filter-type-btn').forEach(b => b.classList.remove('filter-type-btn--active'));
      btn.classList.add('filter-type-btn--active');
    });
  });

  container.querySelectorAll('.filter-room-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const isActive = btn.classList.contains('filter-room-btn--active');
      container.querySelectorAll('.filter-room-btn').forEach(b => b.classList.remove('filter-room-btn--active'));
      if (!isActive) btn.classList.add('filter-room-btn--active');
    });
  });

  container.querySelector('#filter-apply').addEventListener('click', () => { currentPage = 1; applyFilters(); });
  container.querySelector('#filter-clear').addEventListener('click', () => {
    container.querySelectorAll('.filter-type-btn').forEach(b => b.classList.remove('filter-type-btn--active'));
    container.querySelector('.filter-type-btn[data-type=""]').classList.add('filter-type-btn--active');
    container.querySelector('#filter-category').value = '';
    container.querySelector('#filter-city').value = '';
    container.querySelector('#filter-min-price').value = '';
    container.querySelector('#filter-max-price').value = '';
    container.querySelectorAll('.filter-room-btn').forEach(b => b.classList.remove('filter-room-btn--active'));
    currentPage = 1;
    applyFilters();
  });

  container.querySelector('#sort-select').addEventListener('change', () => { currentPage = 1; applyFilters(); });

  container.querySelectorAll('.view-toggle__btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.view-toggle__btn').forEach(b => b.classList.remove('view-toggle__btn--active'));
      btn.classList.add('view-toggle__btn--active');
      viewMode = btn.dataset.view;
      applyFilters();
    });
  });

  // Initial render
  applyFilters();
  setupScrollReveal();
}
