/**
 * HomeOfEmlak — Admin Routes
 */
const express = require('express');
const router = express.Router();
const { adminRequired } = require('../middleware/auth');
const { User, Property, PropertyImage, ContactMessage, Favorite } = require('../models');

// Tüm route'lar admin yetkisi gerektirir
router.use(adminRequired);

// ── GET /api/admin/stats ─────────────────────────
router.get('/stats', async (req, res, next) => {
  try {
    const totalUsers = await User.count();
    const totalProperties = await Property.count({ where: { isActive: true } });
    const totalMessages = await ContactMessage.count();
    const unreadMessages = await ContactMessage.count({ where: { isRead: false } });
    const totalFavorites = await Favorite.count();

    res.json({
      success: true,
      data: { totalUsers, totalProperties, totalMessages, unreadMessages, totalFavorites }
    });
  } catch (error) { next(error); }
});

// ── GET /api/admin/users ─────────────────────────
router.get('/users', async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const { count, rows } = await User.findAndCountAll({
      attributes: { exclude: ['passwordHash', 'resetPasswordToken', 'resetPasswordExpires', 'verificationToken'] },
      order: [['createdAt', 'DESC']],
      limit, offset: (page - 1) * limit
    });
    res.json({ success: true, data: { users: rows, total: count, page, totalPages: Math.ceil(count / limit) } });
  } catch (error) { next(error); }
});

// ── PUT /api/admin/users/:id ─────────────────────
router.put('/users/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'Kullanıcı bulunamadı' });
    const { role, isVerified } = req.body;
    if (role) user.role = role;
    if (isVerified !== undefined) user.isVerified = isVerified;
    await user.save();
    res.json({ success: true, message: 'Kullanıcı güncellendi', data: { user: user.toSafeJSON() } });
  } catch (error) { next(error); }
});

// ── DELETE /api/admin/users/:id ──────────────────
router.delete('/users/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'Kullanıcı bulunamadı' });
    if (user.role === 'admin') return res.status(400).json({ success: false, message: 'Admin silinemez' });
    await user.destroy();
    res.json({ success: true, message: 'Kullanıcı silindi' });
  } catch (error) { next(error); }
});

// ── DELETE /api/admin/properties/:id ─────────────
router.delete('/properties/:id', async (req, res, next) => {
  try {
    const property = await Property.findByPk(req.params.id);
    if (!property) return res.status(404).json({ success: false, message: 'İlan bulunamadı' });
    await property.destroy();
    res.json({ success: true, message: 'İlan kalıcı olarak silindi' });
  } catch (error) { next(error); }
});

// ── GET /api/admin/messages ──────────────────────
router.get('/messages', async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const { count, rows } = await ContactMessage.findAndCountAll({
      order: [['createdAt', 'DESC']],
      limit, offset: (page - 1) * limit
    });
    res.json({ success: true, data: { messages: rows, total: count, page, totalPages: Math.ceil(count / limit) } });
  } catch (error) { next(error); }
});

// ── PUT /api/admin/messages/:id/read ─────────────
router.put('/messages/:id/read', async (req, res, next) => {
  try {
    const msg = await ContactMessage.findByPk(req.params.id);
    if (!msg) return res.status(404).json({ success: false, message: 'Mesaj bulunamadı' });
    msg.isRead = true;
    await msg.save();
    res.json({ success: true, message: 'Mesaj okundu olarak işaretlendi' });
  } catch (error) { next(error); }
});

module.exports = router;
