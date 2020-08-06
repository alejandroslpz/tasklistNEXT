import React from "react";
import CrearProyecto from "./CrearProyecto";
import ListaProyectos from "./ListaProyectos";

const DashboardProyectos = () => {
  return (
    <>
      <h1 className="title is-1 has-text-centered my-6">Proyectos</h1>
      <div className="columns">
        <div className="column is-3">
          <CrearProyecto />
        </div>
        <div className="column">
          <ListaProyectos />
        </div>
      </div>
    </>
  );
};

export default DashboardProyectos;
