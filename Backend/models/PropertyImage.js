/**
 * HomeOfEmlak — PropertyImage Model
 */
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PropertyImage = sequelize.define('PropertyImage', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  propertyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'properties', key: 'id' },
    field: 'property_id'
  },
  url: {
    type: DataTypes.STRING(1000),
    allowNull: false
  },
  sortOrder: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'sort_order'
  }
}, {
  tableName: 'property_images',
  updatedAt: false
});

module.exports = PropertyImage;
