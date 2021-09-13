'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users_places_likes', [{
      place_id : 11,
      user_id : 5,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      place_id : 13,
      user_id : 5,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users_places_likes', null, {});
  }
};
