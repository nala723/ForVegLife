import {
    ISLOGIN,
    USER_INFO,
    USER_UPDATE_INFO,
    WITHDRAW,
    GET_NEW_ACCESSTOKEN
  } from '../actions/index';
  
  const initialState = {
     accessToken:"",
     email:"",
     nickName: "",
     vegType: "vegetarian",
     password: null,
     profileblob: {},
     isLogin: false
  }
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case ISLOGIN:
        return Object.assign({}, state, {
          ...state,
          ...action.payload.data,
      });
    case USER_INFO:
    
      return Object.assign({}, state, {
        
          ...state,
          ...action.payload.data
        
      });
    case USER_UPDATE_INFO:
      return Object.assign({}, state, {
    
          ...state,
          ...action.payload.data
       
      });
    case  GET_NEW_ACCESSTOKEN:
      return Object.assign({}, state, {
  
          ...state,
          ...action.payload.data
        
      });
      case WITHDRAW:
        return Object.assign({}, state, {
     
              accessToken:"",
              email:"",
              nickName: "",
              vegType: "vegetarian",
              password: null,
              profileblob: "",
              isLogin:false
          
        });
    default:
      return state;
  }
  };
  
  export default userReducer;