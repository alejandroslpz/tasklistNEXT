import { ELEGIR_DASHBOARD } from "../../types";

export default (state, action) => {
  switch (action.type) {
    case ELEGIR_DASHBOARD:
      return {
        ...state,
        dashboard: action.payload,
      };
    default:
      return state;
  }
};
