export const ISLOGIN = "ISLOGIN";
export const MAPCENTER = "MAPCENTER";
export const SELECTPLACE = "SELECTPLACE";

// my page
export const USER_INFO = "USER_INFO";
export const USER_UPDATE_INFO = "USER_UPDATE_INFO";
export const WITHDRAW = "WITHDRAW";
export const GET_MY_REVIEW = "GET_MY_REVIEW";
export const GET_MY_FAVORITE = "GET_MY_FAVORITE";

// get new accessToken
export const GET_NEW_ACCESSTOKEN = "GET_NEW_ACCESSTOKEN";

/* 액션 생성함수 만들기 */
// 액션 생성함수를 만들고 export 키워드를 사용해서 내보내주세요.
export const isLogin = (data) => {
  return { type: ISLOGIN, payload: { data } };
};
export const mapCenter = (data) => {
  return { type: MAPCENTER, payload: { data } };
};
export const selectPlace = (data) => {
  return { type: SELECTPLACE, payload: {data} };
};

//new accessToken
export const newAccessToken = (accessToken) => {
  return {
    type: GET_NEW_ACCESSTOKEN,
    payload: {
      accessToken
    }
  }
}

// my page
export const userInfo = ( nickName,vegType,profileblob,email) => {
   return {
      type: USER_INFO,
      payload : {
        nickName,
        vegType,
        profileblob,
        email
      }
   }
};

export const userUpdateInfo = (vegType,profileblob,password) => {
  return {
     type: USER_UPDATE_INFO,
     payload : {
       vegType,
       profileblob,
       password
     }
  }
};

export const withdraw = () => {
  return {
     type: WITHDRAW
  }
};

export const getmyreview = (placeId,title,content,star,createdAt,reviewId) => {
  return {
     type: GET_MY_REVIEW,
     payload : {
       placeId,
       title,
       content,
       star,
       createdAt,
       reviewId
     }
  }
};

export const getmyfavorite = (placeId,title,pictureUrl,address) => {
  return {
     type: GET_MY_FAVORITE,
     payload : {
       placeId,
       title,
       pictureUrl,
       address
     }
  }
};
