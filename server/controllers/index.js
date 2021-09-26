module.exports = {
  signup: require("./sign/signup"),
  signin: require("./sign/signin"),
  signout: require("./sign/signout"),
  withdrawal: require("./sign/withdrawal"),
  /*-----------------------------------------------------------------*/
  emailCode: require("./sign/emailCode"),
  emailVerification: require("./sign/emailVerification"),
  /*-----------------------------------------------------------------*/
  googleSignin: require("./google/signin"),
  googleWithdrawal: require("./google/withdrawal"),
  /*-----------------------------------------------------------------*/
  registration: require("./restaurant/registration"),
  category: require("./restaurant/category"),
  select: require("./restaurant/select"),
  recommendation: require("./restaurant/recommendation"),
  createFavorites: require("./restaurant/createFavorites"),
  cancelFavorites: require("./restaurant/cancelFavorites"),
  createReview: require("./restaurant/createReview"),
  deleteReview: require("./restaurant/deleteReview"),
  deleteRestaurant: require("./restaurant/deleteRestaurant"),
  updateReview: require("./restaurant/updateReview"),
  updateRestaurant: require("./restaurant/updateRestaurant"),
  recommendation: require("./restaurant/recommendation"),
  /*-----------------------------------------------------------------*/
  updateUserInfo: require("./mypage/updateUserInfo"),
  getUserInfo: require("./mypage/getUserInfo"),
  getFavorites: require("./mypage/getFavorites"),
  getReview: require("./mypage/getReview"),
};
