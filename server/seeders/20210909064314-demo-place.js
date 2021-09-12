'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // return queryInterface.bulkInsert('places', [{
    //   latitude : 37.49383582630206,
    //   longitude : 127.03325692349587,
    //   title : '이마트 에브리데이',
    //   address : '서울 강남구 자곡로 106 101호',
    //   picture_url: '이미지 주소1',
    //   createdAt: new Date(),
    //   updatedAt: new Date()
    // },{
    //   latitude : 37.51171765832007,
    //   longitude : 127.09641264929758,
    //   title : '잠실롯데하이마트',
    //   address : '서울특별시 송파구 올림픽로 240',
    //   picture_url : '이미지 주소 2',
    //   createdAt: new Date(),
    //   updatedAt: new Date()
    // }, {
    //   latitude : 37.50116601680616,
    //   longitude : 127.10784675057008 ,
    //   title : '장보고마트',
    //   address : '서울특별시 송파구 가락로 102 석촌꽃마을빌딩',
    //   picture_url : '이미지 주소 3',
    //   createdAt: new Date(),
    //   updatedAt: new Date()
    // }])
    return queryInterface.bulkInsert('places', [{
      latitude : 37.49012407080708,
      longitude : 126.92740037421596 ,
      title : '호치킨 당곡사거리점',
      address : '서울 관악구 보라매로 7',
      picture_url : 'https://t1.kakaocdn.net/thumb/T800x0.q80/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fplace%2F7744E068E7A645FDA1378246E9E5C494',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('places', null, {});
  }
};
