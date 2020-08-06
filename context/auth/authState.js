import React, { useReducer } from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";
import { REGISTRO_EXITOSO, REGISTRO_ERROR } from "../../types";

const AuthState = ({ children }) => {
  // State inicial para autentificación
  const initialState = {
    token: "",
    autenticado: null,
    usuario: null,
    mensaje: null,
  };

  //   Conectar state inicial con reducer
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <authContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthState;
