/**
 * HomeOfEmlak — Model Loader & Associations
 */
const sequelize = require('../config/database');
const User = require('./User');
const Property = require('./Property');
const PropertyImage = require('./PropertyImage');
const Favorite = require('./Favorite');
const ContactMessage = require('./ContactMessage');

// ── Associations ──────────────────────────────

// User -> Properties (bir kullanıcı birden çok ilan verebilir)
User.hasMany(Property, { foreignKey: 'userId', as: 'properties', onDelete: 'CASCADE' });
Property.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Property -> Images (bir ilan birden çok görsele sahip olabilir)
Property.hasMany(PropertyImage, { foreignKey: 'propertyId', as: 'images', onDelete: 'CASCADE' });
PropertyImage.belongsTo(Property, { foreignKey: 'propertyId', as: 'property' });

// User -> Favorites (bir kullanıcı birden çok favori ekleyebilir)
User.hasMany(Favorite, { foreignKey: 'userId', as: 'favorites', onDelete: 'CASCADE' });
Favorite.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Property -> Favorites
Property.hasMany(Favorite, { foreignKey: 'propertyId', as: 'favorites', onDelete: 'CASCADE' });
Favorite.belongsTo(Property, { foreignKey: 'propertyId', as: 'property' });

module.exports = {
  sequelize,
  User,
  Property,
  PropertyImage,
  Favorite,
  ContactMessage
};
