/**
 * HomeOfEmlak — Property Routes
 */
const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { authRequired, authOptional } = require('../middleware/auth');
const { Property, PropertyImage, User, Favorite } = require('../models');
const { sendListingPublishedEmail } = require('../services/emailService');

// ── GET /api/properties ──────────────────────────
// Filtreleme, arama, sıralama, sayfalama destekli
router.get('/', async (req, res, next) => {
  try {
    const {
      type, category, city, district,
      minPrice, maxPrice,
      rooms, minSqm, maxSqm,
      q, sort,
      page = 1, limit = 12
    } = req.query;

    // Where koşulları
    const where = { isActive: true };

    if (type) where.type = type;
    if (category) where.category = category;
    if (city) where.city = city;
    if (district) where.district = district;
    if (rooms) where.rooms = rooms;

    // Fiyat aralığı
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price[Op.gte] = Number(minPrice);
      if (maxPrice) where.price[Op.lte] = Number(maxPrice);
    }

    // m² aralığı
    if (minSqm || maxSqm) {
      where.sqmNet = {};
      if (minSqm) where.sqmNet[Op.gte] = Number(minSqm);
      if (maxSqm) where.sqmNet[Op.lte] = Number(maxSqm);
    }

    // Arama
    if (q) {
      where[Op.or] = [
        { title: { [Op.like]: `%${q}%` } },
        { city: { [Op.like]: `%${q}%` } },
        { district: { [Op.like]: `%${q}%` } },
        { description: { [Op.like]: `%${q}%` } }
      ];
    }

    // Sıralama
    let order = [['createdAt', 'DESC']]; // default
    if (sort === 'price-asc') order = [['price', 'ASC']];
    else if (sort === 'price-desc') order = [['price', 'DESC']];
    else if (sort === 'date-asc') order = [['createdAt', 'ASC']];
    else if (sort === 'date-desc') order = [['createdAt', 'DESC']];
    else if (sort === 'sqm-desc') order = [['sqmNet', 'DESC']];

    // Sayfalama
    const offset = (Number(page) - 1) * Number(limit);

    const { count, rows } = await Property.findAndCountAll({
      where,
      include: [
        { model: PropertyImage, as: 'images', attributes: ['id', 'url', 'sortOrder'] },
        { model: User, as: 'user', attributes: ['id', 'firstName', 'lastName'] }
      ],
      order,
      limit: Number(limit),
      offset,
      distinct: true
    });

    res.json({
      success: true,
      data: {
        properties: rows,
        pagination: {
          total: count,
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil(count / Number(limit))
        }
      }
    });
  } catch (error) {
    next(error);
  }
});

// ── GET /api/properties/featured ─────────────────
router.get('/featured', async (req, res, next) => {
  try {
    const properties = await Property.findAll({
      where: { isFeatured: true, isActive: true },
      include: [
        { model: PropertyImage, as: 'images', attributes: ['id', 'url', 'sortOrder'] }
      ],
      order: [['createdAt', 'DESC']],
      limit: 10
    });

    res.json({ success: true, data: { properties } });
  } catch (error) {
    next(error);
  }
});

// ── GET /api/properties/latest ───────────────────
router.get('/latest', async (req, res, next) => {
  try {
    const count = Number(req.query.count) || 6;
    const properties = await Property.findAll({
      where: { isActive: true },
      include: [
        { model: PropertyImage, as: 'images', attributes: ['id', 'url', 'sortOrder'] }
      ],
      order: [['createdAt', 'DESC']],
      limit: count
    });

    res.json({ success: true, data: { properties } });
  } catch (error) {
    next(error);
  }
});

// ── GET /api/properties/:id ──────────────────────
router.get('/:id', async (req, res, next) => {
  try {
    const property = await Property.findByPk(req.params.id, {
      include: [
        { model: PropertyImage, as: 'images', attributes: ['id', 'url', 'sortOrder'], order: [['sortOrder', 'ASC']] },
        { model: User, as: 'user', attributes: ['id', 'firstName', 'lastName', 'email'] }
      ]
    });

    if (!property || !property.isActive) {
      return res.status(404).json({ success: false, message: 'İlan bulunamadı' });
    }

    // Görüntülenme sayacını artır
    await property.increment('views');

    res.json({ success: true, data: { property } });
  } catch (error) {
    next(error);
  }
});

