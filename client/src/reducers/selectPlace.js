import { SELECTPLACE } from "../actions/index";

const initialState = {
    x:0,
    y:0,
};

export default function selectPlace(state = initialState, action) {
  switch (action.type) {
    case SELECTPLACE:
      return {
        ...state,
        ...action.payload.data,
      };
    default: {
      return state;
    }
  }
}
