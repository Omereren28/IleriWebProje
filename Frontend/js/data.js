/**
 * HomeOfEmlak — Mock Property Data
 */

// Placeholder image URLs
const imgs = {
  apt1: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop',
  apt2: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop',
  apt3: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop',
  villa1: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=400&fit=crop',
  villa2: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop',
  villa3: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop',
  land1: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop',
  land2: 'https://images.unsplash.com/photo-1628624747186-a941c476b7ef?w=600&h=400&fit=crop',
  comm1: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
  int1: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop',
  int2: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&h=400&fit=crop',
  int3: 'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=600&h=400&fit=crop',
  ext1: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop',
  ext2: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&h=400&fit=crop',
  sum1: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=600&h=400&fit=crop',
};

export const properties = [
  {
    id: 1,
    title: "Kadıköy'de Deniz Manzaralı 3+1 Daire",
    type: 'sale',
    category: 'apartment',
    price: 4500000,
    location: { city: 'İstanbul', district: 'Kadıköy', neighborhood: 'Caferağa', lat: 40.9876, lng: 29.0345 },
    features: { rooms: '3+1', sqmGross: 145, sqmNet: 125, floor: 5, totalFloors: 8, buildingAge: 3, bathrooms: 2, heating: 'dogalgaz', furnished: false, balcony: true, elevator: true, parking: true, pool: false, security: true },
    images: [imgs.apt1, imgs.int1, imgs.int2, imgs.int3],
    description: 'Kadıköy Caferağa Mahallesi\'nde deniz manzaralı, yeni binada, geniş ve aydınlık 3+1 daire. Metro ve vapur iskelesine yürüme mesafesinde. Amerikan mutfak, geniş salon, ebeveyn banyosu mevcuttur.',
    owner: { name: 'Ahmet Yılmaz', phone: '0532 123 4567', type: 'agent' },
    createdAt: '2026-05-01',
    views: 1234,
    isFeatured: true
  },
  {
    id: 2,
    title: 'Beşiktaş Merkez\'de Lüks 2+1 Residence',
    type: 'sale',
    category: 'apartment',
    price: 6200000,
    location: { city: 'İstanbul', district: 'Beşiktaş', neighborhood: 'Sinanpaşa', lat: 41.0422, lng: 29.0047 },
    features: { rooms: '2+1', sqmGross: 110, sqmNet: 95, floor: 12, totalFloors: 20, buildingAge: 1, bathrooms: 2, heating: 'merkezi', furnished: true, balcony: true, elevator: true, parking: true, pool: true, security: true },
    images: [imgs.apt2, imgs.int1, imgs.int3],
    description: 'Beşiktaş\'ın kalbinde, Boğaz manzaralı lüks residence projesi. 7/24 güvenlik, kapalı otopark, yüzme havuzu, fitness salonu. Tam eşyalı teslim.',
    owner: { name: 'Elif Demir', phone: '0533 234 5678', type: 'agent' },
    createdAt: '2026-04-28',
    views: 2150,
    isFeatured: true
  },
  {
    id: 3,
    title: 'Ataşehir\'de Yatırımlık 1+1 Daire',
    type: 'sale',
    category: 'apartment',
    price: 2100000,
    location: { city: 'İstanbul', district: 'Ataşehir', neighborhood: 'Barbaros', lat: 40.9923, lng: 29.1234 },
    features: { rooms: '1+1', sqmGross: 65, sqmNet: 55, floor: 3, totalFloors: 10, buildingAge: 5, bathrooms: 1, heating: 'dogalgaz', furnished: false, balcony: true, elevator: true, parking: false, pool: false, security: true },
    images: [imgs.apt3, imgs.int2],
    description: 'Ataşehir finans merkezine yakın, metro hattı üzerinde yatırımlık 1+1 daire. Kiracılı teslim edilebilir.',
    owner: { name: 'Mehmet Kaya', phone: '0535 345 6789', type: 'owner' },
    createdAt: '2026-05-05',
    views: 856,
    isFeatured: false
  },
  {
    id: 4,
    title: 'Bodrum Yalıkavak\'ta Müstakil Villa',
    type: 'sale',
    category: 'villa',
    price: 18500000,
    location: { city: 'Muğla', district: 'Bodrum', neighborhood: 'Yalıkavak', lat: 37.1045, lng: 27.2965 },
    features: { rooms: '5+2', sqmGross: 350, sqmNet: 300, floor: 0, totalFloors: 2, buildingAge: 2, bathrooms: 4, heating: 'yerden', furnished: true, balcony: true, elevator: false, parking: true, pool: true, security: true },
    images: [imgs.villa1, imgs.int1, imgs.ext1, imgs.int2],
    description: 'Yalıkavak\'ta denize sıfır, özel havuzlu, tam müstakil lüks villa. Akıllı ev sistemi, jakuzi, barbekü alanı, peyzaj bahçe.',
    owner: { name: 'Selin Arslan', phone: '0536 456 7890', type: 'agent' },
    createdAt: '2026-04-20',
    views: 3456,
    isFeatured: true
  },
  {
    id: 5,
    title: 'Çeşme Alaçatı\'da Taş Ev',
    type: 'sale',
    category: 'villa',
    price: 12000000,
    location: { city: 'İzmir', district: 'Çeşme', neighborhood: 'Alaçatı', lat: 38.2827, lng: 26.3774 },
    features: { rooms: '4+1', sqmGross: 220, sqmNet: 185, floor: 0, totalFloors: 2, buildingAge: 15, bathrooms: 3, heating: 'klima', furnished: true, balcony: true, elevator: false, parking: true, pool: true, security: false },
    images: [imgs.villa2, imgs.villa3, imgs.int3],
    description: 'Alaçatı merkezde restore edilmiş otantik taş ev. Avlu, bahçe, havuz. Yaz-kış kullanıma uygun. Ruhsatlı.',
    owner: { name: 'Burcu Öztürk', phone: '0537 567 8901', type: 'owner' },
    createdAt: '2026-04-15',
    views: 2890,
    isFeatured: true
  },
  {
    id: 6,
    title: 'Ankara Çankaya\'da 4+1 Dubleks',
    type: 'sale',
    category: 'apartment',
    price: 5800000,
    location: { city: 'Ankara', district: 'Çankaya', neighborhood: 'Gaziosmanpaşa', lat: 39.9208, lng: 32.8541 },
    features: { rooms: '4+1', sqmGross: 200, sqmNet: 175, floor: 7, totalFloors: 8, buildingAge: 4, bathrooms: 3, heating: 'dogalgaz', furnished: false, balcony: true, elevator: true, parking: true, pool: false, security: true },
    images: [imgs.ext2, imgs.int1, imgs.int2],
    description: 'Çankaya\'nın en prestijli lokasyonunda, çift taraflı, ferah dubleks daire. Şehir manzaralı teras katı.',
    owner: { name: 'Cem Aydın', phone: '0538 678 9012', type: 'agent' },
    createdAt: '2026-05-03',
    views: 945,
    isFeatured: false
  },
  {
    id: 7,
    title: 'Antalya Konyaaltı\'nda Satılık Arsa',
    type: 'sale',
    category: 'land',
    price: 3200000,
    location: { city: 'Antalya', district: 'Konyaaltı', neighborhood: 'Hurma', lat: 36.8818, lng: 30.6355 },
    features: { rooms: '-', sqmGross: 500, sqmNet: 500, floor: 0, totalFloors: 0, buildingAge: 0, bathrooms: 0, heating: '-', furnished: false, balcony: false, elevator: false, parking: false, pool: false, security: false },
    images: [imgs.land1, imgs.land2],
    description: 'Konyaaltı Hurma\'da imarlı, yola cepheli, altyapısı hazır satılık arsa. Konut imarlı, TAKS: 0.30, KAKS: 1.20.',
    owner: { name: 'Ali Çelik', phone: '0539 789 0123', type: 'owner' },
    createdAt: '2026-04-25',
    views: 567,
    isFeatured: false
  },
  {
    id: 8,
    title: 'Kadıköy Moda\'da Kiralık 2+1',
    type: 'rent',
    category: 'apartment',
    price: 28000,
    location: { city: 'İstanbul', district: 'Kadıköy', neighborhood: 'Moda', lat: 40.9843, lng: 29.0267 },
    features: { rooms: '2+1', sqmGross: 95, sqmNet: 80, floor: 2, totalFloors: 5, buildingAge: 20, bathrooms: 1, heating: 'dogalgaz', furnished: true, balcony: true, elevator: false, parking: false, pool: false, security: false },
    images: [imgs.apt1, imgs.int3, imgs.int2],
    description: 'Moda sahiline 3 dakika yürüme mesafesinde, yenilenmiş, eşyalı kiralık daire. Evcil hayvan kabul edilir.',
    owner: { name: 'Zeynep Koç', phone: '0541 890 1234', type: 'owner' },
    createdAt: '2026-05-08',
    views: 1890,
    isFeatured: false
  },
  {
    id: 9,
    title: 'Levent\'te Kiralık Ofis Katı',
    type: 'rent',
    category: 'commercial',
    price: 85000,
    location: { city: 'İstanbul', district: 'Beşiktaş', neighborhood: 'Levent', lat: 41.0812, lng: 29.0107 },
    features: { rooms: 'Açık Plan', sqmGross: 300, sqmNet: 280, floor: 8, totalFloors: 15, buildingAge: 6, bathrooms: 2, heating: 'merkezi', furnished: false, balcony: false, elevator: true, parking: true, pool: false, security: true },
    images: [imgs.comm1, imgs.int1],
    description: 'Levent iş merkezinde, metro çıkışında, açık ofis planına uygun prestijli ofis katı. Toplantı odası mevcut.',
    owner: { name: 'Burak Şahin', phone: '0542 901 2345', type: 'agent' },
    createdAt: '2026-05-02',
    views: 743,
    isFeatured: false
  },
  {
    id: 10,
    title: 'Kuşadası\'nda Deniz Manzaralı Yazlık',
    type: 'sale',
    category: 'summer',
    price: 3800000,
    location: { city: 'Aydın', district: 'Kuşadası', neighborhood: 'Güzelçamlı', lat: 37.7102, lng: 27.1877 },
    features: { rooms: '3+1', sqmGross: 130, sqmNet: 110, floor: 1, totalFloors: 3, buildingAge: 8, bathrooms: 2, heating: 'klima', furnished: true, balcony: true, elevator: false, parking: true, pool: true, security: true },
    images: [imgs.sum1, imgs.villa3, imgs.int2],
    description: 'Güzelçamlı\'da site içinde, ortak havuzlu, deniz manzaralı yazlık daire. Plaja 200 metre.',
    owner: { name: 'Deniz Aktaş', phone: '0543 012 3456', type: 'owner' },
    createdAt: '2026-04-18',
    views: 1567,
    isFeatured: true
  },
  {
    id: 11,
    title: 'Sapanca Göl Manzaralı Villa',
    type: 'sale',
    category: 'villa',
    price: 9500000,
    location: { city: 'Sakarya', district: 'Sapanca', neighborhood: 'Kırkpınar', lat: 40.6912, lng: 30.2731 },
    features: { rooms: '4+2', sqmGross: 280, sqmNet: 240, floor: 0, totalFloors: 2, buildingAge: 5, bathrooms: 3, heating: 'dogalgaz', furnished: false, balcony: true, elevator: false, parking: true, pool: true, security: true },
    images: [imgs.villa3, imgs.villa1, imgs.int1, imgs.ext1],
    description: 'Sapanca Gölü manzaralı, doğa içinde huzurlu yaşam. Özel havuz, 800 m² bahçe, şömine.',
    owner: { name: 'Hakan Güneş', phone: '0544 123 4567', type: 'agent' },
    createdAt: '2026-05-06',
    views: 1023,
    isFeatured: true
  },
  {
    id: 12,
    title: 'Beylikdüzü\'nde Yeni Proje 2+1',
    type: 'sale',
    category: 'apartment',
    price: 2850000,
    location: { city: 'İstanbul', district: 'Beylikdüzü', neighborhood: 'Adnan Kahveci', lat: 41.0051, lng: 28.6445 },
    features: { rooms: '2+1', sqmGross: 100, sqmNet: 85, floor: 6, totalFloors: 14, buildingAge: 0, bathrooms: 1, heating: 'dogalgaz', furnished: false, balcony: true, elevator: true, parking: true, pool: true, security: true },
    images: [imgs.apt2, imgs.int2, imgs.int3],
    description: 'Yeni teslim projede, site içi sosyal alanlar: havuz, spor salonu, çocuk parkı, kamelya. Metrobüse 5 dk.',
    owner: { name: 'Ayşe Yıldız', phone: '0545 234 5678', type: 'agent' },
    createdAt: '2026-05-07',
    views: 678,
    isFeatured: false
  },
  {
    id: 13,
    title: 'İzmir Bornova\'da Kiralık 3+1',
    type: 'rent',
    category: 'apartment',
    price: 22000,
    location: { city: 'İzmir', district: 'Bornova', neighborhood: 'Erzene', lat: 38.4622, lng: 27.2193 },
    features: { rooms: '3+1', sqmGross: 130, sqmNet: 110, floor: 4, totalFloors: 7, buildingAge: 10, bathrooms: 1, heating: 'dogalgaz', furnished: false, balcony: true, elevator: true, parking: false, pool: false, security: false },
    images: [imgs.apt3, imgs.int1],
    description: 'Bornova merkezde, okullara ve hastaneye yakın, bakımlı ve aydınlık 3+1 daire. Doğalgaz kombili.',
    owner: { name: 'Murat Erdoğan', phone: '0546 345 6789', type: 'owner' },
    createdAt: '2026-05-09',
    views: 432,
    isFeatured: false
  },
  {
    id: 14,
    title: 'Fethiye Ölüdeniz\'de Satılık Villa',
    type: 'sale',
    category: 'villa',
    price: 14200000,
    location: { city: 'Muğla', district: 'Fethiye', neighborhood: 'Ölüdeniz', lat: 36.5510, lng: 29.1145 },
    features: { rooms: '4+1', sqmGross: 260, sqmNet: 220, floor: 0, totalFloors: 2, buildingAge: 3, bathrooms: 3, heating: 'yerden', furnished: true, balcony: true, elevator: false, parking: true, pool: true, security: true },
    images: [imgs.villa2, imgs.ext1, imgs.int3, imgs.villa1],
    description: 'Ölüdeniz\'e tepeden bakan konumda, infinity havuzlu, tam deniz manzaralı modern villa.',
    owner: { name: 'Serkan Acar', phone: '0547 456 7890', type: 'agent' },
    createdAt: '2026-04-22',
    views: 2345,
    isFeatured: true
  },
  {
    id: 15,
    title: 'Bursa Nilüfer\'de Satılık Arsa',
    type: 'sale',
    category: 'land',
    price: 1800000,
    location: { city: 'Bursa', district: 'Nilüfer', neighborhood: 'Görükle', lat: 40.2217, lng: 28.8667 },
    features: { rooms: '-', sqmGross: 750, sqmNet: 750, floor: 0, totalFloors: 0, buildingAge: 0, bathrooms: 0, heating: '-', furnished: false, balcony: false, elevator: false, parking: false, pool: false, security: false },
    images: [imgs.land2, imgs.land1],
    description: 'Görükle\'de üniversiteye yakın, gelişen bölgede imarlı arsa. Konut+ticaret imarlı.',
    owner: { name: 'Fatma Yılmaz', phone: '0548 567 8901', type: 'owner' },
    createdAt: '2026-05-04',
    views: 321,
    isFeatured: false
  },
];

