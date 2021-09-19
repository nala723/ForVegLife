import {
  GET_MY_REVIEW,
  GET_MY_FAVORITE,
  DELETE_MY_FAVORITE,
} from '../actions/index';
const initialState = {
   myFavPlaces : [],
   myReviews : []
    // placeId: null,
    // title : "",
    // content: "",
    // star: null,
    // createdAt: null,
    // reviewId: null,
    // address:"",
    // pictureUrl: ""   

}


const myPlaceReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MY_REVIEW:
      return Object.assign({}, state, {
        myFavPlaces : action.payload.data
       
      });
    case DELETE_MY_FAVORITE:
      return Object.assign({}, state, {
        myFavPlaces : state.myFavPlaces.filter((el)=> el.placeId !== action.payload.id)
      })
    case GET_MY_FAVORITE:
    return Object.assign({}, state, {
       myReviews : action.payload.data
      });
    default:
      return state;
  }
};

export default myPlaceReducer;
