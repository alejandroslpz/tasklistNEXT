import React, { useReducer } from "react";
import appContext from "./appContext";
import appReducer from "./appReducer";
import { ELEGIR_DASHBOARD } from "../../types";

const AppState = ({ children }) => {
  const initialstate = {
    dashboard: "inicio",
  };

  // Conextar el reducer
  const [state, dispatch] = useReducer(appReducer, initialstate);

  const elegirDashboard = (dashboard) => {
    dispatch({
      type: ELEGIR_DASHBOARD,
      payload: dashboard,
    });
  };

  return (
    <appContext.Provider
      value={{ dashboard: state.dashboard, elegirDashboard }}
    >
      {children}
    </appContext.Provider>
  );
};

export default AppState;