export const cities = [
  { name: 'İstanbul', districts: ['Kadıköy', 'Beşiktaş', 'Ataşehir', 'Beylikdüzü', 'Üsküdar', 'Bakırköy', 'Sarıyer', 'Maltepe'] },
  { name: 'Ankara', districts: ['Çankaya', 'Keçiören', 'Yenimahalle', 'Etimesgut', 'Mamak'] },
  { name: 'İzmir', districts: ['Bornova', 'Karşıyaka', 'Konak', 'Çeşme', 'Bayraklı'] },
  { name: 'Antalya', districts: ['Konyaaltı', 'Muratpaşa', 'Kepez', 'Lara', 'Alanya'] },
  { name: 'Muğla', districts: ['Bodrum', 'Fethiye', 'Marmaris', 'Dalaman', 'Datça'] },
  { name: 'Bursa', districts: ['Nilüfer', 'Osmangazi', 'Yıldırım', 'Mudanya'] },
  { name: 'Sakarya', districts: ['Sapanca', 'Serdivan', 'Adapazarı'] },
  { name: 'Aydın', districts: ['Kuşadası', 'Didim', 'Efeler', 'Söke'] },
];

export const categories = [
  { key: 'apartment', label: 'Konut', icon: '🏢', count: 8 },
  { key: 'villa', label: 'Villa', icon: '🏡', count: 5 },
  { key: 'land', label: 'Arsa', icon: '🌿', count: 4 },
  { key: 'commercial', label: 'İş Yeri', icon: '🏪', count: 4 },
  { key: 'summer', label: 'Yazlık', icon: '🏖️', count: 4 },
  { key: 'project', label: 'Projeler', icon: '🏗️', count: 3 },
];

