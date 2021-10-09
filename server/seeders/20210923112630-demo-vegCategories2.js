'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('vegCategories', [{
      category : 'ovo',
      place_id : 18,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      category : 'ovo',
      place_id : 19,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      category : 'vegan',
      place_id : 20,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      category : 'ovo',
      place_id : 21,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      category : 'lacto',
      place_id : 22,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      category : 'ovo',
      place_id : 23,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      category : 'pesco',
      place_id : 24,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      category : 'lacto ovo',
      place_id : 25,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      category : 'ovo',
      place_id : 26,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      category : 'ovo',
      place_id : 27,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      category : 'pesco',
      place_id : 28,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      category : 'ovo',
      place_id : 29,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      category : 'ovo',
      place_id : 30,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    
  }
};
