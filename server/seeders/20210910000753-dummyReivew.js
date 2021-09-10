'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('reviews', [{
      review : "야채 질이 좋아요",
      stars : 5,
      user_id : 5,
      place_id : 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('reviews', null, {});
  }
};
