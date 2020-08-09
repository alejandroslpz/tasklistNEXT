import { USUARIO_LOGIN } from "../../types";

export default (state, action) => {
  switch (action.type) {
    case USUARIO_LOGIN:
      return {
        ...state,
        autenticado: action.payload,
      };

    default:
      return state;
  }
};
