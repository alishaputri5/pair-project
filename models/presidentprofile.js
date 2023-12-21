'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PresidentProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PresidentProfile.hasOne(models.PresidentCandidate, {foreignKey: "PresidentProfileId"})
    }
  }
  PresidentProfile.init({
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    visionMission: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'PresidentProfile',
  });
  return PresidentProfile;
};