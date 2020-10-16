import React from "react";
import { useQuery, gql } from "@apollo/client";
import Cometario from "./Comentario";

const OBTENER_COMENTARIOS = gql`
  query obtenerComentariosTarea($id: ID!) {
    obtenerComentariosTarea(id: $id) {
      id
      contenido
      tarea
      usuario
      creado
    }
  }
`;

const ListaComentarios = (tarea) => {
  const { data, loading, error } = useQuery(OBTENER_COMENTARIOS, {
    variables: {
      id: tarea.tareaseleccionada.id,
    },
  });

  if (loading) {
    return "Cargando...";
  }

  const comentarios = data.obtenerComentariosTarea;

  return (
    <div>
      {comentarios.map((comentario) => (
        <Cometario key={comentario.id} comentario={comentario} />
      ))}
    </div>
  );
};

export default ListaComentarios;
