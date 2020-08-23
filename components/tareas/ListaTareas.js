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
  const { data, loading, error } = useQuery(OBTENER_TAREAS_USUARIO);

  if (loading) {
    return null;
  }

  // Separar tareas pendientes y completados
  const pendientes = data.obtenerTareasUsuario.filter(
    (tarea) => tarea.estado === "PENDIENTE"
  );
  const completados = data.obtenerTareasUsuario.filter(
    (tarea) => tarea.estado === "COMPLETADO"
  );

  return (
    <>
      {data.obtenerTareasUsuario.length === 0 ? (
        <div className="container">
          <h4 className="title is-6 has-text-centered">
            No hay tareas asignadas
          </h4>
        </div>
      ) : (
        <>
          <h3 className="title is-3">En progreso</h3>
          {pendientes.length === 0 ? (
            <h4 className="title is-6 has-text-centered py-6">
              No hay tareas pendientes
            </h4>
          ) : (
            <div className="columns is-multiline">
              {pendientes.map((tarea) => (
                <Tarea key={tarea.id} tarea={tarea} />
              ))}
            </div>
          )}

          {completados.length !== 0 && (
            <>
              <h3 className="title is-3">Completadas</h3>
              <div className="columns is-multiline">
                {completados.map((tarea) => (
                  <Tarea key={tarea.id} tarea={tarea} />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default ListaTareas;
