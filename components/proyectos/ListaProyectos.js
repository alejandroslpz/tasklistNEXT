import React from "react";
import Proyecto from "./Proyecto";
import { useQuery, gql } from "@apollo/client";

const OBTENER_PROYECTOS_USUARIO = gql`
  query obtenerProyectosUsuario {
    obtenerProyectosUsuario {
      id
      nombre
      descripcion
      usuario
      creado
      estado
    }
  }
`;

const ListaProyectos = () => {
  // Consultar query de proyectos por usuario
  const { data, loading, error } = useQuery(OBTENER_PROYECTOS_USUARIO);

  if (loading) {
    return null;
  }

  return (
    <div className="container">
      <div className="columns is-multiline">
        {data.obtenerProyectosUsuario.map((proyecto) => (
          <Proyecto key={proyecto.id} proyecto={proyecto} />
        ))}
      </div>
    </div>
  );
};

export default ListaProyectos;
