'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('reviews', [{
      review : "야채 질이 좋아요",
      stars : 4,
      user_id : 10,
      place_id : 18,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      review : "좋아요",
      stars : 4,
      user_id : 10,
      place_id : 19,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      review : "최고에요",
      stars : 5,
      user_id : 10,
      place_id : 20,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      review : "그냥 그래요",
      stars : 3,
      user_id : 10,
      place_id : 19,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      review : "또 갈거에요",
      stars : 5,
      user_id : 10,
      place_id : 20,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      review : "최악",
      stars : 1,
      user_id : 10,
      place_id : 21,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      review : "딱히...",
      stars : 2,
      user_id : 10,
      place_id : 22,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      review : "또 올거에요",
      stars : 5,
      user_id : 10,
      place_id : 23,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      review : "평범해요",
      stars : 3,
      user_id : 10,
      place_id : 24,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      review : "말로 표현하기 힘든...",
      stars : 5,
      user_id : 10,
      place_id : 25,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      review : "엑셀런트",
      stars : 5,
      user_id : 10,
      place_id : 26,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      review : "베스트!!",
      stars : 5,
      user_id : 10,
      place_id : 27,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      review : "평생 단골",
      stars : 5,
      user_id : 10,
      place_id : 28,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      review : "없어져서는 안 될 식당",
      stars : 5,
      user_id : 10,
      place_id : 29,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      review : "와볼만 해요",
      stars : 4,
      user_id : 10,
      place_id : 30,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    
  }
};
