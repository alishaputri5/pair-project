'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PresidentCandidate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PresidentCandidate.init({
    namePresident: DataTypes.STRING,
    votePresident: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    PresidentProfileId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PresidentCandidate',
  });
  return PresidentCandidate;
};