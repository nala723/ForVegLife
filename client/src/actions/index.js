export const ISLOGIN = "ISLOGIN";
export const MAPCENTER = "MAPCENTER";
export const SELECTPLACE = "SELECTPLACE";
export const GET_GOOGLE_TOKEN = "GET_GOOGLE_TOKEN";

// my page
export const USER_INFO = "USER_INFO";
export const USER_UPDATE_INFO = "USER_UPDATE_INFO";
export const WITHDRAW = "WITHDRAW";
export const GET_MY_REVIEW = "GET_MY_REVIEW";
export const GET_MY_FAVORITE = "GET_MY_FAVORITE";
export const DELETE_MY_FAVORITE = "DELETE_MY_FAVORITE";

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

//get googletoken

export const googleToken = (data) => {
  return {
    type: GET_GOOGLE_TOKEN,
    payload:{
      data
    }
  }
}


//new accessToken
export const newAccessToken = (data) => {
  return {
    type: GET_NEW_ACCESSTOKEN,
    payload: {
      data
    }
  }
}

// my page
export const userInfo = ( data) => {
   return {
      type: USER_INFO,
      payload : {
       data
      }
   }
};

export const userUpdateInfo = (data) => {
  return {
     type: USER_UPDATE_INFO,
     payload : {
       data
     }
  }
};

export const withdraw = () => {
  return {
     type: WITHDRAW
  }
};

export const getmyreview = (data) => {
  return {
     type: GET_MY_REVIEW,
     payload : {
       data
     }
  }
};

export const getmyfavorite = (data) => {
  return {
     type: GET_MY_FAVORITE,
     payload : {
       data
     }
  }
};

export const deletemyfavorite = (id) => {
  return {
    type: DELETE_MY_FAVORITE,
    payload : {
        id
    }
  }
} 

