import {
  ELEGIR_DASHBOARD,
  ASIGNAR_PROYECTO,
  CREAR_TAREA,
  CREAR_PROYECTO,
} from "../../types";

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

    case CREAR_TAREA:
      return {
        ...state,
        paneltarea: action.payload,
      };

    case CREAR_PROYECTO:
      return {
        ...state,
        panelproyecto: action.payload,
      };

    default:
      return state;
  }
};
