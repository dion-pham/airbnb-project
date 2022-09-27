'use strict';
const {
  Model
} = require('sequelize');
const booking = require('./booking');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.hasMany(models.Booking,
        {
          foreignKey: 'spotId'
        });

      Spot.hasMany(models.Review, {
        foreignKey: 'spotId'
      });

      Spot.hasMany(models.SpotImage, {
        foreignKey: 'spotId'
      });

      Spot.belongsTo(models.User, {
        as: 'Owner',
        foreignKey: 'ownerId'
      })
    }
  }
  Spot.init({
    ownerId: DataTypes.INTEGER,
    address: DataTypes.TEXT,
    city: DataTypes.TEXT,
    state: DataTypes.TEXT,
    country: DataTypes.TEXT,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT,
    name: DataTypes.TEXT,
    description: DataTypes.TEXT,
    price: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Spot',
    scopes: {
      aliasOwner: {
        attributes: { exclude: ["username'"] }
      }
    }
  });
  return Spot;
};