// ── GET /api/properties/:id/similar ──────────────
router.get('/:id/similar', async (req, res, next) => {
  try {
    const property = await Property.findByPk(req.params.id);
    if (!property) {
      return res.status(404).json({ success: false, message: 'İlan bulunamadı' });
    }

    const count = Number(req.query.count) || 4;
    const similar = await Property.findAll({
      where: {
        id: { [Op.ne]: property.id },
        isActive: true,
        [Op.or]: [
          { city: property.city },
          { category: property.category }
        ]
      },
      include: [
        { model: PropertyImage, as: 'images', attributes: ['id', 'url', 'sortOrder'] }
      ],
      limit: count,
      order: [['createdAt', 'DESC']]
    });

    res.json({ success: true, data: { properties: similar } });
  } catch (error) {
    next(error);
  }
});

// ── POST /api/properties ─────────────────────────
router.post('/', authRequired, [
  body('title').trim().notEmpty().withMessage('İlan başlığı zorunludur'),
  body('type').isIn(['sale', 'rent']).withMessage('İlan türü geçersiz'),
  body('category').isIn(['apartment', 'villa', 'land', 'commercial', 'summer', 'project']).withMessage('Kategori geçersiz'),
  body('price').isNumeric().withMessage('Geçerli bir fiyat giriniz'),
  body('city').trim().notEmpty().withMessage('Şehir zorunludur'),
  body('district').trim().notEmpty().withMessage('İlçe zorunludur')
], validate, async (req, res, next) => {
  try {
    const propertyData = {
      ...req.body,
      userId: req.user.id,
      ownerName: req.body.ownerName || `${req.user.firstName} ${req.user.lastName}`,
      ownerPhone: req.body.ownerPhone || req.user.phone
    };

    // images dizisini ayrı tut
    const imageUrls = req.body.images || [];
    delete propertyData.images;

    const property = await Property.create(propertyData);

    // Görselleri ekle
    if (imageUrls.length > 0) {
      const imageRecords = imageUrls.map((url, index) => ({
        propertyId: property.id,
        url,
        sortOrder: index
      }));
      await PropertyImage.bulkCreate(imageRecords);
    }

    // İlanı ilişkileriyle birlikte yeniden getir
    const fullProperty = await Property.findByPk(property.id, {
      include: [
        { model: PropertyImage, as: 'images', attributes: ['id', 'url', 'sortOrder'] }
      ]
    });

    // İlan yayınlandı bildirimi
    sendListingPublishedEmail(req.user, property).catch(err => console.error('Email error:', err));

    res.status(201).json({
      success: true,
      message: 'İlanınız başarıyla yayınlandı!',
      data: { property: fullProperty }
    });
  } catch (error) {
    next(error);
  }
});

// ── PUT /api/properties/:id ──────────────────────
router.put('/:id', authRequired, async (req, res, next) => {
  try {
    const property = await Property.findByPk(req.params.id);
    if (!property) {
      return res.status(404).json({ success: false, message: 'İlan bulunamadı' });
    }

    // Sadece ilan sahibi veya admin güncelleyebilir
    if (property.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Bu işlem için yetkiniz yok' });
    }

    const imageUrls = req.body.images;
    delete req.body.images;

    await property.update(req.body);

    // Eğer yeni görseller gönderildiyse güncelle
    if (imageUrls && Array.isArray(imageUrls)) {
      await PropertyImage.destroy({ where: { propertyId: property.id } });
      const imageRecords = imageUrls.map((url, index) => ({
        propertyId: property.id,
        url,
        sortOrder: index
      }));
      await PropertyImage.bulkCreate(imageRecords);
    }

    const updated = await Property.findByPk(property.id, {
      include: [{ model: PropertyImage, as: 'images' }]
    });

    res.json({
      success: true,
      message: 'İlan güncellendi',
      data: { property: updated }
    });
  } catch (error) {
    next(error);
  }
});

// ── DELETE /api/properties/:id ───────────────────
router.delete('/:id', authRequired, async (req, res, next) => {
  try {
    const property = await Property.findByPk(req.params.id);
    if (!property) {
      return res.status(404).json({ success: false, message: 'İlan bulunamadı' });
    }

    if (property.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Bu işlem için yetkiniz yok' });
    }

    // Soft delete — isActive = false
    await property.update({ isActive: false });

    res.json({
      success: true,
      message: 'İlan silindi'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
