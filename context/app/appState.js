import React, { useReducer } from "react";
import appContext from "./appContext";
import appReducer from "./appReducer";
import {
  ELEGIR_DASHBOARD,
  ASIGNAR_PROYECTO,
  CREAR_TAREA,
  CREAR_PROYECTO,
  SELECCIONAR_PROYECTO_INFO,
} from "../../types";

const AppState = ({ children }) => {
  const initialstate = {
    dashboard: "inicio",
    proyecto: "",
    paneltarea: false,
    panelproyecto: null,
    proyectoseleccionado: {},
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

  const setPanelTarea = (accion) => {
    dispatch({
      type: CREAR_TAREA,
      payload: accion,
    });
  };

  const setPanelProyecto = (accion) => {
    dispatch({
      type: CREAR_PROYECTO,
      payload: accion,
    });
  };

  const setProyectoSeleccionado = (proyecto) => {
    dispatch({
      type: SELECCIONAR_PROYECTO_INFO,
      payload: proyecto,
    });
  };

  return (
    <appContext.Provider
      value={{
        dashboard: state.dashboard,
        paneltarea: state.paneltarea,
        panelproyecto: state.panelproyecto,
        proyectoseleccionado: state.proyectoseleccionado,
        asignarProyecto,
        elegirDashboard,
        setPanelTarea,
        setPanelProyecto,
        setProyectoSeleccionado,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export default AppState;
