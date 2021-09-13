import {
    GET_MY_REVIEW,
    GET_MY_FAVORITE,
} from '../actions/index';
import { initialState } from './initialState';

const myPlaceReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_MY_REVIEW:
        const {placeId,title,content,star,createdAt,reviewId} = action.payload
        return Object.assign({}, state, {
         reivew : {
            placeId,
            title,
            content,
            star,
            createdAt,
            reviewId  
         }
        });
      case GET_MY_FAVORITE:
       const {placeId,title,pictureUrl,address} = action.payload
        return Object.assign({}, state, {
          favorite: {
              placeId,
              title,
              pictureUrl,
              address
          }
        });
      default:
        return state;
    }
  };
  
  export default myPlaceReducer;
  