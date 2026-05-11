/**
 * HomeOfEmlak — Contact Routes
 */
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { ContactMessage } = require('../models');
const { sendContactNotificationEmail } = require('../services/emailService');

router.post('/', [
  body('name').trim().notEmpty().withMessage('Ad Soyad zorunludur'),
  body('email').isEmail().withMessage('Geçerli bir e-posta adresi giriniz'),
  body('subject').trim().notEmpty().withMessage('Konu zorunludur'),
  body('message').trim().notEmpty().withMessage('Mesaj zorunludur'),
  body('phone').optional().trim()
], validate, async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    await ContactMessage.create({ name, email, phone: phone || null, subject, message });
    sendContactNotificationEmail({ name, email, phone, subject, message }).catch(console.error);
    res.status(201).json({ success: true, message: 'Mesajınız gönderildi!' });
  } catch (error) { next(error); }
});

module.exports = router;
