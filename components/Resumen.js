import React from "react";
import { useQuery, gql } from "@apollo/client";
// import GraficaResumen from "./ui/GraficaResumen";

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

const OBTENER_USUARIO = gql`
  query obtenerUsuario {
    obtenerUsuario {
      id
      nombre
      email
      creado
    }
  }
`;

const Resumen = () => {
  // Consultar query de proyectos por usuario
  const {
    data: dataProyectos,
    loading: loadingProyectos,
    error: errorProyectos,
  } = useQuery(OBTENER_PROYECTOS_USUARIO);

  const {
    data: dataTareas,
    loading: loadingTareas,
    error: errorTareas,
  } = useQuery(OBTENER_TAREAS_USUARIO);

  // consultar usuario desde backend
  const {
    data: dataUsuario,
    loading: loadingUsuario,
    error: errorUsuario,
  } = useQuery(OBTENER_USUARIO, {
    fetchPolicy: "cache-and-network",
  });

  if (loadingProyectos) {
    return "Cargando...";
  }

  if (loadingTareas) {
    return "Cargando...";
  }

  if (loadingUsuario) {
    return "Cargando...";
  }

  console.log(dataUsuario);

  const cantidadProyectos = dataProyectos.obtenerProyectosUsuario.length;
  const cantidadTareas = dataTareas.obtenerTareasUsuario.length;

  // Separar tareas pendientes y completados
  const tareasPendientes = dataTareas.obtenerTareasUsuario.filter(
    (tarea) => tarea.estado === "PENDIENTE"
  ).length;
  const tareasCompletados = dataTareas.obtenerTareasUsuario.filter(
    (tarea) => tarea.estado === "COMPLETADO"
  ).length;

  const fecha = new Date(dataUsuario.obtenerUsuario.creado);
  const fechaCreado = fecha.toLocaleDateString("es-ES");

  return (
    <>
      <div className="columns">
        {/* <div className="column">
          <GraficaResumen />
        </div> */}
        <div className="column has-text-centered">
          <h2 className="title is-3 has-text-centered">
            ¡Bienvenido {dataUsuario.obtenerUsuario.nombre}!
          </h2>
          <p className="pt-6">Correo: {dataUsuario.obtenerUsuario.email}</p>
          <p className="py-2">Fecha de registro: {fechaCreado}</p>
        </div>
      </div>
      <div className="box mt-6">
        <nav className="level">
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Proyectos</p>
              <p className="title">{cantidadProyectos}</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Tareas</p>
              <p className="title">{cantidadTareas}</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Tareas Completadas</p>
              <p className="title">{tareasCompletados}</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Tareas Pendientes</p>
              <p className="title">{tareasPendientes}</p>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Resumen;
