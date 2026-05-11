/**
 * HomeOfEmlak — Express Server Entry Point
 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');

const { sequelize, User } = require('./models');
const bcrypt = require('bcryptjs');
const errorHandler = require('./middleware/errorHandler');

// Route imports
const authRoutes = require('./routes/auth');
const propertyRoutes = require('./routes/properties');
const favoriteRoutes = require('./routes/favorites');
const contactRoutes = require('./routes/contact');
const uploadRoutes = require('./routes/upload');
const metaRoutes = require('./routes/meta');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ────────────────────────────────────
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Static files (uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rate limiting (login endpoint)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 20,
  message: { success: false, message: 'Çok fazla deneme. Lütfen 15 dakika sonra tekrar deneyin.' }
});
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);

// ── API Routes ───────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/meta', metaRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'HomeOfEmlak API çalışıyor 🏠', timestamp: new Date().toISOString() });
});

app.use('/api', (req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint bulunamadı' });
});

// Global error handler
app.use(errorHandler);

// ── Database & Server Start ──────────────────────
// ── Database & Server Start ──────────────────────
async function startServer() {
  let authenticated = false;
  let retries = 5; // 5 kez deneyeceğiz

  while (!authenticated && retries > 0) {
    try {
      // Veritabanı bağlantısını test et
      await sequelize.authenticate();
      console.log('✅ MySQL veritabanına bağlandı');
      
      authenticated = true; // Bağlantı başarılı!

      // Tabloları oluştur (sync)
      await sequelize.sync({ alter: true });
      console.log('✅ Tablolar senkronize edildi');

      // Admin kullanıcı yoksa otomatik oluştur
      const adminExists = await User.findOne({ where: { role: 'admin' } });
      if (!adminExists) {
        const adminPass = await bcrypt.hash('admin123', 12);
        await User.create({
          firstName: 'Admin',
          lastName: 'HomeOfEmlak',
          email: 'admin@homeofemlak.com',
          phone: '0212 123 4567',
          passwordHash: adminPass,
          role: 'admin',
          isVerified: true
        }, { hooks: false });
        console.log('✅ Admin hesabı oluşturuldu (admin@homeofemlak.com / admin123)');
      } else {
        console.log('✅ Admin hesabı zaten mevcut');
      }

      // Sunucuyu başlat
      app.listen(PORT, '0.0.0.0', () => {
        console.log(`\n🏠 HomeOfEmlak API çalışıyor:`);
        console.log(`   → http://localhost:${PORT}`);
        console.log(`   → Environment: ${process.env.NODE_ENV || 'development'}`);
        console.log(`   → Database: ${process.env.DB_NAME || 'homeofemlak'}\n`);
      });

    } catch (error) {
      retries--;
      console.error(`❌ Bağlantı başarısız (Kalan deneme: ${retries}):`, error.message);
      
      if (retries === 0) {
        console.error('❌ Tüm denemeler başarısız oldu. Sunucu kapatılıyor.');
        process.exit(1);
      }

      // 5 saniye bekle ve tekrar dene
      console.log('🔄 5 saniye sonra tekrar denenecek...');
      await new Promise(res => setTimeout(res, 5000));
    }
  }
}

startServer();

module.exports = app;
