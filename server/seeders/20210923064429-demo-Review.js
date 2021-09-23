'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('reviews', [{
      review : "야채 질이 좋아요",
      stars : 4,
      user_id : 10,
      place_id : 11,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      review : "그냥 그래요",
      stars : 3,
      user_id : 10,
      place_id : 12,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      review : "그냥 그래요",
      stars : 3,
      user_id : 10,
      place_id : 13,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      review : "그냥 그래요",
      stars : 3,
      user_id : 10,
      place_id : 14,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      review : "good",
      stars : 5,
      user_id : 10,
      place_id : 15,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      review : "best",
      stars : 5,
      user_id : 10,
      place_id : 12,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      review : "good!",
      stars : 4,
      user_id : 10,
      place_id : 16,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      review : "better!",
      stars : 5,
      user_id : 10,
      place_id : 17,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('reviews', null, {});
  }
};
