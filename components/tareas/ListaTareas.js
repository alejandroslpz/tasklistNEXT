import React from "react";
import Tarea from "./Tarea";

const ListaTareas = () => {
  return (
    <div className="container">
      <div className="columns">
        <div className="column is-5 is-offset-1">
          <Tarea />
        </div>
        <div className="column is-5">
          
        </div>
      </div>
    </div>
  );
};

export default ListaTareas;
