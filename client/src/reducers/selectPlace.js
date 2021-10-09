import { SELECTPLACE } from "../actions/index";

const initialState = {
  x: 0,
  y: 0,
  id: 0,
  name: "",
};

export default function selectPlace(state = initialState, action) {
  switch (action.type) {
    case SELECTPLACE:
      return Object.assign({}, state, {
        ...state.selectplace,
        ...action.payload.data,
      });
    default: {
      return state;
    }
  }
}