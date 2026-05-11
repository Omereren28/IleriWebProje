/**
 * HomeOfEmlak — Create Listing Page (API Entegreli)
 */
import { showToast } from '../components/toast.js';
import { categories, cities } from '../data.js';
import { saveDraft, getDraft, clearDraft } from '../utils/storage.js';
import * as API from '../services/api.js';
import { navigate } from '../router.js';

export function renderCreateListingPage(container) {
  // Giriş kontrolü
  if (!API.isLoggedIn()) {
    showToast('İlan vermek için giriş yapmalısınız', 'warning');
    navigate('/giris');
    return;
  }

  let currentStep = 1;
  const totalSteps = 4;
  const draft = getDraft() || {};

  function render() {
    container.innerHTML = `
      <div class="form-page">
        <div class="container">
          <div class="form-page__header">
            <h1 class="heading-2">📝 İlan Ver</h1>
            <p class="text-body">Gayrimenkulünüzü kolayca ilan edin</p>
          </div>
          <div class="progress-steps">
            ${[1,2,3,4].map((s, i) => `
              ${i > 0 ? '<div class="progress-step__line"></div>' : ''}
              <div class="progress-step ${s < currentStep ? 'progress-step--completed' : ''} ${s === currentStep ? 'progress-step--active' : ''}">
                <div class="progress-step__circle">${s < currentStep ? '✓' : s}</div>
                <span class="progress-step__label">${['Bilgiler', 'Konum', 'Özellikler', 'Açıklama'][i]}</span>
              </div>
            `).join('')}
          </div>
          <div class="form-card" id="step-content"></div>
        </div>
      </div>
    `;
    renderStep();
  }

  function renderStep() {
    const stepEl = container.querySelector('#step-content');
    const steps = [renderStep1, renderStep2, renderStep3, renderStep4];
    steps[currentStep - 1](stepEl);
  }

  function renderStep1(el) {
    el.innerHTML = `
      <h3 class="heading-3" style="margin-bottom:var(--space-6)">Mülk Bilgileri</h3>
      <div class="form-row">
        <div class="form-group"><label>İlan Türü</label>
          <select id="f-type"><option value="sale" ${draft.type==='sale'?'selected':''}>Satılık</option><option value="rent" ${draft.type==='rent'?'selected':''}>Kiralık</option></select></div>
        <div class="form-group"><label>Kategori</label>
          <select id="f-cat">${categories.map(c=>`<option value="${c.key}" ${draft.category===c.key?'selected':''}>${c.label}</option>`).join('')}</select></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Oda Sayısı</label><input id="f-rooms" value="${draft.rooms||''}" placeholder="Ör: 3+1"></div>
        <div class="form-group"><label>Fiyat (₺)</label><input id="f-price" type="number" value="${draft.price||''}" placeholder="Fiyat giriniz"></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>m² (Brüt)</label><input id="f-sqmg" type="number" value="${draft.sqmGross||''}"></div>
        <div class="form-group"><label>m² (Net)</label><input id="f-sqmn" type="number" value="${draft.sqmNet||''}"></div>
      </div>
      <div class="form-actions"><div></div><button class="btn btn--primary" id="next-btn">Devam →</button></div>
    `;
    el.querySelector('#next-btn').addEventListener('click', () => {
      draft.type = el.querySelector('#f-type').value;
      draft.category = el.querySelector('#f-cat').value;
      draft.rooms = el.querySelector('#f-rooms').value;
      draft.price = el.querySelector('#f-price').value;
      draft.sqmGross = el.querySelector('#f-sqmg').value;
      draft.sqmNet = el.querySelector('#f-sqmn').value;
      if (!draft.price) { showToast('Lütfen fiyat giriniz', 'warning'); return; }
      saveDraft(draft); currentStep = 2; render();
    });
  }

  function renderStep2(el) {
    el.innerHTML = `
      <h3 class="heading-3" style="margin-bottom:var(--space-6)">Konum Bilgileri</h3>
      <div class="form-row">
        <div class="form-group"><label>Şehir</label>
          <select id="f-city"><option value="">Seçiniz</option>${cities.map(c=>`<option value="${c.name}" ${draft.city===c.name?'selected':''}>${c.name}</option>`).join('')}</select></div>
        <div class="form-group"><label>İlçe</label><input id="f-district" value="${draft.district||''}" placeholder="İlçe"></div>
      </div>
      <div class="form-group"><label>Mahalle</label><input id="f-neigh" value="${draft.neighborhood||''}" placeholder="Mahalle"></div>
      <div class="form-group"><label>Adres Detayı</label><textarea id="f-addr" placeholder="Detaylı adres...">${draft.address||''}</textarea></div>
      <div class="form-actions">
        <button class="btn btn--ghost" id="prev-btn">← Geri</button>
        <button class="btn btn--primary" id="next-btn">Devam →</button>
      </div>
    `;
    el.querySelector('#prev-btn').addEventListener('click', () => { currentStep = 1; render(); });
    el.querySelector('#next-btn').addEventListener('click', () => {
      draft.city = el.querySelector('#f-city').value;
      draft.district = el.querySelector('#f-district').value;
      draft.neighborhood = el.querySelector('#f-neigh').value;
      draft.address = el.querySelector('#f-addr').value;
      if (!draft.city || !draft.district) { showToast('Şehir ve ilçe zorunludur', 'warning'); return; }
      saveDraft(draft); currentStep = 3; render();
    });
  }

  function renderStep3(el) {
    const features = ['Balkon', 'Asansör', 'Otopark', 'Havuz', 'Güvenlik', 'Eşyalı', 'Klima', 'Jeneratör'];
    el.innerHTML = `
      <h3 class="heading-3" style="margin-bottom:var(--space-6)">Detay Özellikler</h3>
      <div class="form-row">
        <div class="form-group"><label>Bina Yaşı</label><input id="f-age" type="number" value="${draft.buildingAge||''}"></div>
        <div class="form-group"><label>Kat</label><input id="f-floor" type="number" value="${draft.floor||''}"></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Banyo</label><input id="f-bath" type="number" value="${draft.bathrooms||''}"></div>
        <div class="form-group"><label>Isınma</label>
          <select id="f-heat"><option value="dogalgaz">Doğalgaz</option><option value="merkezi">Merkezi</option><option value="klima">Klima</option><option value="soba">Soba</option></select></div>
      </div>
      <div class="form-group"><label>Ek Özellikler</label>
        <div style="display:flex;flex-wrap:wrap;gap:var(--space-3);margin-top:var(--space-2)">
          ${features.map(f => `<label class="filter-checkbox"><input type="checkbox" value="${f}" ${(draft.extras||[]).includes(f)?'checked':''}> ${f}</label>`).join('')}
        </div>
      </div>
      <div class="form-actions">
        <button class="btn btn--ghost" id="prev-btn">← Geri</button>
        <button class="btn btn--primary" id="next-btn">Devam →</button>
      </div>
    `;
    el.querySelector('#prev-btn').addEventListener('click', () => { currentStep = 2; render(); });
    el.querySelector('#next-btn').addEventListener('click', () => {
      draft.buildingAge = el.querySelector('#f-age').value;
      draft.floor = el.querySelector('#f-floor').value;
      draft.bathrooms = el.querySelector('#f-bath').value;
      draft.heating = el.querySelector('#f-heat').value;
      draft.extras = [...el.querySelectorAll('input[type=checkbox]:checked')].map(c => c.value);
      saveDraft(draft); currentStep = 4; render();
    });
  }

  function renderStep4(el) {
    el.innerHTML = `
      <h3 class="heading-3" style="margin-bottom:var(--space-6)">İlan Başlığı & Açıklama</h3>
      <div class="form-group"><label>İlan Başlığı</label><input id="f-title" value="${draft.title||''}" placeholder="Ör: Kadıköy'de Deniz Manzaralı 3+1 Daire"></div>
      <div class="form-group"><label>Açıklama</label><textarea id="f-desc" rows="8" placeholder="İlanınızın detaylı açıklamasını yazın...">${draft.description||''}</textarea></div>
      <div class="form-group"><label>İletişim Bilgileri</label>
        <div class="form-row">
          <input id="f-name" placeholder="Adınız" value="${draft.ownerName||''}">
          <input id="f-phone" placeholder="Telefon" value="${draft.ownerPhone||''}">
        </div>
      </div>
      <div class="form-actions">
        <button class="btn btn--ghost" id="prev-btn">← Geri</button>
        <button class="btn btn--accent btn--lg" id="publish-btn">🚀 Yayınla</button>
      </div>
    `;
    el.querySelector('#prev-btn').addEventListener('click', () => { currentStep = 3; render(); });
    el.querySelector('#publish-btn').addEventListener('click', async () => {
      draft.title = el.querySelector('#f-title').value;
      draft.description = el.querySelector('#f-desc').value;
      draft.ownerName = el.querySelector('#f-name').value;
      draft.ownerPhone = el.querySelector('#f-phone').value;
      if (!draft.title) { showToast('Lütfen başlık giriniz', 'warning'); return; }

      const btn = el.querySelector('#publish-btn');
      btn.disabled = true;
      btn.textContent = 'Yayınlanıyor...';

      try {
        const extras = draft.extras || [];
        const propertyData = {
          title: draft.title, type: draft.type || 'sale', category: draft.category || 'apartment',
          price: Number(draft.price), city: draft.city, district: draft.district,
          neighborhood: draft.neighborhood, address: draft.address,
          rooms: draft.rooms, sqmGross: Number(draft.sqmGross) || 0, sqmNet: Number(draft.sqmNet) || 0,
          floor: Number(draft.floor) || 0, buildingAge: Number(draft.buildingAge) || 0,
          bathrooms: Number(draft.bathrooms) || 0, heating: draft.heating || 'dogalgaz',
          balcony: extras.includes('Balkon'), elevator: extras.includes('Asansör'),
          parking: extras.includes('Otopark'), pool: extras.includes('Havuz'),
          security: extras.includes('Güvenlik'), furnished: extras.includes('Eşyalı'),
          description: draft.description, ownerName: draft.ownerName, ownerPhone: draft.ownerPhone,
          images: []
        };
        await API.createProperty(propertyData);
        clearDraft();
        showToast('İlanınız başarıyla yayınlandı! 🎉', 'success', 5000);
        navigate('/ilanlar');
      } catch (error) {
        showToast(error.message || 'İlan yayınlanamadı', 'error');
        btn.disabled = false;
        btn.textContent = '🚀 Yayınla';
      }
    });
  }

  render();
}
