'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('menuprices', [{
     menu : '두부탕면',
     price : 13000,
     place_id : 1,
     createdAt: new Date(),
     updatedAt: new Date()
   },{
    menu : '비건키토김밥',
    price : 9000,
    place_id : 1,
    createdAt: new Date(),
    updatedAt: new Date()
   },{
    menu : '비건샐러드',
    price : 10000,
    place_id : 2,
    createdAt: new Date(),
    updatedAt: new Date()
   },{
    menu : '오리지널허무스',
    price : 8000,
    place_id : 2,
    createdAt: new Date(),
    updatedAt: new Date()
   },{
    menu : '베지버거와 현미밥',
    price : 11000,
    place_id : 3,
    createdAt: new Date(),
    updatedAt: new Date()
   },{
    menu : '비건 가지랜틸 마파두부와 현미밥',
    price : 13000,
    place_id : 3,
    createdAt: new Date(),
    updatedAt: new Date()
   },{
    menu : '명란 투움바 파스타',
    price : 17000,
    place_id : 4,
    createdAt: new Date(),
    updatedAt: new Date()
   },{
    menu : '크린빈 토마토 리조또',
    price : 16000,
    place_id : 4,
    createdAt: new Date(),
    updatedAt: new Date()
   },{
    menu : '그린',
    price : 4900,
    place_id : 7,
    createdAt: new Date(),
    updatedAt: new Date()
   },{
    menu : '바질푸실리',
    price : 5900,
    place_id : 7,
    createdAt: new Date(),
    updatedAt: new Date()
   },{
    menu : '아스카도롤',
    price : 8500,
    place_id : 9,
    createdAt: new Date(),
    updatedAt: new Date()
   },{
    menu : '생연어 아보카도롤',
    price : 12000,
    place_id : 9,
    createdAt: new Date(),
    updatedAt: new Date()
   },{
    menu : '마라탕(100g)',
    price : 2200,
    place_id : 11,
    createdAt: new Date(),
    updatedAt: new Date()
   },{
    menu : '훠궈(1인)',
    price : 10000,
    place_id : 11,
    createdAt: new Date(),
    updatedAt: new Date()
   },{
    menu : '강된장',
    price : 6000,
    place_id : 12,
    createdAt: new Date(),
    updatedAt: new Date()
   },{
    menu : '육회',
    price : 8000,
    place_id : 12,
    createdAt: new Date(),
    updatedAt: new Date()
   },{
    menu : '비건미트소스통밀리가토니',
    price : 12000,
    place_id : 13,
    createdAt: new Date(),
    updatedAt: new Date()
   },{
    menu : '샹피뇽피자',
    price : 13800,
    place_id : 13,
    createdAt: new Date(),
    updatedAt: new Date()
   },{
    menu : '두부열무비빔밥',
    price : 7000,
    place_id : 14,
    createdAt: new Date(),
    updatedAt: new Date()
   },{
    menu : '모듬 샐러드',
    price : 8000,
    place_id : 14,
    createdAt: new Date(),
    updatedAt: new Date()
   },{
    menu : '말차파운드',
    price : 8000,
    place_id : 15,
    createdAt: new Date(),
    updatedAt: new Date()
   },{
    menu : '도토리만두전골(1인)',
    price : 8000,
    place_id : 16,
    createdAt: new Date(),
    updatedAt: new Date()
   },{
    menu : '제육산채나물밥상',
    price : 8500,
    place_id : 16,
    createdAt: new Date(),
    updatedAt: new Date()
   },{
    menu : '온모밀',
    price : 6000,
    place_id : 18,
    createdAt: new Date(),
    updatedAt: new Date()
   }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('menuprices', null, {});
  }
};
