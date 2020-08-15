import { ELEGIR_DASHBOARD, ASIGNAR_PROYECTO } from "../../types";

export default (state, action) => {
  switch (action.type) {
    case ELEGIR_DASHBOARD:
      return {
        ...state,
        dashboard: action.payload,
      };

    case ASIGNAR_PROYECTO:
      return {
        ...state,
        proyecto: action.payload,
      };
    default:
      return state;
  }
};
