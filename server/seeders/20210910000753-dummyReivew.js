'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('reviews', [{
      review : "야채 질이 좋아요",
      stars : 4,
      user_id : 5,
      place_id : 11,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      review : "그냥 그래요",
      stars : 3,
      user_id : 5,
      place_id : 12,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('reviews', null, {});
  }
};
