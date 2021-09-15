import {
    USER_INFO,
    USER_UPDATE_INFO,
    WITHDRAW,
} from '../actions/index';
import { initialState } from './initialState';

const userInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_INFO:
     const {nickName,vegType,profileblob,email} = action.payload
      return Object.assign({}, state, {
        user: {
            ...state.user,
            nickName,
            vegType,
            profileblob,
            email
        }
      });
    // case USER_UPDATE_INFO:
    //  const {vegType,profileblob, password} = action.payload
    //   return Object.assign({}, state, {
    //     user: {
    //         ...state.user,
    //         vegType,
    //         profileblob,
    //         password
    //     }
    //   });
    case  WITHDRAW:
      return Object.assign({}, state, {
        user: {
            accessToken:"",
            email:"",
            nickName: "",
            vegType: "vegetarian",
            password: null,
            profileblob: ""
        }
      });
    default:
      return state;
  }
};

export default userInfoReducer;
