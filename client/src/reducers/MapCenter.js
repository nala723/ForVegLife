import { MAPCENTER } from "../actions/index";

const initialState = {
  x: 0,
  y: 0,
  address: ""
};

export default function MapCenter(state = initialState, action) {
  switch (action.type) {
    case MAPCENTER:
      return {
        ...state,
        ...action.payload.data,
      };
    default: {
      return state;
    }
  }
}
