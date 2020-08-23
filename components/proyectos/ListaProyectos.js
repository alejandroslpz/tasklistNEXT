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
    return "Cargando...";
  }

  // Separar proyectos pendientes y completados
  const pendientes = data.obtenerProyectosUsuario.filter(
    (proyecto) => proyecto.estado === "PENDIENTE"
  );
  const completados = data.obtenerProyectosUsuario.filter(
    (proyecto) => proyecto.estado === "COMPLETADO"
  );

  return (
    <>
      {data.obtenerProyectosUsuario.length === 0 ? (
        <div className="container">
          <h4 className="title is-6 has-text-centered">No hay proyectos</h4>
        </div>
      ) : (
        <>
          <h3 className="title is-3">En progreso</h3>
          {pendientes.length === 0 ? (
            <h4 className="title is-6 has-text-centered py-6">
              No hay proyectos pendientes
            </h4>
          ) : (
            <div className="columns is-multiline">
              {pendientes.map((proyecto) => (
                <Proyecto key={proyecto.id} proyecto={proyecto} />
              ))}
            </div>
          )}

          {completados.length !== 0 && (
            <>
              <h3 className="title is-3">Completados</h3>
              <div className="columns is-multiline">
                {completados.map((proyecto) => (
                  <Proyecto key={proyecto.id} proyecto={proyecto} />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default ListaProyectos;
