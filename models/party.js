'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Party extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Party.belongsTo(models.PresidentCandidate, {foreignKey: "PresidentId"})

      Party.belongsToMany(models.Voter, {through: "VoterParty", foreignKey: "PartyId"})
      Party.hasMany(models.VoterParty, {foreignKey: "PartyId"})
    }
  }
  Party.init({
    name: DataTypes.STRING,
    PresidentId: DataTypes.INTEGER,
    voteParty: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Party',
  });
  return Party;
};