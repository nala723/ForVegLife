import { MAPCENTER } from "../actions/index";
import { initialState } from './initialState';


export default function MapCenter(state = initialState, action) {
  switch (action.type) {
    case MAPCENTER:
      return Object.assign({}, state, {
      map:{
        ...state.map,
        ...action.payload.data,
      }
    });
    default: {
      return state;
    }
  }
}
