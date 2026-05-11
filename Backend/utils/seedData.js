/**
 * HomeOfEmlak — Seed Data Script
 * Mevcut frontend mock verilerini veritabanına yükler
 * Kullanım: npm run seed
 */
require('dotenv').config();
const { sequelize, User, Property, PropertyImage } = require('../models');
const bcrypt = require('bcryptjs');

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

async function seed() {
  try {
    await sequelize.authenticate();
    console.log('✅ Veritabanına bağlandı');

    // Tabloları sıfırla ve yeniden oluştur
    await sequelize.sync({ force: true });
    console.log('✅ Tablolar oluşturuldu');

    // ── Admin kullanıcı ────────────────────────
    const adminPass = await bcrypt.hash('admin123', 12);
    const admin = await User.create({
      firstName: 'Admin', lastName: 'HomeOfEmlak', email: 'admin@homeofemlak.com',
      phone: '0212 123 4567', passwordHash: adminPass, role: 'admin', isVerified: true
    }, { hooks: false });

    // ── Örnek kullanıcılar ─────────────────────
    const users = [];
    const userNames = [
      { fn: 'Ahmet', ln: 'Yılmaz', email: 'ahmet@test.com', role: 'agent' },
      { fn: 'Elif', ln: 'Demir', email: 'elif@test.com', role: 'agent' },
      { fn: 'Mehmet', ln: 'Kaya', email: 'mehmet@test.com', role: 'user' },
      { fn: 'Selin', ln: 'Arslan', email: 'selin@test.com', role: 'agent' },
      { fn: 'Burcu', ln: 'Öztürk', email: 'burcu@test.com', role: 'user' },
    ];

    const userPass = await bcrypt.hash('test123', 12);
    for (const u of userNames) {
      const user = await User.create({
        firstName: u.fn, lastName: u.ln, email: u.email,
        phone: '0532 000 0000', passwordHash: userPass,
        role: u.role, isVerified: true
      }, { hooks: false });
      users.push(user);
    }
    console.log(`✅ ${users.length + 1} kullanıcı oluşturuldu`);

    // ── İlanlar ────────────────────────────────
    const propertiesData = [
      { userId: users[0].id, title: "Kadıköy'de Deniz Manzaralı 3+1 Daire", type: 'sale', category: 'apartment', price: 4500000, city: 'İstanbul', district: 'Kadıköy', neighborhood: 'Caferağa', lat: 40.9876, lng: 29.0345, rooms: '3+1', sqmGross: 145, sqmNet: 125, floor: 5, totalFloors: 8, buildingAge: 3, bathrooms: 2, heating: 'dogalgaz', furnished: false, balcony: true, elevator: true, parking: true, pool: false, security: true, description: "Kadıköy Caferağa Mahallesi'nde deniz manzaralı, yeni binada, geniş ve aydınlık 3+1 daire.", ownerName: 'Ahmet Yılmaz', ownerPhone: '0532 123 4567', ownerType: 'agent', views: 1234, isFeatured: true, images: [imgs.apt1, imgs.int1, imgs.int2, imgs.int3] },
      { userId: users[1].id, title: "Beşiktaş Merkez'de Lüks 2+1 Residence", type: 'sale', category: 'apartment', price: 6200000, city: 'İstanbul', district: 'Beşiktaş', neighborhood: 'Sinanpaşa', lat: 41.0422, lng: 29.0047, rooms: '2+1', sqmGross: 110, sqmNet: 95, floor: 12, totalFloors: 20, buildingAge: 1, bathrooms: 2, heating: 'merkezi', furnished: true, balcony: true, elevator: true, parking: true, pool: true, security: true, description: "Beşiktaş'ın kalbinde, Boğaz manzaralı lüks residence.", ownerName: 'Elif Demir', ownerPhone: '0533 234 5678', ownerType: 'agent', views: 2150, isFeatured: true, images: [imgs.apt2, imgs.int1, imgs.int3] },
      { userId: users[2].id, title: "Ataşehir'de Yatırımlık 1+1 Daire", type: 'sale', category: 'apartment', price: 2100000, city: 'İstanbul', district: 'Ataşehir', neighborhood: 'Barbaros', lat: 40.9923, lng: 29.1234, rooms: '1+1', sqmGross: 65, sqmNet: 55, floor: 3, totalFloors: 10, buildingAge: 5, bathrooms: 1, heating: 'dogalgaz', furnished: false, balcony: true, elevator: true, parking: false, pool: false, security: true, description: 'Ataşehir finans merkezine yakın yatırımlık daire.', ownerName: 'Mehmet Kaya', ownerPhone: '0535 345 6789', ownerType: 'owner', views: 856, isFeatured: false, images: [imgs.apt3, imgs.int2] },
      { userId: users[3].id, title: "Bodrum Yalıkavak'ta Müstakil Villa", type: 'sale', category: 'villa', price: 18500000, city: 'Muğla', district: 'Bodrum', neighborhood: 'Yalıkavak', lat: 37.1045, lng: 27.2965, rooms: '5+2', sqmGross: 350, sqmNet: 300, floor: 0, totalFloors: 2, buildingAge: 2, bathrooms: 4, heating: 'yerden', furnished: true, balcony: true, elevator: false, parking: true, pool: true, security: true, description: "Yalıkavak'ta denize sıfır, özel havuzlu lüks villa.", ownerName: 'Selin Arslan', ownerPhone: '0536 456 7890', ownerType: 'agent', views: 3456, isFeatured: true, images: [imgs.villa1, imgs.int1, imgs.ext1, imgs.int2] },
      { userId: users[4].id, title: "Çeşme Alaçatı'da Taş Ev", type: 'sale', category: 'villa', price: 12000000, city: 'İzmir', district: 'Çeşme', neighborhood: 'Alaçatı', lat: 38.2827, lng: 26.3774, rooms: '4+1', sqmGross: 220, sqmNet: 185, floor: 0, totalFloors: 2, buildingAge: 15, bathrooms: 3, heating: 'klima', furnished: true, balcony: true, elevator: false, parking: true, pool: true, security: false, description: 'Alaçatı merkezde restore edilmiş taş ev.', ownerName: 'Burcu Öztürk', ownerPhone: '0537 567 8901', ownerType: 'owner', views: 2890, isFeatured: true, images: [imgs.villa2, imgs.villa3, imgs.int3] },
      { userId: users[0].id, title: "Ankara Çankaya'da 4+1 Dubleks", type: 'sale', category: 'apartment', price: 5800000, city: 'Ankara', district: 'Çankaya', neighborhood: 'Gaziosmanpaşa', lat: 39.9208, lng: 32.8541, rooms: '4+1', sqmGross: 200, sqmNet: 175, floor: 7, totalFloors: 8, buildingAge: 4, bathrooms: 3, heating: 'dogalgaz', furnished: false, balcony: true, elevator: true, parking: true, pool: false, security: true, description: "Çankaya'nın prestijli lokasyonunda dubleks.", ownerName: 'Cem Aydın', ownerPhone: '0538 678 9012', ownerType: 'agent', views: 945, isFeatured: false, images: [imgs.ext2, imgs.int1, imgs.int2] },
      { userId: users[1].id, title: "Antalya Konyaaltı'nda Satılık Arsa", type: 'sale', category: 'land', price: 3200000, city: 'Antalya', district: 'Konyaaltı', neighborhood: 'Hurma', lat: 36.8818, lng: 30.6355, rooms: '-', sqmGross: 500, sqmNet: 500, floor: 0, totalFloors: 0, buildingAge: 0, bathrooms: 0, heating: '-', furnished: false, balcony: false, elevator: false, parking: false, pool: false, security: false, description: 'İmarlı, yola cepheli, altyapısı hazır arsa.', ownerName: 'Ali Çelik', ownerPhone: '0539 789 0123', ownerType: 'owner', views: 567, isFeatured: false, images: [imgs.land1, imgs.land2] },
      { userId: users[2].id, title: "Kadıköy Moda'da Kiralık 2+1", type: 'rent', category: 'apartment', price: 28000, city: 'İstanbul', district: 'Kadıköy', neighborhood: 'Moda', lat: 40.9843, lng: 29.0267, rooms: '2+1', sqmGross: 95, sqmNet: 80, floor: 2, totalFloors: 5, buildingAge: 20, bathrooms: 1, heating: 'dogalgaz', furnished: true, balcony: true, elevator: false, parking: false, pool: false, security: false, description: 'Moda sahiline yakın, eşyalı kiralık daire.', ownerName: 'Zeynep Koç', ownerPhone: '0541 890 1234', ownerType: 'owner', views: 1890, isFeatured: false, images: [imgs.apt1, imgs.int3, imgs.int2] },
      { userId: users[3].id, title: "Levent'te Kiralık Ofis Katı", type: 'rent', category: 'commercial', price: 85000, city: 'İstanbul', district: 'Beşiktaş', neighborhood: 'Levent', lat: 41.0812, lng: 29.0107, rooms: 'Açık Plan', sqmGross: 300, sqmNet: 280, floor: 8, totalFloors: 15, buildingAge: 6, bathrooms: 2, heating: 'merkezi', furnished: false, balcony: false, elevator: true, parking: true, pool: false, security: true, description: 'Levent iş merkezinde prestijli ofis katı.', ownerName: 'Burak Şahin', ownerPhone: '0542 901 2345', ownerType: 'agent', views: 743, isFeatured: false, images: [imgs.comm1, imgs.int1] },
      { userId: users[4].id, title: "Kuşadası'nda Deniz Manzaralı Yazlık", type: 'sale', category: 'summer', price: 3800000, city: 'Aydın', district: 'Kuşadası', neighborhood: 'Güzelçamlı', lat: 37.7102, lng: 27.1877, rooms: '3+1', sqmGross: 130, sqmNet: 110, floor: 1, totalFloors: 3, buildingAge: 8, bathrooms: 2, heating: 'klima', furnished: true, balcony: true, elevator: false, parking: true, pool: true, security: true, description: 'Site içinde, havuzlu, deniz manzaralı yazlık.', ownerName: 'Deniz Aktaş', ownerPhone: '0543 012 3456', ownerType: 'owner', views: 1567, isFeatured: true, images: [imgs.sum1, imgs.villa3, imgs.int2] },
      { userId: users[0].id, title: 'Sapanca Göl Manzaralı Villa', type: 'sale', category: 'villa', price: 9500000, city: 'Sakarya', district: 'Sapanca', neighborhood: 'Kırkpınar', lat: 40.6912, lng: 30.2731, rooms: '4+2', sqmGross: 280, sqmNet: 240, floor: 0, totalFloors: 2, buildingAge: 5, bathrooms: 3, heating: 'dogalgaz', furnished: false, balcony: true, elevator: false, parking: true, pool: true, security: true, description: 'Sapanca Gölü manzaralı, doğa içinde villa.', ownerName: 'Hakan Güneş', ownerPhone: '0544 123 4567', ownerType: 'agent', views: 1023, isFeatured: true, images: [imgs.villa3, imgs.villa1, imgs.int1, imgs.ext1] },
      { userId: users[1].id, title: "Beylikdüzü'nde Yeni Proje 2+1", type: 'sale', category: 'apartment', price: 2850000, city: 'İstanbul', district: 'Beylikdüzü', neighborhood: 'Adnan Kahveci', lat: 41.0051, lng: 28.6445, rooms: '2+1', sqmGross: 100, sqmNet: 85, floor: 6, totalFloors: 14, buildingAge: 0, bathrooms: 1, heating: 'dogalgaz', furnished: false, balcony: true, elevator: true, parking: true, pool: true, security: true, description: 'Yeni teslim projede, site içi sosyal alanlar.', ownerName: 'Ayşe Yıldız', ownerPhone: '0545 234 5678', ownerType: 'agent', views: 678, isFeatured: false, images: [imgs.apt2, imgs.int2, imgs.int3] },
      { userId: users[2].id, title: "İzmir Bornova'da Kiralık 3+1", type: 'rent', category: 'apartment', price: 22000, city: 'İzmir', district: 'Bornova', neighborhood: 'Erzene', lat: 38.4622, lng: 27.2193, rooms: '3+1', sqmGross: 130, sqmNet: 110, floor: 4, totalFloors: 7, buildingAge: 10, bathrooms: 1, heating: 'dogalgaz', furnished: false, balcony: true, elevator: true, parking: false, pool: false, security: false, description: 'Bornova merkezde bakımlı daire.', ownerName: 'Murat Erdoğan', ownerPhone: '0546 345 6789', ownerType: 'owner', views: 432, isFeatured: false, images: [imgs.apt3, imgs.int1] },
      { userId: users[3].id, title: "Fethiye Ölüdeniz'de Satılık Villa", type: 'sale', category: 'villa', price: 14200000, city: 'Muğla', district: 'Fethiye', neighborhood: 'Ölüdeniz', lat: 36.5510, lng: 29.1145, rooms: '4+1', sqmGross: 260, sqmNet: 220, floor: 0, totalFloors: 2, buildingAge: 3, bathrooms: 3, heating: 'yerden', furnished: true, balcony: true, elevator: false, parking: true, pool: true, security: true, description: "Ölüdeniz'e tepeden bakan, infinity havuzlu villa.", ownerName: 'Serkan Acar', ownerPhone: '0547 456 7890', ownerType: 'agent', views: 2345, isFeatured: true, images: [imgs.villa2, imgs.ext1, imgs.int3, imgs.villa1] },
      { userId: users[4].id, title: "Bursa Nilüfer'de Satılık Arsa", type: 'sale', category: 'land', price: 1800000, city: 'Bursa', district: 'Nilüfer', neighborhood: 'Görükle', lat: 40.2217, lng: 28.8667, rooms: '-', sqmGross: 750, sqmNet: 750, floor: 0, totalFloors: 0, buildingAge: 0, bathrooms: 0, heating: '-', furnished: false, balcony: false, elevator: false, parking: false, pool: false, security: false, description: "Görükle'de üniversiteye yakın imarlı arsa.", ownerName: 'Fatma Yılmaz', ownerPhone: '0548 567 8901', ownerType: 'owner', views: 321, isFeatured: false, images: [imgs.land2, imgs.land1] },
    ];

    for (const p of propertiesData) {
      const imageList = p.images;
      delete p.images;
      const property = await Property.create(p);
      if (imageList && imageList.length > 0) {
        await PropertyImage.bulkCreate(imageList.map((url, i) => ({ propertyId: property.id, url, sortOrder: i })));
      }
    }
    console.log(`✅ ${propertiesData.length} ilan oluşturuldu`);

    console.log('\n🎉 Seed işlemi tamamlandı!');
    console.log('─────────────────────────────');
    console.log('Admin: admin@homeofemlak.com / admin123');
    console.log('Test:  ahmet@test.com / test123');
    console.log('─────────────────────────────\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed hatası:', error);
    process.exit(1);
  }
}

seed();
