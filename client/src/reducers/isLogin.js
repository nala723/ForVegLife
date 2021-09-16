import { ISLOGIN } from "../actions/index";
import { initialState } from './initialState';


export default function isLogin(state = initialState.user, action) {
  switch (action.type) {
    case ISLOGIN:
      return Object.assign({}, state, {
        ...state.user,
        ...action.payload.data,
    })
    default: {
      return state;
    }
  }
}
