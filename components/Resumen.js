import React from "react";

const Resumen = () => {
  return (
    <div className="box">
      <nav className="level">
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">Proyectos</p>
            <p className="title">3,456</p>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">Tareas</p>
            <p className="title">3,456</p>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">Tareas Completadas</p>
            <p className="title">456K</p>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">Tareas Pendientes</p>
            <p className="title">789</p>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Resumen;
