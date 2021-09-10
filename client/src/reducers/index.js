import { combineReducers } from "redux";
import isLogin from "./isLogin";
import MapCenter from "./MapCenter";

const rootReducer = combineReducers({
  isLogin,
  MapCenter,
});

export default rootReducer;
