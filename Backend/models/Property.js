/**
 * HomeOfEmlak — Property Model
 */
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Property = sequelize.define('Property', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' }
  },
  title: {
    type: DataTypes.STRING(500),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'İlan başlığı zorunludur' },
      len: { args: [5, 500], msg: 'Başlık en az 5 karakter olmalıdır' }
    }
  },
  type: {
    type: DataTypes.ENUM('sale', 'rent'),
    allowNull: false,
    defaultValue: 'sale'
  },
  category: {
    type: DataTypes.ENUM('apartment', 'villa', 'land', 'commercial', 'summer', 'project'),
    allowNull: false,
    defaultValue: 'apartment'
  },
  price: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
    validate: {
      min: { args: [0], msg: 'Fiyat 0\'dan büyük olmalıdır' }
    }
  },
  // Konum bilgileri
  city: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  district: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  neighborhood: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  lat: {
    type: DataTypes.DECIMAL(10, 6),
    allowNull: true
  },
  lng: {
    type: DataTypes.DECIMAL(10, 6),
    allowNull: true
  },
  // Özellikler
  rooms: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  sqmGross: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'sqm_gross'
  },
  sqmNet: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'sqm_net'
  },
  floor: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  totalFloors: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
    field: 'total_floors'
  },
  buildingAge: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
    field: 'building_age'
  },
  bathrooms: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  heating: {
    type: DataTypes.STRING(50),
    allowNull: true,
    defaultValue: 'dogalgaz'
  },
  furnished: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  balcony: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  elevator: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  parking: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  pool: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  security: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  // İlan sahibi bilgileri
  ownerName: {
    type: DataTypes.STRING(200),
    allowNull: true,
    field: 'owner_name'
  },
  ownerPhone: {
    type: DataTypes.STRING(20),
    allowNull: true,
    field: 'owner_phone'
  },
  ownerType: {
    type: DataTypes.ENUM('owner', 'agent'),
    defaultValue: 'owner',
    field: 'owner_type'
  },
  // Meta
  views: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  isFeatured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_featured'
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'is_active'
  }
}, {
  tableName: 'properties',
  indexes: [
    { fields: ['type'] },
    { fields: ['category'] },
    { fields: ['city'] },
    { fields: ['price'] },
    { fields: ['is_featured'] },
    { fields: ['is_active'] },
    { fields: ['created_at'] }
  ]
});

module.exports = Property;
