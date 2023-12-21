'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Voter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Voter.belongsTo(models.User, {foreignKey: "UserId"})
      Voter.belongsTo(models.PresidentCandidate, {foreignKey: "PresidentId"})

      // many to many terhadap Party
      //super many2many
      Voter.belongsToMany(models.Party, {through: "VoterParty", foreignKey: "VoterId"})
      Voter.hasMany(models.VoterParty, {foreignKey: "VoterId"})
    }
  }
  Voter.init({
    name: DataTypes.STRING,
    voteAmount: DataTypes.INTEGER,
    PresidentId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Voter',
  });
  return Voter;
};