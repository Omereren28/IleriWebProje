/**
 * HomeOfEmlak — Favorite Model
 */
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Favorite = sequelize.define('Favorite', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' },
    field: 'user_id'
  },
  propertyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'properties', key: 'id' },
    field: 'property_id'
  }
}, {
  tableName: 'favorites',
  updatedAt: false,
  indexes: [
    { unique: true, fields: ['user_id', 'property_id'] }
  ]
});

module.exports = Favorite;
