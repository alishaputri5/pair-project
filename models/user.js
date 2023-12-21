'use strict';
const bcryptjs = require("bcryptjs")
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.PresidentCandidate, {foreignKey: "UserId"})
      User.hasOne(models.Voter, {foreignKey: "UserId"})
    }
  }
  User.init({
    user: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(instance, options) {
        let salt = bcryptjs.genSaltSync(10)
        let hash = bcryptjs.hashSync(instance.password, salt)
        instance.password = hash
      }
    }
  });
  return User;
};