export const stats = [
  { value: 12500, label: 'Aktif İlan', suffix: '+' },
  { value: 81, label: 'Şehir', suffix: '' },
  { value: 3200, label: 'Mutlu Müşteri', suffix: '+' },
  { value: 15, label: 'Yıllık Tecrübe', suffix: '' },
];

export const testimonials = [
  { name: 'Ayşe K.', text: 'HomeOfEmlak sayesinde hayalimdeki evi çok kısa sürede buldum. Filtreleme sistemi harika!', rating: 5, city: 'İstanbul' },
  { name: 'Mehmet D.', text: 'İlan verme süreci çok kolay. 3 gün içinde dairemizi sattık.', rating: 5, city: 'Ankara' },
  { name: 'Selin A.', text: 'Güvenilir ilanlar ve detaylı bilgiler. Kesinlikle tavsiye ederim.', rating: 4, city: 'İzmir' },
];

/** Get property by ID */
export function getPropertyById(id) {
  return properties.find(p => p.id === Number(id));
}

/** Filter properties */
export function filterProperties(filters = {}) {
  let result = [...properties];

  if (filters.type) result = result.filter(p => p.type === filters.type);
  if (filters.category) result = result.filter(p => p.category === filters.category);
  if (filters.city) result = result.filter(p => p.location.city === filters.city);
  if (filters.district) result = result.filter(p => p.location.district === filters.district);
  if (filters.minPrice) result = result.filter(p => p.price >= Number(filters.minPrice));
  if (filters.maxPrice) result = result.filter(p => p.price <= Number(filters.maxPrice));
  if (filters.rooms) result = result.filter(p => p.features.rooms === filters.rooms);
  if (filters.minSqm) result = result.filter(p => p.features.sqmNet >= Number(filters.minSqm));
  if (filters.maxSqm) result = result.filter(p => p.features.sqmNet <= Number(filters.maxSqm));
  if (filters.query) {
    const q = filters.query.toLowerCase();
    result = result.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.location.city.toLowerCase().includes(q) ||
      p.location.district.toLowerCase().includes(q)
    );
  }

  // Sort
  if (filters.sort === 'price-asc') result.sort((a, b) => a.price - b.price);
  else if (filters.sort === 'price-desc') result.sort((a, b) => b.price - a.price);
  else if (filters.sort === 'date-desc') result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  else if (filters.sort === 'date-asc') result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  else if (filters.sort === 'sqm-desc') result.sort((a, b) => b.features.sqmNet - a.features.sqmNet);

  return result;
}

/** Get featured properties */
export function getFeaturedProperties() {
  return properties.filter(p => p.isFeatured);
}

/** Get latest properties */
export function getLatestProperties(count = 6) {
  return [...properties].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, count);
}

/** Get similar properties */
export function getSimilarProperties(property, count = 4) {
  return properties
    .filter(p => p.id !== property.id && (p.location.city === property.location.city || p.category === property.category))
    .slice(0, count);
}
