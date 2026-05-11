import api from './api'

export const listingService = {
  // Tüm ilanları getir (filtreli)
  getAll: (params) => api.get('/listings', { params }),

  // Tek ilan detayı
  getById: (id) => api.get(`/listings/${id}`),

  // İlan oluştur
  create: (data) => api.post('/listings', data),

  // İlan güncelle
  update: (id, data) => api.put(`/listings/${id}`, data),

  // İlan sil
  delete: (id) => api.delete(`/listings/${id}`),

  // Öne çıkan ilanlar
  getFeatured: () => api.get('/listings/featured'),

  // Benzer ilanlar
  getSimilar: (id) => api.get(`/listings/${id}/similar`),
}
