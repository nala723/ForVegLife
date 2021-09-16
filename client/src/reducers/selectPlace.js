import { SELECTPLACE } from "../actions/index";
import { initialState } from './initialState';


export default function selectPlace(state = initialState, action) {
  switch (action.type) {
    case SELECTPLACE:
      return Object.assign({}, state, {
       selectplace : {
        ...state.selectplace,
        ...action.payload.data,
      }
    })
    default: {
      return state;
    }
  }
}
