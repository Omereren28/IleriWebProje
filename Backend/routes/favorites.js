/**
 * HomeOfEmlak — Favorites Routes
 */
const express = require('express');
const router = express.Router();
const { authRequired } = require('../middleware/auth');
const { Favorite, Property, PropertyImage } = require('../models');

// ── GET /api/favorites ───────────────────────────
router.get('/', authRequired, async (req, res, next) => {
  try {
    const favorites = await Favorite.findAll({
      where: { userId: req.user.id },
      include: [{
        model: Property,
        as: 'property',
        where: { isActive: true },
        include: [
          { model: PropertyImage, as: 'images', attributes: ['id', 'url', 'sortOrder'] }
        ]
      }],
      order: [['createdAt', 'DESC']]
    });

    const properties = favorites.map(f => f.property);

    res.json({
      success: true,
      data: { properties, favoriteIds: favorites.map(f => f.propertyId) }
    });
  } catch (error) {
    next(error);
  }
});

// ── GET /api/favorites/ids ───────────────────────
// Sadece favori ID'lerini döner (header badge için)
router.get('/ids', authRequired, async (req, res, next) => {
  try {
    const favorites = await Favorite.findAll({
      where: { userId: req.user.id },
      attributes: ['propertyId']
    });

    res.json({
      success: true,
      data: { favoriteIds: favorites.map(f => f.propertyId) }
    });
  } catch (error) {
    next(error);
  }
});

// ── POST /api/favorites/:propertyId ──────────────
router.post('/:propertyId', authRequired, async (req, res, next) => {
  try {
    const propertyId = Number(req.params.propertyId);

    // İlan var mı kontrol et
    const property = await Property.findByPk(propertyId);
    if (!property) {
      return res.status(404).json({ success: false, message: 'İlan bulunamadı' });
    }

    // Daha önce eklenmiş mi?
    const existing = await Favorite.findOne({
      where: { userId: req.user.id, propertyId }
    });

    if (existing) {
      return res.status(409).json({ success: false, message: 'Bu ilan zaten favorilerinizde' });
    }

    await Favorite.create({ userId: req.user.id, propertyId });

    res.status(201).json({
      success: true,
      message: 'Favorilere eklendi'
    });
  } catch (error) {
    next(error);
  }
});

// ── DELETE /api/favorites/:propertyId ────────────
router.delete('/:propertyId', authRequired, async (req, res, next) => {
  try {
    const propertyId = Number(req.params.propertyId);

    const deleted = await Favorite.destroy({
      where: { userId: req.user.id, propertyId }
    });

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Favori bulunamadı' });
    }

    res.json({
      success: true,
      message: 'Favorilerden çıkarıldı'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
