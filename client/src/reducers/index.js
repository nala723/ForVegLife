import { persistReducer} from 'redux-persist';
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";// local storage에 저장
import isLogin from "./isLogin";
import MapCenter from "./MapCenter";
import  selectPlace from "./selectPlace";
import userInfoReducer from "./userInfoReducer";
import myPlaceReducer from "./userInfoReducer";

const persistConfig = {
	key: "root",
	// localStorage에 저장합니다.
	storage,
  
	whitelist: [     //----->이것만 저장
    "userInfoReducer",
    "isLogin",
  ],
	// blacklist -> 그것만 제외합니다
};

const rootReducer = combineReducers({
  isLogin,
  MapCenter,
  selectPlace,
  userInfoReducer,
  myPlaceReducer

});

export default persistReducer(persistConfig, rootReducer);
