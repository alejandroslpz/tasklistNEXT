import React, { useContext } from "react";
import TareasProyecto from "./TareasProyecto";
import appContext from "../../context/app/appContext";
import { useQuery, gql } from "@apollo/client";
import { useUsuario } from "../../hooks/useNombre";

const OBTENER_TAREAS_PROYECTO = gql`
  query obtenerTareasProyecto($id: ID!) {
    obtenerTareasProyecto(id: $id) {
      id
      nombre
      descripcion
      proyecto
      usuario
      estado
    }
  }
`;

const ProyectoInfo = () => {
  // Context para leer el proyecto seleccionado
  const AppContext = useContext(appContext);
  // Consultar tareas del proyecto
  const { data, loading } = useQuery(OBTENER_TAREAS_PROYECTO, {
    variables: {
      id: AppContext.proyectoseleccionado.id,
    },
  });
  // Obtener nombre del usuario con id
  const responsable = useUsuario(AppContext.proyectoseleccionado.usuario);

  const { nombreUsuario } = responsable;
  const { proyectoseleccionado } = AppContext;
  const { nombre, descripcion, estado } = proyectoseleccionado;

  if (loading) {
    return null;
  }

  const tareas = data.obtenerTareasProyecto;

  return (
    <>
      <div className="columns is-centered mt-6 animate__animated animate__slideInRight">
        <div className="column is-6">
          <div className="box">
            <h4 className="title is-4 has-text-centered">{nombre}</h4>
            <div className="content">
              <p>Responsable: {nombreUsuario}</p>
              <p>{descripcion}</p>
            </div>
            <div className="buttons are-small has-addons is-right">
              <button
                className={`button ${
                  estado === "COMPLETADO" ? "is-success is-selected" : null
                }`}
              >
                Completado
              </button>
              <button
                className={`button ${
                  estado === "PENDIENTE" ? "is-danger is-selected" : null
                }`}
              >
                Pendiente
              </button>
            </div>
          </div>
        </div>
      </div>
      <TareasProyecto tareas={tareas} />
    </>
  );
};

export default ProyectoInfo;
