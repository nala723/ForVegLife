import { combineReducers } from "redux";
import isLogin from "./isLogin";
import MapCenter from "./MapCenter";
import  selectPlace from "./selectPlace";
import userInfoReducer from "./userInfoReducer";
import myPlaceReducer from "./userInfoReducer";

const rootReducer = combineReducers({
  isLogin,
  MapCenter,
  selectPlace,
  userInfoReducer,
  myPlaceReducer

});

export default rootReducer;
