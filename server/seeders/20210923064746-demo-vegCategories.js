'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('vegCategories', [{
      category : 'lacto',
      place_id : 11,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      category : 'ovo',
      place_id : 12,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      category : 'pesco',
      place_id : 13,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      category : 'ovo',
      place_id : 14,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      category : 'ovo',
      place_id : 15,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      category : 'ovo',
      place_id : 16,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      category : 'ovo',
      place_id : 17,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('vegCategories', null, {});
  }
};
