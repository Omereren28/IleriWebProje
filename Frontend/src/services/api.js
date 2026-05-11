import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor — token ekle
api.interceptors.request.use(
  (config) => {
    const stored = JSON.parse(localStorage.getItem('auth-storage') || '{}')
    const token = stored?.state?.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor — hata yönetimi
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth-storage')
      window.location.href = '/giris'
    }
    return Promise.reject(error.response?.data || error)
  }
)

export default api
