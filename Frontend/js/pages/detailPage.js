/**
 * HomeOfEmlak — Detail Page (API Entegreli)
 */
import * as API from '../services/api.js';
import { formatPrice, formatDate, categoryLabels, typeLabels, heatingLabels, setupScrollReveal } from '../utils/helpers.js';
import { createPropertyCard, normalizeProperty } from '../components/propertyCard.js';
import { toggleFavorite, isFavorite } from '../utils/storage.js';
import { showToast } from '../components/toast.js';
import { openModal } from '../components/modal.js';

export async function renderDetailPage(container, params) {
  // Loading state
  container.innerHTML = '<div style="text-align:center;padding:100px 20px;color:var(--text-muted)"><h2>Yükleniyor...</h2></div>';

  let property, similar = [];
  try {
    const res = await API.getPropertyById(params.id);
    property = normalizeProperty(res.data.property);
  } catch (error) {
    container.innerHTML = `
      <div class="empty-state" style="padding-top:calc(var(--header-height) + 80px)">
        <div class="empty-state__icon">🏠</div>
        <h2 class="empty-state__title">İlan Bulunamadı</h2>
        <p class="empty-state__desc">Bu ilan mevcut değil veya kaldırılmış olabilir.</p>
        <a href="#/ilanlar" class="btn btn--primary">İlanlara Dön</a>
      </div>`;
    return;
  }

  try {
    const simRes = await API.getSimilarProperties(params.id, 4);
    similar = simRes.data?.properties || [];
  } catch (e) { /* ignore */ }

  const fav = isFavorite(property.id);
  const f = property.features;

  container.innerHTML = `
    <div class="detail-page">
      <div class="container">
        <nav class="breadcrumb" style="margin-bottom:var(--space-6);font-size:var(--text-sm);color:var(--text-muted);">
          <a href="#/" style="color:var(--primary)">Ana Sayfa</a> ›
          <a href="#/ilanlar" style="color:var(--primary)">İlanlar</a> ›
          <span>${property.title}</span>
        </nav>

        <div class="detail-page__gallery" id="gallery">
          <img src="${property.images[0] || ''}" alt="${property.title}" class="detail-page__main-img" data-index="0" />
          <div class="detail-page__thumbs">
            ${property.images.slice(1, 3).map((img, i) =>
              `<img src="${img}" alt="${property.title}" class="detail-page__thumb" data-index="${i + 1}" />`
            ).join('')}
          </div>
        </div>

        <div class="detail-page__content">
          <div class="detail-page__info">
            <div>
              <div style="display:flex;gap:var(--space-3);margin-bottom:var(--space-3)">
                <span class="badge badge--${property.type}">${typeLabels[property.type]}</span>
                <span class="badge badge--primary">${categoryLabels[property.category]}</span>
              </div>
              <h1 class="detail-title">${property.title}</h1>
              <p class="detail-location" style="margin-top:var(--space-2)">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                ${property.location.neighborhood || ''}, ${property.location.district}, ${property.location.city}
              </p>
              <p class="detail-price" style="margin-top:var(--space-4)">${formatPrice(property.price)}${property.type === 'rent' ? ' /ay' : ''}</p>
            </div>

            <div>
              <h2 class="heading-3" style="margin-bottom:var(--space-4)">Özellikler</h2>
              <div class="features-table">
                <div class="features-table__item"><span class="features-table__label">İlan No</span><span class="features-table__value">${property.id}</span></div>
                <div class="features-table__item"><span class="features-table__label">İlan Tarihi</span><span class="features-table__value">${formatDate(property.createdAt)}</span></div>
                <div class="features-table__item"><span class="features-table__label">Emlak Tipi</span><span class="features-table__value">${categoryLabels[property.category]}</span></div>
                ${f.rooms !== '-' ? `<div class="features-table__item"><span class="features-table__label">Oda Sayısı</span><span class="features-table__value">${f.rooms}</span></div>` : ''}
                <div class="features-table__item"><span class="features-table__label">m² (Brüt)</span><span class="features-table__value">${f.sqmGross} m²</span></div>
                <div class="features-table__item"><span class="features-table__label">m² (Net)</span><span class="features-table__value">${f.sqmNet} m²</span></div>
                ${f.floor > 0 ? `<div class="features-table__item"><span class="features-table__label">Bulunduğu Kat</span><span class="features-table__value">${f.floor}</span></div>` : ''}
                ${f.totalFloors > 0 ? `<div class="features-table__item"><span class="features-table__label">Kat Sayısı</span><span class="features-table__value">${f.totalFloors}</span></div>` : ''}
                ${f.buildingAge > 0 ? `<div class="features-table__item"><span class="features-table__label">Bina Yaşı</span><span class="features-table__value">${f.buildingAge}</span></div>` : ''}
                ${f.bathrooms > 0 ? `<div class="features-table__item"><span class="features-table__label">Banyo Sayısı</span><span class="features-table__value">${f.bathrooms}</span></div>` : ''}
                ${f.heating !== '-' ? `<div class="features-table__item"><span class="features-table__label">Isınma</span><span class="features-table__value">${heatingLabels[f.heating] || f.heating}</span></div>` : ''}
                <div class="features-table__item"><span class="features-table__label">Eşyalı</span><span class="features-table__value">${f.furnished ? 'Evet' : 'Hayır'}</span></div>
              </div>
            </div>

            <div>
              <h2 class="heading-3" style="margin-bottom:var(--space-4)">Ek Özellikler</h2>
              <div style="display:flex;flex-wrap:wrap;gap:var(--space-3)">
                ${[
                  ['Balkon', f.balcony], ['Asansör', f.elevator], ['Otopark', f.parking],
                  ['Havuz', f.pool], ['Güvenlik', f.security], ['Eşyalı', f.furnished]
                ].map(([label, val]) =>
                  `<span class="badge ${val ? 'badge--success' : ''}" style="${!val ? 'opacity:0.4;text-decoration:line-through' : ''}">${val ? '✓' : '✗'} ${label}</span>`
                ).join('')}
              </div>
            </div>

            <div>
              <h2 class="heading-3" style="margin-bottom:var(--space-4)">Açıklama</h2>
              <p class="detail-desc">${property.description || ''}</p>
            </div>

            <div>
              <h2 class="heading-3" style="margin-bottom:var(--space-4)">Konum</h2>
              <div id="detail-map" style="height:300px;border-radius:var(--radius-lg);overflow:hidden;border:1px solid var(--border)"></div>
            </div>
          </div>

          <div>
            <div class="owner-card">
              <div style="display:flex;align-items:center;gap:var(--space-4);margin-bottom:var(--space-5)">
                <div style="width:50px;height:50px;border-radius:50%;background:var(--primary);color:white;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:1.25rem">${(property.owner.name || '?').charAt(0)}</div>
                <div>
                  <p class="owner-card__name">${property.owner.name || ''}</p>
                  <p class="owner-card__type">${property.owner.type === 'agent' ? 'Emlak Danışmanı' : 'İlan Sahibi'}</p>
                </div>
              </div>
              <a href="tel:${property.owner.phone}" class="btn btn--primary" style="width:100%;margin-bottom:var(--space-3)">📞 ${property.owner.phone}</a>
              <a href="https://wa.me/${(property.owner.phone || '').replace(/\\D/g, '')}" target="_blank" class="btn btn--outline" style="width:100%;margin-bottom:var(--space-3);color:#25D366;border-color:#25D366">💬 WhatsApp</a>
              <button class="btn btn--ghost" style="width:100%;margin-bottom:var(--space-3)" id="msg-btn">✉️ Mesaj Gönder</button>
              <button class="btn btn--ghost" style="width:100%" id="detail-fav-btn">${fav ? '❤️ Favorilerde' : '🤍 Favorilere Ekle'}</button>
            </div>
            <div style="margin-top:var(--space-6);padding:var(--space-4);background:var(--bg-section);border-radius:var(--radius-lg);font-size:var(--text-xs);color:var(--text-muted)">
              <p>👁️ ${property.views} görüntülenme</p>
              <p style="margin-top:4px">📅 ${formatDate(property.createdAt)} tarihinde yayınlandı</p>
            </div>
          </div>
        </div>

        ${similar.length > 0 ? `
          <div style="margin-top:var(--space-16)">
            <h2 class="heading-3" style="margin-bottom:var(--space-8)">Benzer İlanlar</h2>
            <div class="property-grid" id="similar-grid"></div>
          </div>
        ` : ''}
      </div>
    </div>
  `;

  // Lightbox
  container.querySelectorAll('#gallery img').forEach(img => {
    img.addEventListener('click', () => openLightbox(property.images, parseInt(img.dataset.index)));
  });

  // Favorite
  container.querySelector('#detail-fav-btn').addEventListener('click', () => {
    const added = toggleFavorite(property.id);
    container.querySelector('#detail-fav-btn').innerHTML = added ? '❤️ Favorilerde' : '🤍 Favorilere Ekle';
    showToast(added ? 'Favorilere eklendi' : 'Favorilerden çıkarıldı', added ? 'success' : 'info');
  });

  // Message modal
  container.querySelector('#msg-btn').addEventListener('click', () => {
    openModal(`
      <form id="contact-form" style="display:flex;flex-direction:column;gap:var(--space-4)">
        <div class="form-group"><label>Adınız</label><input type="text" required placeholder="Adınız Soyadınız"></div>
        <div class="form-group"><label>Telefon</label><input type="tel" required placeholder="0532 xxx xx xx"></div>
        <div class="form-group"><label>Mesajınız</label><textarea required placeholder="Mesajınızı yazın..."></textarea></div>
        <button type="submit" class="btn btn--primary">Gönder</button>
      </form>
    `, { title: 'Mesaj Gönder', size: 'sm' });
  });

  // Similar
  if (similar.length > 0) {
    const grid = container.querySelector('#similar-grid');
    similar.forEach(p => grid.appendChild(createPropertyCard(p, { compact: true })));
  }

  // Map
  try {
    const lat = property.location.lat || property.lat;
    const lng = property.location.lng || property.lng;
    if (window.L && lat && lng) {
      const map = L.map('detail-map').setView([lat, lng], 14);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap' }).addTo(map);
      L.marker([lat, lng]).addTo(map).bindPopup(property.title).openPopup();
    }
  } catch (e) { console.warn('Map init failed:', e); }

  setupScrollReveal();
}

