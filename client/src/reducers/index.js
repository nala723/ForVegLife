import { combineReducers } from "redux";
import isLogin from "./isLogin";
import MapCenter from "./MapCenter";
import  selectPlace from "./selectPlace";

const rootReducer = combineReducers({
  isLogin,
  MapCenter,
  selectPlace,
});

export default rootReducer;
