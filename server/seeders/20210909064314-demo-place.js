'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('places', [{
      latitude : 37.49383582630206,
      longitude : 127.03325692349587,
      title : '이마트 에브리데이',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('places', null, {});
  }
};
