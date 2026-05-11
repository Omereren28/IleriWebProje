/**
 * HomeOfEmlak — Central API Client
 * Tüm backend API çağrıları bu dosya üzerinden yapılır
 */

const API_BASE = '/api';

// ── Token Yönetimi ───────────────────────────────
function getToken() {
  return localStorage.getItem('homeofemlak_token');
}

function setToken(token) {
  localStorage.setItem('homeofemlak_token', token);
}

function removeToken() {
  localStorage.removeItem('homeofemlak_token');
}

function getUser() {
  try {
    const raw = localStorage.getItem('homeofemlak_user');
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function setUser(user) {
  localStorage.setItem('homeofemlak_user', JSON.stringify(user));
}

function removeUser() {
  localStorage.removeItem('homeofemlak_user');
}

function isLoggedIn() {
  return !!getToken() && !!getUser();
}

// ── Fetch Wrapper ────────────────────────────────
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const headers = { 'Content-Type': 'application/json', ...options.headers };

  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers
    });

    const data = await response.json();

    // Token süresi dolduysa otomatik çıkış
    if (response.status === 401 && data.message?.includes('süresi doldu')) {
      removeToken();
      removeUser();
      window.dispatchEvent(new Event('user-login'));
      window.location.hash = '#/giris';
    }

    if (!response.ok) {
      throw { status: response.status, ...data };
    }

    return data;
  } catch (error) {
    if (error.status) throw error;
    console.error('API Error:', error);
    throw { success: false, message: 'Sunucuya bağlanılamadı. Lütfen tekrar deneyin.' };
  }
}

// ── Auth API ─────────────────────────────────────
async function register(data) {
  return apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

async function verifyCode(email, code) {
  return apiRequest('/auth/verify-code', {
    method: 'POST',
    body: JSON.stringify({ email, code })
  });
}

async function resendCode(email) {
  return apiRequest('/auth/resend-code', {
    method: 'POST',
    body: JSON.stringify({ email })
  });
}

async function login(email, password) {
  const result = await apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
  if (result.success && result.data) {
    setToken(result.data.token);
    setUser(result.data.user);
  }
  return result;
}

function logout() {
  removeToken();
  removeUser();
  window.dispatchEvent(new Event('user-login'));
}

async function getMe() {
  return apiRequest('/auth/me');
}

async function updateProfile(data) {
  const result = await apiRequest('/auth/profile', {
    method: 'PUT',
    body: JSON.stringify(data)
  });
  if (result.success && result.data) {
    setUser(result.data.user);
  }
  return result;
}

async function forgotPassword(email) {
  return apiRequest('/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email })
  });
}

async function verifyResetCode(email, code) {
  return apiRequest('/auth/verify-reset-code', {
    method: 'POST',
    body: JSON.stringify({ email, code })
  });
}

async function resetPassword(token, password) {
  return apiRequest('/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify({ token, password })
  });
}

// ── Properties API ───────────────────────────────
async function getProperties(filters = {}) {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, val]) => {
    if (val !== '' && val !== null && val !== undefined) params.set(key, val);
  });
  return apiRequest(`/properties?${params.toString()}`);
}

async function getFeaturedProperties() {
  return apiRequest('/properties/featured');
}

async function getLatestProperties(count = 6) {
  return apiRequest(`/properties/latest?count=${count}`);
}

async function getPropertyById(id) {
  return apiRequest(`/properties/${id}`);
}

async function getSimilarProperties(id, count = 4) {
  return apiRequest(`/properties/${id}/similar?count=${count}`);
}

async function createProperty(data) {
  return apiRequest('/properties', {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

async function updateProperty(id, data) {
  return apiRequest(`/properties/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
}

async function deleteProperty(id) {
  return apiRequest(`/properties/${id}`, { method: 'DELETE' });
}

// ── Favorites API ────────────────────────────────
async function getFavorites() {
  return apiRequest('/favorites');
}

async function getFavoriteIds() {
  return apiRequest('/favorites/ids');
}

async function addFavorite(propertyId) {
  return apiRequest(`/favorites/${propertyId}`, { method: 'POST' });
}

async function removeFavorite(propertyId) {
  return apiRequest(`/favorites/${propertyId}`, { method: 'DELETE' });
}

// ── Contact API ──────────────────────────────────
async function sendContactMessage(data) {
  return apiRequest('/contact', {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

// ── Meta API ─────────────────────────────────────
async function getCities() {
  return apiRequest('/meta/cities');
}

async function getCategories() {
  return apiRequest('/meta/categories');
}

async function getStats() {
  return apiRequest('/meta/stats');
}

// ── Upload API ───────────────────────────────────
async function uploadImage(file) {
  const formData = new FormData();
  formData.append('image', file);

  const token = getToken();
  const headers = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const response = await fetch(`${API_BASE}/upload`, {
    method: 'POST',
    headers,
    body: formData
  });
  return response.json();
}

async function uploadMultipleImages(files) {
  const formData = new FormData();
  for (const file of files) {
    formData.append('images', file);
  }

  const token = getToken();
  const headers = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const response = await fetch(`${API_BASE}/upload/multiple`, {
    method: 'POST',
    headers,
    body: formData
  });
  return response.json();
}

// ── Export ────────────────────────────────────────
export {
  // Auth
  register, verifyCode, resendCode, login, logout, getMe, updateProfile,
  forgotPassword, verifyResetCode, resetPassword,
  getToken, setToken, getUser, setUser, isLoggedIn,
  // Properties
  getProperties, getFeaturedProperties, getLatestProperties,
  getPropertyById, getSimilarProperties,
  createProperty, updateProperty, deleteProperty,
  // Favorites
  getFavorites, getFavoriteIds, addFavorite, removeFavorite,
  // Contact
  sendContactMessage,
  // Meta
  getCities, getCategories, getStats,
  // Upload
  uploadImage, uploadMultipleImages
};
