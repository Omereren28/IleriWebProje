/**
 * Fiyatı Türk lirası formatında döndürür
 * @param {number} price
 * @returns {string}
 */
export function formatPrice(price) {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    maximumFractionDigits: 0,
  }).format(price)
}

/**
 * m² fiyatını hesaplar
 */
export function pricePerSqm(price, area) {
  if (!area) return 0
  return Math.round(price / area)
}

/**
 * Tarih formatlar
 */
export function formatDate(dateStr) {
  return new Intl.DateTimeFormat('tr-TR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateStr))
}

/**
 * Metin kısaltır
 */
export function truncate(text, maxLength = 120) {
  if (!text || text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '…'
}

/**
 * clsx benzeri className birleştirici
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}
