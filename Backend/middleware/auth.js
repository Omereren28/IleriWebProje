/**
 * HomeOfEmlak — JWT Auth Middleware
 */
const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Zorunlu auth - token yoksa 401 döner
async function authRequired(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Giriş yapmanız gerekiyor' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Kullanıcı bulunamadı' });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ success: false, message: 'Geçersiz token' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Oturum süresi doldu, lütfen tekrar giriş yapın' });
    }
    return res.status(500).json({ success: false, message: 'Sunucu hatası' });
  }
}

// Opsiyonel auth - token varsa user'ı set eder, yoksa devam eder
async function authOptional(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findByPk(decoded.id);
      if (user) req.user = user;
    }
  } catch (error) {
    // Token geçersiz olsa bile devam et
  }
  next();
}

// Admin auth - sadece admin rolündeki kullanıcılar
async function adminRequired(req, res, next) {
  try {
    await authRequired(req, res, () => {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Bu işlem için yetkiniz yok' });
      }
      next();
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Sunucu hatası' });
  }
}

module.exports = { authRequired, authOptional, adminRequired };
