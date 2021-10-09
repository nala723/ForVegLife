'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('places', [{
      latitude : 37.4734922,
      longitude: 127.050977,
      address: '서울 강남구 개포동 1171',
      picture_url: 'https://t1.kakaocdn.net/thumb/T800x0.q80/?fname=ht…reboot%2Fplace%2F317DF5B1187C48A39126F3C395DABDE5',
      title : '러빙헛 스마일',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      latitude : 37.5191090,
      longitude : 127.024730,
      address : '서울 강남구 신사동 540-18',
      picture_url : 'https://t1.kakaocdn.net/thumb/T800x0.q80/?fname=ht…net%2Flocalfiy%2F0D74B72C9E2E43F8958EFACDC35D19EE',
      title: '칙피스 가로수길점',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      latitude: 37.5458434,
      longitude: 126.920825,
      address: '서울 마포구 합정동 361-26',
      picture_url : 'https://t1.daumcdn.net/localimg/localimages/07/2017/pc/bg_nodata.png',
      title: '쿡앤북',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      latitude: 37.5458434,
      longitude: 126.920825,
      address: '서울 마포구 상수동 336-18',
      picture_url : 'https://t1.kakaocdn.net/thumb/T800x0.q80/?fname=ht…dn.net%2Fplace%2FB1B133A268634BE597CCF4EA5F3FEB27',
      title: '슬런치 팩토리',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      latitude: 37.5551222,
      longitude: 126.932812,
      address: '서울 마포구 서교동 노고산동 54-58',
      picture_url: 'https://t1.kakaocdn.net/thumb/T800x0.q80/?fname=ht…dn.net%2Fplace%2F355D5A2C2299491D9F0315264C5848B0',
      title: '더브레드블루 신촌본점',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      latitude: 37.5517798,
      longitude: 126.907058,
      address: '서울 마포구 합정동 434-1',
      picture_url: 'https://t1.kakaocdn.net/thumb/T800x0.q80/?fname=ht…dn.net%2Fplace%2F0EC73F67D3194568935AA1668ACC8DA2',
      title: '그러팡야',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      latitude: 37.5650578,
      longitude: 126.903894,
      address: '서울 마포구 성산동 593-1',
      picture_url : 'https://t1.kakaocdn.net/thumb/T800x0.q80/?fname=ht…dn.net%2Fplace%2FF2CC59432AC042CBB5F2E900F4043594',
      title: '그린바이브',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      latitude: 37.5546452,
      longitude: 126.5546452,
      address: '서울 마포구 노고산동 56-109',
      picture_url: 'https://t1.kakaocdn.net/thumb/T800x0.q80/?fname=ht…net%2Flocalfiy%2F3500C1E35D9545299E4A8FC9002A2609',
      title: '기웃기웃',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      latitude: 37.5543554,
      longitude: 126.905572,
      address: '서울 마포구 망원동 400-9',
      picture_url: 'https://t1.kakaocdn.net/thumb/T800x0.q80/?fname=ht…dn.net%2Fplace%2FD1CC2EAF997B4F619BA1148EE3534FFC',
      title: '다이너재키',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      latitude: 37.5459589,
      longitude: 126.918438,
      address: '서울 마포구 합정동 357-7',
      picture_url: 'https://t1.kakaocdn.net/thumb/T800x0.q80/?fname=ht…dn.net%2Fplace%2F3EB40FA6E0DA477E988DD1136C189906',
      title: '무대륙',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      latitude: 37.5550174,
      longitude: 126.923690,
      address: '서울 마포구 서교동 346-36',
      picture_url: 'https://t1.kakaocdn.net/thumb/T800x0.q80/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fplace%2F59A98E6443954047B924F93BFEBA2A5F',
      title: '별자리마라탕&훠궈',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      latitude: 37.5595533,
      longitude: 126.916238,
      address: '서울 마포구 성산동 232-7',
      picture_url: 'https://t1.kakaocdn.net/thumb/T800x0.q80/?fname=ht…aumcdn.net%2Flocalfiy%2Fsearchregister_1161130418',
      title: '비비빔',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      latitude: 37.5520590,
      longitude: 126.906933,
      address: '서울 마포구 합정동 433-61',
      picture_url: 'https://t1.kakaocdn.net/thumb/T800x0.q80/?fname=ht…reboot%2Fplace%2F12B312A793D84425B371BD1C485902C0',
      title: '셰발레리',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      latitude: 37.5534703,
      longitude: 126.914514,
      address: '서울 마포구 서교동 483-9',
      picture_url: 'https://t1.kakaocdn.net/thumb/T800x0.q80/?fname=ht…net%2Flocalfiy%2F0B8E8DE245394E4B82F3AC7E8F387F3D',
      title: '수잔네 허브식당',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      latitude: 37.5628654,
      longitude: 126.924146,
      address: '서울 마포구 연남동 229-61',
      picture_url: 'https://t1.kakaocdn.net/thumb/T800x0.q80/?fname=http%3A%2F%2Ft1.kakaocdn.net%2Ffiy_reboot%2Fplace%2F1E1F3D569FE94D1296727309C4356B8C',
      title: '앙뗄',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      latitude: 37.5448587,
      longitude: 126.947950,
      address: '서울 마포구 공덕동 477',
      picture_url: 'https://t1.kakaocdn.net/thumb/T800x0.q80/?fname=ht…net%2Flocalfiy%2F978444A4288C41F0B6809F677C07C5B4',
      title: '어반도투리',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      latitude: 37.5472953,
      longitude: 126.922781,
      address: '서울 마포구 상수동 328-1',
      picture_url: 'https://t1.kakaocdn.net/thumb/T800x0.q80/?fname=ht…dn.net%2Fplace%2FED94699F20044433B407F81C1782B410',
      title: '연우김밥',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      latitude: 35.2105552,
      longitude: 126.893184,
      address: '광주 북구 일곡동 852-7',
      picture_url: 'https://t1.kakaocdn.net/thumb/T800x0.q80/?fname=ht…net%2Flocalfiy%2F3C4D0A46A4BC4E808B0ECA4C618D7657',
      title: '메밀정원',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      latitude: 35.1386267,
      longitude: 126.795402,
      address: '광주 광산구 송정동 819-5',
      picture_url: 'https://t1.kakaocdn.net/thumb/T800x0.q80/?fname=ht…dn.net%2Fplace%2FBF4E289017CD40238109775AF3AB4616',
      title: '깨비분식',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      latitude: 35.1509512,
      longitude: 126.919020,
      address: '광주 동구 궁동 13',
      picture_url: 'https://t1.daumcdn.net/localimg/localimages/07/2017/pc/bg_nodata.png',
      title: '오월밥집',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('places', null, {});
  }
};
