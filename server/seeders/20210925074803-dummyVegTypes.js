'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('vegCategories',[{
      category : '비건',
      place_id : 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      category: '비건',
      place_id : 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      category : '락토',
      place_id : 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      category : '비건',
      place_id : 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      category : '비건',
      place_id : 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      category : '락토',
      place_id : 4,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      category : '페스코',
      place_id : 4,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      category : '락토 오보',
      place_id : 4,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      category : '비건',
      place_id : 5,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      category : '비건',
      place_id : 6,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      category : '비건',
      place_id : 7,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      category : '오보',
      place_id : 7,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      category : '락토',
      place_id : 8,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      category : '비건',
      place_id : 8,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      category : '페스코',
      place_id : 9,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      category : '비건',
      place_id : 9,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      category : '락토',
      place_id : 9,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      category : '락토',
      place_id : 10,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      category : '비건',
      place_id : 10,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      category : '락토',
      place_id : 11,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      category : '비건',
      place_id : 11,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      category : '페스코',
      place_id : 12,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      category : '비건',
      place_id : 12,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      category : '비건',
      place_id : 13,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      category : '페스코',
      place_id : 14,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      category : '비건',
      place_id : 14,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      category : '락토',
      place_id : 15,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      category : '비건',
      place_id : 15,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      category : '비건',
      place_id : 16,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      category : '페스코',
      place_id : 16,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      category : '오보',
      place_id : 17,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      category : '비건',
      place_id : 17,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      category : '비건',
      place_id : 18,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      category : '비건',
      place_id : 19,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      category : '비건',
      place_id : 20,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('vegCategories', null, {});
  }
};
