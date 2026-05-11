/**
 * HomeOfEmlak — Auth Routes (6 Haneli Kod Doğrulamalı)
 */
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { authRequired } = require('../middleware/auth');
const { User } = require('../models');
const { sendVerificationCodeEmail, sendResetCodeEmail, sendWelcomeEmail } = require('../services/emailService');

// JWT Token oluştur
function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
  );
}

// 6 haneli rastgele kod oluştur
function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// ── POST /api/auth/register ──────────────────────
// 1. Adım: Kullanıcıyı oluştur, 6 haneli kod gönder
router.post('/register', [
  body('firstName').trim().notEmpty().withMessage('Ad zorunludur').isLength({ min: 2 }).withMessage('Ad en az 2 karakter olmalıdır'),
  body('lastName').trim().notEmpty().withMessage('Soyad zorunludur').isLength({ min: 2 }).withMessage('Soyad en az 2 karakter olmalıdır'),
  body('email').isEmail().withMessage('Geçerli bir e-posta adresi giriniz').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Şifre en az 6 karakter olmalıdır'),
  body('phone').optional().trim()
], validate, async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, phone } = req.body;

    // E-posta daha önce kayıtlı mı?
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      // Eğer doğrulanmamış kullanıcı varsa, yeni kod gönder
      if (!existingUser.isVerified) {
        const code = generateCode();
        existingUser.verificationCode = code;
        existingUser.verificationCodeExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 dk
        await existingUser.save();

        // E-posta gönder
        try {
          await sendVerificationCodeEmail(existingUser, code);
        } catch (emailErr) {
          console.error('E-posta gönderilemedi:', emailErr.message);
        }

        return res.status(200).json({
          success: true,
          message: 'Doğrulama kodu e-posta adresinize tekrar gönderildi.',
          data: { requiresVerification: true, email }
        });
      }

      return res.status(409).json({
        success: false,
        message: 'Bu e-posta adresi zaten kayıtlı'
      });
    }

    // 6 haneli doğrulama kodu oluştur
    const code = generateCode();

    // Kullanıcı oluştur (henüz doğrulanmamış)
    const user = await User.create({
      firstName,
      lastName,
      email,
      phone: phone || null,
      passwordHash: password, // beforeCreate hook'unda hash'lenecek
      isVerified: false,
      verificationCode: code,
      verificationCodeExpires: new Date(Date.now() + 10 * 60 * 1000) // 10 dakika
    });

    // Doğrulama kodu e-postası gönder
    try {
      await sendVerificationCodeEmail(user, code);
    } catch (emailErr) {
      console.error('E-posta gönderilemedi:', emailErr.message);
    }

    res.status(201).json({
      success: true,
      message: 'Kayıt başarılı! Doğrulama kodu e-posta adresinize gönderildi.',
      data: {
        requiresVerification: true,
        email
      }
    });

  } catch (error) {
    next(error);
  }
});

// ── POST /api/auth/verify-code ───────────────────
// 2. Adım: 6 haneli kodu doğrula, giriş yap
router.post('/verify-code', [
  body('email').isEmail().withMessage('Geçerli bir e-posta adresi giriniz').normalizeEmail(),
  body('code').isLength({ min: 6, max: 6 }).withMessage('6 haneli doğrulama kodu giriniz')
], validate, async (req, res, next) => {
  try {
    const { email, code } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ success: false, message: 'Kullanıcı bulunamadı' });
    }

    if (user.isVerified) {
      return res.status(400).json({ success: false, message: 'Bu hesap zaten doğrulanmış' });
    }

    // Kod kontrolü
    if (!user.verificationCode || user.verificationCode !== code) {
      return res.status(400).json({ success: false, message: 'Geçersiz doğrulama kodu' });
    }

    // Süre kontrolü
    if (!user.verificationCodeExpires || user.verificationCodeExpires < new Date()) {
      return res.status(400).json({ success: false, message: 'Doğrulama kodunun süresi dolmuş. Lütfen yeni kod isteyin.' });
    }

    // Hesabı doğrula
    user.isVerified = true;
    user.verificationCode = null;
    user.verificationCodeExpires = null;
    await user.save();

    // JWT token oluştur
    const token = generateToken(user);

    // Hoş geldin e-postası gönder (async)
    sendWelcomeEmail(user).catch(err => console.error('Welcome email error:', err));

    res.json({
      success: true,
      message: 'Hesabınız doğrulandı! Hoş geldiniz 🎉',
      data: {
        user: user.toSafeJSON(),
        token
      }
    });

  } catch (error) {
    next(error);
  }
});

// ── POST /api/auth/resend-code ───────────────────
// Doğrulama kodunu tekrar gönder
router.post('/resend-code', [
  body('email').isEmail().withMessage('Geçerli bir e-posta adresi giriniz').normalizeEmail()
], validate, async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.json({ success: true, message: 'Doğrulama kodu gönderildi' });
    }

    if (user.isVerified) {
      return res.status(400).json({ success: false, message: 'Bu hesap zaten doğrulanmış' });
    }

    const code = generateCode();
    user.verificationCode = code;
    user.verificationCodeExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    try {
      await sendVerificationCodeEmail(user, code);
    } catch (emailErr) {
      console.error('E-posta gönderilemedi:', emailErr.message);
    }

    res.json({ success: true, message: 'Doğrulama kodu tekrar gönderildi' });
  } catch (error) {
    next(error);
  }
});

