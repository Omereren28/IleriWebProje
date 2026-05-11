/**
 * HomeOfEmlak — Meta Routes (Cities, Categories, Stats)
 */
const express = require('express');
const router = express.Router();
const { Property, User } = require('../models');

const cities = [
  { name: 'İstanbul', districts: ['Kadıköy','Beşiktaş','Ataşehir','Beylikdüzü','Üsküdar','Bakırköy','Sarıyer','Maltepe'] },
  { name: 'Ankara', districts: ['Çankaya','Keçiören','Yenimahalle','Etimesgut','Mamak'] },
  { name: 'İzmir', districts: ['Bornova','Karşıyaka','Konak','Çeşme','Bayraklı'] },
  { name: 'Antalya', districts: ['Konyaaltı','Muratpaşa','Kepez','Lara','Alanya'] },
  { name: 'Muğla', districts: ['Bodrum','Fethiye','Marmaris','Dalaman','Datça'] },
  { name: 'Bursa', districts: ['Nilüfer','Osmangazi','Yıldırım','Mudanya'] },
  { name: 'Sakarya', districts: ['Sapanca','Serdivan','Adapazarı'] },
  { name: 'Aydın', districts: ['Kuşadası','Didim','Efeler','Söke'] },
];

const categories = [
  { key: 'apartment', label: 'Konut', icon: '🏢' },
  { key: 'villa', label: 'Villa', icon: '🏡' },
  { key: 'land', label: 'Arsa', icon: '🌿' },
  { key: 'commercial', label: 'İş Yeri', icon: '🏪' },
  { key: 'summer', label: 'Yazlık', icon: '🏖️' },
  { key: 'project', label: 'Projeler', icon: '🏗️' },
];

router.get('/cities', (req, res) => {
  res.json({ success: true, data: { cities } });
});

router.get('/categories', (req, res) => {
  res.json({ success: true, data: { categories } });
});

router.get('/stats', async (req, res, next) => {
  try {
    const totalProperties = await Property.count({ where: { isActive: true } });
    const totalUsers = await User.count();
    const uniqueCities = await Property.count({ distinct: true, col: 'city', where: { isActive: true } });
    res.json({
      success: true,
      data: {
        stats: [
          { value: totalProperties, label: 'Aktif İlan', suffix: '+' },
          { value: uniqueCities, label: 'Şehir', suffix: '' },
          { value: totalUsers, label: 'Mutlu Müşteri', suffix: '+' },
          { value: 15, label: 'Yıllık Tecrübe', suffix: '' }
        ]
      }
    });
  } catch (error) { next(error); }
});

module.exports = router;
