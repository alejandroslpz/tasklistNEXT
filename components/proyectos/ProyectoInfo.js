import React, { useContext, useEffect } from "react";
import TareasProyecto from "./TareasProyecto";
import appContext from "../../context/app/appContext";
import { useMutation, useQuery, gql } from "@apollo/client";
import { useUsuario } from "../../hooks/useNombre";
import Swal from "sweetalert2";

const EDITAR_PROYECTO = gql`
  mutation editarProyecto($id: ID!, $input: ProyectoInput) {
    editarProyecto(id: $id, input: $input) {
      nombre
    }
  }
`;

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
  const { data, loading, startPolling, stopPolling } = useQuery(
    OBTENER_TAREAS_PROYECTO,
    {
      variables: {
        id: AppContext.proyectoseleccionado.id,
      },
    }
  );

  useEffect(() => {
    startPolling(1000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  // Obtener nombre del usuario con id
  const responsable = useUsuario(AppContext.proyectoseleccionado.usuario);
  // Mutarion para actualizar proyecto
  const [editarProyecto] = useMutation(EDITAR_PROYECTO, {
    update(cache, { data: { editarProyecto } }) {
      // Obtener el objeto de cache que deseamos actualizar
      const { obtenerProyectosUsuario } = cache.readQuery({
        query: OBTENER_PROYECTOS_USUARIO,
      });

      // Sobreescribir el cache
      cache.writeQuery({
        query: OBTENER_PROYECTOS_USUARIO,
        data: {
          obtenerProyectosUsuario: [...obtenerProyectosUsuario, editarProyecto],
        },
      });
    },
  });

  const { nombreUsuario } = responsable;
  const { proyectoseleccionado, setPanelProyecto } = AppContext;
  const { nombre, descripcion, estado } = proyectoseleccionado;

  if (loading) {
    return null;
  }
  const tareas = data.obtenerTareasProyecto;

  const actualizarInfoProyecto = async (estado, proyecto) => {
    if (estado === "PENDIENTE") {
      try {
        await editarProyecto({
          variables: {
            id: proyecto.id,
            input: {
              nombre: proyecto.nombre,
              descripcion: proyecto.descripcion,
              estado: "COMPLETADO",
            },
          },
        });

        setPanelProyecto(null);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await editarProyecto({
          variables: {
            id: proyecto.id,
            input: {
              nombre: proyecto.nombre,
              descripcion: proyecto.descripcion,
              estado: "PENDIENTE",
            },
          },
        });

        setPanelProyecto(null);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const validacion = (estado, proyectoseleccionado) => {
    if (estado === "PENDIENTE") {
      Swal.fire({
        title: "Completar proyecto",
        text: "¿Deseas continuar?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, finalizar proyecto",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("¡Exito!", "Se ha completado el proyecto", "success");
          actualizarInfoProyecto(estado, proyectoseleccionado);
        }
      });
    } else {
      Swal.fire({
        title: "Marcar como pendiente",
        text: "¿Deseas continuar?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, aun no se ha finalizado",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            "¡Exito!",
            "Se ha puesto como pendiente el proyecto",
            "success"
          );
          actualizarInfoProyecto(estado, proyectoseleccionado);
        }
      });
    }
  };

  return (
    <>
      <div className="columns is-centered mt-6 animate__animated animate__slideInRight mx-1">
        <div className="column is-6">
          <div className="box">
            <h4 className="title is-4 has-text-centered">{nombre}</h4>
            <div className="buttons has-addons are-small is-pulled-right">
              <button
                className={`button ${
                  estado === "COMPLETADO" && "is-success is-selected"
                }`}
                disabled={estado === "COMPLETADO" && true}
                onClick={() => validacion(estado, proyectoseleccionado)}
              >
                Completado
              </button>
              <button
                className={`button ${
                  estado === "PENDIENTE" && "is-danger is-selected"
                }`}
                disabled={estado === "PENDIENTE" && true}
                onClick={() => validacion(estado, proyectoseleccionado)}
              >
                Pendiente
              </button>
            </div>
            <div className="content">
              <p>Responsable: {nombreUsuario}</p>
              <p>{descripcion}</p>
            </div>
          </div>
        </div>
      </div>
      <TareasProyecto tareas={tareas} />
    </>
  );
};

export default ProyectoInfo;