// ── POST /api/auth/login ─────────────────────────
router.post('/login', [
  body('email').isEmail().withMessage('Geçerli bir e-posta adresi giriniz').normalizeEmail(),
  body('password').notEmpty().withMessage('Şifre zorunludur')
], validate, async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Kullanıcıyı bul
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'E-posta veya şifre hatalı'
      });
    }

    // Hesap doğrulanmış mı?
    if (!user.isVerified) {
      // Yeni kod gönder
      const code = generateCode();
      user.verificationCode = code;
      user.verificationCodeExpires = new Date(Date.now() + 10 * 60 * 1000);
      await user.save();

      try {
        await sendVerificationCodeEmail(user, code);
      } catch (emailErr) {
        console.error('E-posta gönderilemedi:', emailErr.message);
      }

      return res.status(403).json({
        success: false,
        message: 'Hesabınız henüz doğrulanmamış. Yeni doğrulama kodu e-posta adresinize gönderildi.',
        data: { requiresVerification: true, email }
      });
    }

    // Şifre kontrolü
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'E-posta veya şifre hatalı'
      });
    }

    // Token oluştur
    const token = generateToken(user);

    res.json({
      success: true,
      message: 'Giriş başarılı!',
      data: {
        user: user.toSafeJSON(),
        token
      }
    });

  } catch (error) {
    next(error);
  }
});

// ── GET /api/auth/me ─────────────────────────────
router.get('/me', authRequired, async (req, res) => {
  res.json({
    success: true,
    data: { user: req.user.toSafeJSON() }
  });
});

// ── PUT /api/auth/profile ────────────────────────
router.put('/profile', authRequired, [
  body('firstName').optional().trim().isLength({ min: 2 }),
  body('lastName').optional().trim().isLength({ min: 2 }),
  body('phone').optional().trim()
], validate, async (req, res, next) => {
  try {
    const { firstName, lastName, phone } = req.body;
    const user = req.user;

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (phone !== undefined) user.phone = phone;

    await user.save();

    res.json({
      success: true,
      message: 'Profil güncellendi',
      data: { user: user.toSafeJSON() }
    });
  } catch (error) {
    next(error);
  }
});

// ── POST /api/auth/forgot-password ───────────────
// 1. Adım: E-posta gir, 6 haneli kod al
router.post('/forgot-password', [
  body('email').isEmail().withMessage('Geçerli bir e-posta adresi giriniz').normalizeEmail()
], validate, async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    // Kullanıcı bulunamasa bile güvenlik için aynı mesajı ver
    if (!user) {
      return res.json({
        success: true,
        message: 'Şifre sıfırlama kodu e-posta adresinize gönderildi'
      });
    }

    // 6 haneli kod oluştur
    const code = generateCode();
    user.resetPasswordCode = code;
    user.resetPasswordCodeExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 dk
    await user.save();

    // E-posta gönder
    try {
      await sendResetCodeEmail(user, code);
    } catch (emailErr) {
      console.error('E-posta gönderilemedi:', emailErr.message);
    }

    res.json({
      success: true,
      message: 'Şifre sıfırlama kodu e-posta adresinize gönderildi'
    });
  } catch (error) {
    next(error);
  }
});

// ── POST /api/auth/verify-reset-code ─────────────
// 2. Adım: Kodu doğrula
router.post('/verify-reset-code', [
  body('email').isEmail().withMessage('Geçerli bir e-posta adresi giriniz').normalizeEmail(),
  body('code').isLength({ min: 6, max: 6 }).withMessage('6 haneli kod giriniz')
], validate, async (req, res, next) => {
  try {
    const { email, code } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Geçersiz kod' });
    }

    if (!user.resetPasswordCode || user.resetPasswordCode !== code) {
      return res.status(400).json({ success: false, message: 'Geçersiz şifre sıfırlama kodu' });
    }

    if (!user.resetPasswordCodeExpires || user.resetPasswordCodeExpires < new Date()) {
      return res.status(400).json({ success: false, message: 'Kodun süresi dolmuş. Lütfen yeni kod isteyin.' });
    }

    // Geçici reset token oluştur (şifre belirleme adımı için)
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 dk
    user.resetPasswordCode = null;
    user.resetPasswordCodeExpires = null;
    await user.save();

    res.json({
      success: true,
      message: 'Kod doğrulandı! Yeni şifrenizi belirleyin.',
      data: { resetToken }
    });
  } catch (error) {
    next(error);
  }
});

// ── POST /api/auth/reset-password ────────────────
// 3. Adım: Yeni şifreyi belirle
router.post('/reset-password', [
  body('token').notEmpty().withMessage('Token zorunludur'),
  body('password').isLength({ min: 6 }).withMessage('Şifre en az 6 karakter olmalıdır')
], validate, async (req, res, next) => {
  try {
    const { token, password } = req.body;

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
      where: {
        resetPasswordToken: hashedToken
      }
    });

    if (!user || !user.resetPasswordExpires || user.resetPasswordExpires < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Geçersiz veya süresi dolmuş token'
      });
    }

    // Yeni şifreyi hash'le ve kaydet
    user.passwordHash = await bcrypt.hash(password, 12);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.json({
      success: true,
      message: 'Şifreniz başarıyla güncellendi. Giriş yapabilirsiniz.'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
