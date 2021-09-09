'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('places', [{
      latitude : 37.501013065215844,
      longitude : 127.10760621200153,
      title : '장보고 마트',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('places', null, {});
  }
};
