import React, { useReducer } from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";
import { USUARIO_LOGIN } from "../../types";

const AuthState = ({ children }) => {
  // State inicial para autentificación
  const initialState = {
    token: "",
    autenticado: null,
  };

  //   Conectar state inicial con reducer
  const [state, dispatch] = useReducer(authReducer, initialState);

  const usuarioLogin = (valor) => {
    dispatch({
      type: USUARIO_LOGIN,
      payload: valor,
    });
  };

  return (
    <authContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuarioLogin,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthState;
