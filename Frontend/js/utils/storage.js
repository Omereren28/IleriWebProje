/**
 * HomeOfEmlak — LocalStorage Manager
 */

const KEYS = {
  FAVORITES: 'homeofemlak_favorites',
  COMPARE: 'homeofemlak_compare',
  RECENT_SEARCHES: 'homeofemlak_recent_searches',
  DRAFT_LISTING: 'homeofemlak_draft',
  THEME: 'homeofemlak_theme'
};

function getJSON(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function setJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn('LocalStorage write failed:', e);
  }
}

/* ── Favorites ─────────────────────────────────── */
export function getFavorites() {
  return getJSON(KEYS.FAVORITES, []);
}

export function toggleFavorite(id) {
  const favs = getFavorites();
  const idx = favs.indexOf(id);
  if (idx === -1) {
    favs.push(id);
  } else {
    favs.splice(idx, 1);
  }
  setJSON(KEYS.FAVORITES, favs);
  window.dispatchEvent(new CustomEvent('favorites-changed', { detail: favs }));
  return idx === -1; // true = added, false = removed
}

export function isFavorite(id) {
  return getFavorites().includes(id);
}

/* ── Compare List ──────────────────────────────── */
export function getCompareList() {
  return getJSON(KEYS.COMPARE, []);
}

export function toggleCompare(id) {
  const list = getCompareList();
  const idx = list.indexOf(id);
  if (idx === -1) {
    if (list.length >= 3) return { added: false, full: true };
    list.push(id);
  } else {
    list.splice(idx, 1);
  }
  setJSON(KEYS.COMPARE, list);
  window.dispatchEvent(new CustomEvent('compare-changed', { detail: list }));
  return { added: idx === -1, full: false };
}

export function isInCompare(id) {
  return getCompareList().includes(id);
}

export function clearCompare() {
  setJSON(KEYS.COMPARE, []);
  window.dispatchEvent(new CustomEvent('compare-changed', { detail: [] }));
}

/* ── Recent Searches ───────────────────────────── */
export function getRecentSearches() {
  return getJSON(KEYS.RECENT_SEARCHES, []);
}

export function addRecentSearch(query) {
  let searches = getRecentSearches();
  searches = searches.filter(s => JSON.stringify(s) !== JSON.stringify(query));
  searches.unshift(query);
  if (searches.length > 5) searches = searches.slice(0, 5);
  setJSON(KEYS.RECENT_SEARCHES, searches);
}

/* ── Draft Listing ─────────────────────────────── */
export function getDraft() {
  return getJSON(KEYS.DRAFT_LISTING, null);
}

export function saveDraft(data) {
  setJSON(KEYS.DRAFT_LISTING, data);
}

export function clearDraft() {
  localStorage.removeItem(KEYS.DRAFT_LISTING);
}

/* ── Theme ─────────────────────────────────────── */
export function getTheme() {
  return localStorage.getItem(KEYS.THEME) || 'light';
}

export function setTheme(theme) {
  localStorage.setItem(KEYS.THEME, theme);
  document.documentElement.setAttribute('data-theme', theme);
  window.dispatchEvent(new CustomEvent('theme-changed', { detail: theme }));
}

export function toggleTheme() {
  const current = getTheme();
  const next = current === 'light' ? 'dark' : 'light';
  setTheme(next);
  return next;
}

export function initTheme() {
  const saved = getTheme();
  document.documentElement.setAttribute('data-theme', saved);
}
