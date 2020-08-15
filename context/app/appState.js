import React, { useReducer } from "react";
import appContext from "./appContext";
import appReducer from "./appReducer";
import { ELEGIR_DASHBOARD, ASIGNAR_PROYECTO } from "../../types";

const AppState = ({ children }) => {
  const initialstate = {
    dashboard: "inicio",
    proyecto: "",
  };

  // Conextar el reducer
  const [state, dispatch] = useReducer(appReducer, initialstate);

  const elegirDashboard = (dashboard) => {
    dispatch({
      type: ELEGIR_DASHBOARD,
      payload: dashboard,
    });
  };

  const asignarProyecto = (proyecto) => {
    dispatch({
      type: ASIGNAR_PROYECTO,
      payload: proyecto,
    });
  };

  return (
    <appContext.Provider
      value={{
        dashboard: state.dashboard,
        asignarProyecto,
        elegirDashboard,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export default AppState;
