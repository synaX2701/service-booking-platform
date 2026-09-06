const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Business = sequelize.define('Business', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  businessName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  category: {
    type: DataTypes.ENUM('barber', 'hairdresser', 'pet_groomer', 'tattoo', 'piercing', 'spa', 'salon', 'other'),
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  website: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  profileImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  coverImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  rating: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  totalReviews: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Business;