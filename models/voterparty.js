'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VoterParty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      VoterParty.belongsTo(models.Voter, {foreignKey: "VoterId"})
      VoterParty.belongsTo(models.Party, {foreignKey: "PartyId"})
    }
  }
  VoterParty.init({
    VoterId: DataTypes.INTEGER,
    PartyId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'VoterParty',
  });
  return VoterParty;
};