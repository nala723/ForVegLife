'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

const { user, menuprice, place, review, users_places_like, vegCategory } = sequelize.models;

user.hasMany(review, {
  foreignKey: 'user_id'
});

review.belongsTo(user, {
  foreignKey : 'user_id'
});

place.hasMany(review, {
  foreignKey : 'place_id'
});

review.belongsTo(place, {
  foreignKey: 'place_id'
});

place.hasMany(vegCategory, {
  foreignKey : 'place_id'
});

vegCategory.belongsTo(place, {
  foreignKey : 'place_id'
});

place.hasMany(menuprice, {
  foreignKey : 'place_id'
});

menuprice.belongsTo(place, {
  foreignKey: 'place_id'
});

user.hasMany(users_places_like, {
  foreignKey: 'user_id'
});

users_places_like.belongsTo(user, {
  foreignKey: 'user_id'
});

place.hasMany(users_places_like, {
  foreignKey: 'place_id'
});

users_places_like.belongsTo(place, {
  foreignKey: 'place_id'
});

place.belongsTomany(user, {through: 'users_places_like', foreignKey: 'place_id'});
user.belongsTomany(place, {through: 'users_places_like', foreignKey: 'user_id'});

module.exports = db;
