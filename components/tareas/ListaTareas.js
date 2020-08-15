import React from "react";
import Tarea from "./Tarea";
import { useQuery, gql } from "@apollo/client";

const OBTENER_TAREAS_USUARIO = gql`
  query obtenerTareasUsuario {
    obtenerTareasUsuario {
      id
      nombre
      descripcion
      proyecto
      usuario
      estado
    }
  }
`;

const ListaTareas = () => {
  return (
    <div className="container">
      <div className="columns is-multiline">
        {/* {data.obtenerProyectosUsuario.map((tarea) => (
          <Tarea key={tarea.id} tarea={tarea} />
        ))} */}
      </div>
    </div>
  );
};

export default ListaTareas;
