import React, { useContext } from "react";
import CrearProyecto from "./CrearProyecto";
import ListaProyectos from "./ListaProyectos";
import appContext from "../../context/app/appContext";

const DashboardProyectos = () => {
  // Context para panel de creación de proyectos
  const AppContext = useContext(appContext);

  const { panelproyecto, setPanelProyecto } = AppContext;

  return (
    <>
      {panelproyecto ? (
        <CrearProyecto />
      ) : (
        <>
          <h1 className="title is-1 has-text-centered my-6">Proyectos</h1>
          <div className="container mx-4">
            <button
              className="button is-info mb-6"
              onClick={() => setPanelProyecto(true)}
            >
              Crear Proyecto
            </button>
            <ListaProyectos />
          </div>
        </>
      )}
    </>
  );
};

export default DashboardProyectos;
