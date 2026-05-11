/**
 * HomeOfEmlak — Email Configuration (Nodemailer + Gmail SMTP)
 */
const nodemailer = require('nodemailer');
require('dotenv').config();

let transporter;

function getTransporter() {
  if (transporter) return transporter;

  // Gmail SMTP ayarı yoksa console uyarısı ver
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('⚠️  SMTP ayarları eksik. E-posta gönderimi devre dışı.');
    return null;
  }

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  // SMTP bağlantısını doğrula
  transporter.verify()
    .then(() => console.log('✅ SMTP bağlantısı başarılı'))
    .catch(err => console.error('❌ SMTP bağlantı hatası:', err.message));

  return transporter;
}

module.exports = { getTransporter };
