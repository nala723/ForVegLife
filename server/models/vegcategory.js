'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class vegCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  vegCategory.init({
    category: DataTypes.STRING,
    place_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'vegCategory',
  });
  return vegCategory;
};