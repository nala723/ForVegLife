import {
  GET_MY_REVIEW,
  GET_MY_FAVORITE,
} from '../actions/index';
const initialState = {
  userFavorite : [],
  userStar : [], //미완
  
  myplace:{
    placeId: null,
    title : "",
    content: "",
    star: null,
    createdAt: null,
    reviewId: null,
    address:"",
    pictureUrl: ""   

  } 
} // 여러개의 카드, 장소,, 더 묶어야할듯?


const myPlaceReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MY_REVIEW:
      return Object.assign({}, state, {
       myplace: action.payload.data
       
      });
    case GET_MY_FAVORITE:
    return Object.assign({}, state, {
       myplace: action.payload.data
      });
    default:
      return state;
  }
};

export default myPlaceReducer;
