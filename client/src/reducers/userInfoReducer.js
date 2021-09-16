import {
    USER_INFO,
    USER_UPDATE_INFO,
    WITHDRAW,
    GET_NEW_ACCESSTOKEN
} from '../actions/index';
import { initialState } from './initialState';

const userInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_INFO:
    
      return Object.assign({}, state.user, {
        
          ...state.user,
          nickName: action.payload.nickName,
          vegType: action.payload.vegType,
          profileblob: action.payload.profileblob,
          email:action.payload.email //안되면 순서도 의심
        
      });
    case USER_UPDATE_INFO:
      return Object.assign({}, state.user, {
     
          ...state.user,
          vegType: action.payload.vegType,
          profileblob: action.payload.profileblob,
          password: action.payload.profileblob,
       
      });
    case  WITHDRAW:
      return Object.assign({}, state.user, {

          ...state.user,
            accessToken: action.payload.accessToken,
        
      });
      case GET_NEW_ACCESSTOKEN:
        return Object.assign({}, state.user, {
     
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

export default userInfoReducer;
