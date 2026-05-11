/**
 * HomeOfEmlak — Helper Utilities
 */

/** Format price: 4500000 → "4.500.000 ₺" */
export function formatPrice(price) {
  return new Intl.NumberFormat('tr-TR').format(price) + ' ₺';
}

/** Format date: "2026-05-01" → "01 Mayıs 2026" */
export function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' });
}

/** Relative time: "2 gün önce" */
export function timeAgo(dateStr) {
  const now = new Date();
  const past = new Date(dateStr);
  const diffMs = now - past;
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);
  const diffMonth = Math.floor(diffDay / 30);

  if (diffMin < 1) return 'Az önce';
  if (diffMin < 60) return `${diffMin} dakika önce`;
  if (diffHr < 24) return `${diffHr} saat önce`;
  if (diffDay < 30) return `${diffDay} gün önce`;
  return `${diffMonth} ay önce`;
}

/** Truncate text */
export function truncate(text, maxLen = 120) {
  if (!text || text.length <= maxLen) return text;
  return text.slice(0, maxLen).trimEnd() + '…';
}

/** Slugify: "İstanbul Kadıköy" → "istanbul-kadikoy" */
export function slugify(str) {
  const map = { ç: 'c', ğ: 'g', ı: 'i', ö: 'o', ş: 's', ü: 'u', Ç: 'c', Ğ: 'g', İ: 'i', Ö: 'o', Ş: 's', Ü: 'u' };
  return str.replace(/[çğıöşüÇĞİÖŞÜ]/g, c => map[c] || c)
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

/** Debounce function */
export function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/** Setup Intersection Observer for scroll reveal */
export function setupScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal, .reveal-scale').forEach(el => {
    observer.observe(el);
  });

  return observer;
}

/** Animated counter */
export function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);

    element.textContent = new Intl.NumberFormat('tr-TR').format(current);

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = new Intl.NumberFormat('tr-TR').format(target);
    }
  }

  requestAnimationFrame(update);
}

/** Create element from HTML string */
export function createElement(html) {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  return template.content.firstChild;
}

/** Category label map */
export const categoryLabels = {
  apartment: 'Daire',
  villa: 'Villa',
  detached: 'Müstakil Ev',
  land: 'Arsa',
  commercial: 'İş Yeri',
  summer: 'Yazlık'
};

/** Type label map */
export const typeLabels = {
  sale: 'Satılık',
  rent: 'Kiralık'
};

/** Heating label map */
export const heatingLabels = {
  'dogalgaz': 'Doğalgaz (Kombi)',
  'merkezi': 'Merkezi',
  'soba': 'Soba',
  'klima': 'Klima',
  'yerden': 'Yerden Isıtma'
};
