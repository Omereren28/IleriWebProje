/**
 * HomeOfEmlak — Compare Page
 */
import { getCompareList, clearCompare } from '../utils/storage.js';
import { getPropertyById } from '../data.js';
import { formatPrice, categoryLabels, typeLabels, heatingLabels } from '../utils/helpers.js';
import { showToast } from '../components/toast.js';

export function renderComparePage(container) {
  const ids = getCompareList();
  const properties = ids.map(id => getPropertyById(id)).filter(Boolean);

  container.innerHTML = `
    <div class="form-page">
      <div class="container">
        <div class="form-page__header">
          <h1 class="heading-2">📊 İlan Karşılaştır</h1>
          <p class="text-body">${properties.length}/3 ilan seçildi</p>
          ${properties.length > 0 ? `<button class="btn btn--ghost btn--sm" id="clear-compare" style="margin-top:var(--space-4)">Temizle</button>` : ''}
        </div>
        <div id="compare-content"></div>
      </div>
    </div>
  `;

  const content = container.querySelector('#compare-content');
  if (properties.length === 0) {
    content.innerHTML = `
      <div class="empty-state">
        <div class="empty-state__icon">📊</div>
        <h3 class="empty-state__title">Karşılaştırma listeniz boş</h3>
        <p class="empty-state__desc">İlan kartlarındaki grafik ikonuna tıklayarak ilanları karşılaştırma listenize ekleyebilirsiniz.</p>
        <a href="#/ilanlar" class="btn btn--primary">İlanları Keşfet</a>
      </div>`;
    return;
  }

  const rows = [
    ['Resim', p => `<img src="${p.images[0]}" alt="${p.title}" style="width:100%;height:150px;object-fit:cover;border-radius:var(--radius-md)">`],
    ['Başlık', p => `<a href="#/ilan/${p.id}" style="color:var(--primary);font-weight:600">${p.title}</a>`],
    ['Fiyat', p => `<strong>${formatPrice(p.price)}</strong>`],
    ['Tür', p => typeLabels[p.type]],
    ['Kategori', p => categoryLabels[p.category]],
    ['Konum', p => `${p.location.district}, ${p.location.city}`],
    ['Oda', p => p.features.rooms],
    ['m² (Net)', p => `${p.features.sqmNet} m²`],
    ['Bina Yaşı', p => p.features.buildingAge || '-'],
    ['Kat', p => p.features.floor || '-'],
    ['Banyo', p => p.features.bathrooms || '-'],
    ['Isınma', p => heatingLabels[p.features.heating] || p.features.heating || '-'],
    ['Balkon', p => p.features.balcony ? '✅' : '❌'],
    ['Asansör', p => p.features.elevator ? '✅' : '❌'],
    ['Otopark', p => p.features.parking ? '✅' : '❌'],
    ['Havuz', p => p.features.pool ? '✅' : '❌'],
  ];

  let html = '<div style="overflow-x:auto"><table class="compare-table"><tbody>';
  rows.forEach(([label, getter]) => {
    html += `<tr><th>${label}</th>`;
    properties.forEach(p => { html += `<td>${getter(p)}</td>`; });
    html += '</tr>';
  });
  html += '</tbody></table></div>';
  content.innerHTML = html;

  container.querySelector('#clear-compare')?.addEventListener('click', () => {
    clearCompare();
    showToast('Karşılaştırma listesi temizlendi', 'info');
    renderComparePage(container);
  });
}
