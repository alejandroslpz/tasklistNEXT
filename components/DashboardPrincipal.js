import React from "react";
import Resumen from "../components/Resumen";

const DashboardPrincipal = () => {
  return (
    <>
      <h1 className="title is-1 has-text-centered my-6">Dashboard</h1>
      <div className="columns">
        <div className="column is-6"></div>
        <div className="column is-6"></div>
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
