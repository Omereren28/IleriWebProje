/**
 * HomeOfEmlak — ContactMessage Model
 */
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ContactMessage = sequelize.define('ContactMessage', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      isEmail: { msg: 'Geçerli bir e-posta adresi giriniz' }
    }
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  subject: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_read'
  }
}, {
  tableName: 'contact_messages',
  updatedAt: false
});

module.exports = ContactMessage;
