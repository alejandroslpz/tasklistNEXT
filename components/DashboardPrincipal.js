import React from "react";
import Tarea from "../components/Tarea";
import Resumen from "../components/Resumen";

const DashboardPrincipal = () => {
  return (
    <>
      <h1 className="title is-1 has-text-centered my-6">Dashboard</h1>
      <div className="columns">
        <div className="column is-6">
          <Tarea />
        </div>
        <div className="column is-6">
          <Tarea />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <Resumen />
        </div>
      </div>
    </>
  );
};

export default DashboardPrincipal;
