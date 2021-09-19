import {
   GET_GOOGLE_TOKEN
  } from '../actions/index';
  
  const initialState = {
    googleToken : ""
  }
  
  const googleReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_GOOGLE_TOKEN:
        return Object.assign({}, state, {
          ...state,
          ...action.payload.data,
      });
    default:
      return state;
  }
  };
  
  export default googleReducer;