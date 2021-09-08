module.exports = {
    signup: require('./user/signup'),
    signin: require('./user/signin'),
    signout: require('./user/signout'),
    withdrawal: require('./user/withdrawal'),
    registration: require('./place/registration'),
    category: require('./place/category'),
    select: require('./place/select'),
    createFavorites: require('./place/createFavorites'),
    cancelFavorites: require('./place/cancelFavorites'),
    createReview: require('./place/createReview'),
    updateUserInfo: require('./mypage/updateUserInfo'),
    getUserInfo: require('./mypage/getUserInfo'),
    getFavorites: require('./mypage/getFavorites'),
    getReview: require('./mypage/getReview'),
  };  