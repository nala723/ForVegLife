import {
    GET_MY_REVIEW,
    GET_MY_FAVORITE,
} from '../actions/index';
import { initialState } from './initialState';

const myPlaceReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_MY_REVIEW:
        return Object.assign({}, state.review, {
          ...state.review,
        ...action.payload
         
        });
      case GET_MY_FAVORITE:
      return Object.assign({}, state.favorite, {
        ...state.favorite,
        ...action.payload
        });
      default:
        return state;
    }
  };
  
  export default myPlaceReducer;
  