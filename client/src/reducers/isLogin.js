import { ISLOGIN } from "../actions/index";

const initialState = {
  isLogin: false,
  email: null,
  nickname: null,
  acessToken: "",
};

export default function isLogin(state = initialState, action) {
  switch (action.type) {
    case ISLOGIN:
      return {
        ...state,
        ...action.payload.data,
      };
    default: {
      return state;
    }
  }
}
