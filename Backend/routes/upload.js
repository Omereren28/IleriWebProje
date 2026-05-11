/**
 * HomeOfEmlak — File Upload Routes (Multer)
 */
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { authRequired } = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '..', 'uploads')),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  if (allowed.includes(file.mimetype)) { cb(null, true); }
  else { cb(new Error('Sadece resim dosyaları yüklenebilir (JPEG, PNG, WebP, GIF)'), false); }
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

// Tek resim yükleme
router.post('/', authRequired, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: 'Dosya yüklenemedi' });
  const url = `/uploads/${req.file.filename}`;
  res.json({ success: true, data: { url, filename: req.file.filename } });
});

// Çoklu resim yükleme (max 10)
router.post('/multiple', authRequired, upload.array('images', 10), (req, res) => {
  if (!req.files || req.files.length === 0) return res.status(400).json({ success: false, message: 'Dosya yüklenemedi' });
  const urls = req.files.map(f => ({ url: `/uploads/${f.filename}`, filename: f.filename }));
  res.json({ success: true, data: { images: urls } });
});

module.exports = router;
