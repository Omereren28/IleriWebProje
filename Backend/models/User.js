/**
 * HomeOfEmlak — User Model
 */
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Ad alanı zorunludur' },
      len: { args: [2, 100], msg: 'Ad en az 2 karakter olmalıdır' }
    }
  },
  lastName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Soyad alanı zorunludur' },
      len: { args: [2, 100], msg: 'Soyad en az 2 karakter olmalıdır' }
    }
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: { msg: 'Bu e-posta adresi zaten kullanılıyor' },
    validate: {
      isEmail: { msg: 'Geçerli bir e-posta adresi giriniz' }
    }
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  passwordHash: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('user', 'agent', 'admin'),
    defaultValue: 'user'
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  verificationCode: {
    type: DataTypes.STRING(6),
    allowNull: true
  },
  verificationCodeExpires: {
    type: DataTypes.DATE,
    allowNull: true
  },
  verificationToken: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  resetPasswordCode: {
    type: DataTypes.STRING(6),
    allowNull: true
  },
  resetPasswordCodeExpires: {
    type: DataTypes.DATE,
    allowNull: true
  },
  resetPasswordToken: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  resetPasswordExpires: {
    type: DataTypes.DATE,
    allowNull: true
  },
  avatar: {
    type: DataTypes.STRING(500),
    allowNull: true
  }
}, {
  tableName: 'users',
  hooks: {
    beforeCreate: async (user) => {
      if (user.passwordHash) {
        user.passwordHash = await bcrypt.hash(user.passwordHash, 12);
      }
    }
  }
});

// Instance method: Şifre karşılaştırma
User.prototype.comparePassword = async function(password) {
  return bcrypt.compare(password, this.passwordHash);
};

// Instance method: JSON'a dönüştürürken hassas bilgileri gizle
User.prototype.toSafeJSON = function() {
  const user = this.toJSON();
  delete user.passwordHash;
  delete user.verificationToken;
  delete user.verificationCode;
  delete user.verificationCodeExpires;
  delete user.resetPasswordToken;
  delete user.resetPasswordExpires;
  delete user.resetPasswordCode;
  delete user.resetPasswordCodeExpires;
  return user;
};

module.exports = User;
