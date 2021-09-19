import {
    ISLOGIN,
    USER_INFO,
    USER_UPDATE_INFO,
    WITHDRAW,
    GET_NEW_ACCESSTOKEN,
    GET_GOOGLE_TOKEN
  } from '../actions/index';
  
  const initialState = {
    user:{ 
      accessToken:"",
      email:"",
      nickName: "",
      vegType: "vegetarian",
      password: null,
      profileblob: "",
      isLogin: false
     },
     googleToken: ""
  }
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case ISLOGIN:
        return Object.assign({}, state.user, {
          user:{
            ...state.user,
          ...action.payload.data
          }
      });
    case USER_INFO:
    
      return Object.assign({}, state.user, {
        
        user:{ 
          ...state.user,
          ...action.payload.data
        }
        
      });
    case USER_UPDATE_INFO:
      return Object.assign({}, state.user, {
    
        user:{ 
          ...state.user,
          ...action.payload.data
        }
        
      });
    case  GET_NEW_ACCESSTOKEN:
      return Object.assign({}, state.user, {
  
        user:{ 
          ...state.user,
          ...action.payload.data
        }
        
      });
      case WITHDRAW:
        return Object.assign({}, state.user, {
     
          user:{    
             accessToken:"",
              email:"",
              nickName: "",
              vegType: "vegetarian",
              password: null,
              profileblob: "",
              isLogin:false
           }
        });
      case GET_GOOGLE_TOKEN:
        return Object.assign({}, state, {
  
        
            ...state,
            ...action.payload.data
        
          
        });
    default:
      return state;
  }
  };
  
  export default userReducer;