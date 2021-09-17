import { persistReducer} from 'redux-persist';
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";// local storage에 저장
import MapCenter from "./MapCenter";
import selectPlace from "./selectPlace";
import userReducer from './userReducer';
import myPlaceReducer from "./myPlaceReducer";

const persistConfig = {
	key: "root",
	// localStorage에 저장합니다.
	storage: storage,
  
	whitelist: [     //----->여러 reducer 중 이것만 저장
    "userReducer",
  ],
	// blacklist -> 그것만 제외합니다
};

const rootReducer = combineReducers({
  userReducer,
  MapCenter,
  selectPlace,
  myPlaceReducer

});

export default persistReducer(persistConfig, rootReducer);