function openLightbox(images, startIndex = 0) {
  let current = startIndex;
  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.innerHTML = `
    <button class="lightbox__close" aria-label="Kapat">✕</button>
    <button class="lightbox__nav lightbox__nav--prev" aria-label="Önceki">‹</button>
    <img class="lightbox__img" src="${images[current]}" alt="Fotoğraf" />
    <button class="lightbox__nav lightbox__nav--next" aria-label="Sonraki">›</button>
    <div class="lightbox__counter">${current + 1} / ${images.length}</div>
  `;
  function update() {
    lb.querySelector('.lightbox__img').src = images[current];
    lb.querySelector('.lightbox__counter').textContent = `${current + 1} / ${images.length}`;
  }
  lb.querySelector('.lightbox__close').addEventListener('click', () => lb.remove());
  lb.addEventListener('click', (e) => { if (e.target === lb) lb.remove(); });
  lb.querySelector('.lightbox__nav--prev').addEventListener('click', () => { current = (current - 1 + images.length) % images.length; update(); });
  lb.querySelector('.lightbox__nav--next').addEventListener('click', () => { current = (current + 1) % images.length; update(); });
  document.addEventListener('keydown', function handler(e) {
    if (e.key === 'Escape') { lb.remove(); document.removeEventListener('keydown', handler); }
    if (e.key === 'ArrowLeft') { current = (current - 1 + images.length) % images.length; update(); }
    if (e.key === 'ArrowRight') { current = (current + 1) % images.length; update(); }
  });
  document.body.appendChild(lb);
}
