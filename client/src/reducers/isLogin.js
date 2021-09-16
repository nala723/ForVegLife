import { ISLOGIN } from "../actions/index";
import { initialState } from './initialState';


export default function isLogin(state = initialState, action) {
  switch (action.type) {
    case ISLOGIN:
      return Object.assign({}, state, {
      user: {
        ...state.user,
        ...action.payload.data,
      }
    })
    default: {
      return state;
    }
  }
}
