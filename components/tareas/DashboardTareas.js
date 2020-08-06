import React from "react";
import CrearTarea from "./CrearTarea";
import ListaTareas from "./ListaTareas";

const DashboardTares = () => {
  return (
    <>
      <h1 className="title is-1 has-text-centered my-6">Tareas</h1>
      <div className="columns">
        <div className="column is-3">
          <CrearTarea />
        </div>
        <div className="column">
          <ListaTareas />
        </div>
      </div>
    </>
  );
};

export default DashboardTares;
