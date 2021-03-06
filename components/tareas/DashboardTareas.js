import React, { useContext } from "react";
import CrearTarea from "./CrearTarea";
import ListaTareas from "./ListaTareas";
import appContext from "../../context/app/appContext";
import TareaInfo from "./TareaInfo";

const DashboardTareas = () => {
  const AppContext = useContext(appContext);

  const { paneltarea, setPanelTarea } = AppContext;

  return (
    <>
      {paneltarea === "Crear" ? (
        <CrearTarea />
      ) : (
        <>
          {paneltarea === "Tarea" ? (
            <TareaInfo />
          ) : (
            <>
              <h1 className="title is-1 has-text-centered my-6">Tareas</h1>
              <div className="container mx-4">
                <button
                  className="button is-info mb-6"
                  onClick={() => setPanelTarea("Crear")}
                >
                  Crear Tarea
                </button>
                <ListaTareas />
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default DashboardTareas;
