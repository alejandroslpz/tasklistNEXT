import React, { useContext } from "react";
import appContext from "../../context/app/appContext";
import { useProyecto } from "../../hooks/useNombre";
import ListaComentarios from "../comentarios/ListaComentarios";
import Swal from "sweetalert2";
import { gql, useMutation } from "@apollo/client";
import CrearComentario from "../comentarios/CrearComentario";

const EDITAR_TAREA = gql`
  mutation editarTarea($id: ID!, $input: TareaInput) {
    editarTarea(id: $id, input: $input) {
      nombre
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

const TareaInfo = () => {
  const Appcontext = useContext(appContext);
  // Hook para sacar nombre del proyecto mandando una ID
  const NombreProyecto = useProyecto(Appcontext.tareaseleccionada.proyecto);

  // Mutation para editar el proyecto
  const [editarTarea] = useMutation(EDITAR_TAREA, {
    update(cache, { data: { editarTarea } }) {
      // Obtener el objeto de cache que deseamos actualizar
      const { obtenerTareasUsuario } = cache.readQuery({
        query: OBTENER_TAREAS_USUARIO,
      });

      // Sobreescribir el cache
      cache.writeQuery({
        query: OBTENER_TAREAS_USUARIO,
        data: {
          obtenerTareasUsuario: [...obtenerTareasUsuario, editarTarea],
        },
      });
    },
  });

  const { tareaseleccionada, setPanelTarea } = Appcontext;
  const { descripcion, estado, nombre } = tareaseleccionada;

  const actualizarInfoTarea = async (estado, tarea) => {
    if (estado === "PENDIENTE") {
      try {
        await editarTarea({
          variables: {
            id: tarea.id,
            input: {
              nombre: tarea.nombre,
              descripcion: tarea.descripcion,
              proyecto: tarea.proyecto,
              usuario: tarea.usuario,
              estado: "COMPLETADO",
            },
          },
        });
        setPanelTarea(null);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await editarTarea({
          variables: {
            id: tarea.id,
            input: {
              nombre: tarea.nombre,
              descripcion: tarea.descripcion,
              proyecto: tarea.proyecto,
              usuario: tarea.usuario,
              estado: "PENDIENTE",
            },
          },
        });

        setPanelTarea(null);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const validacion = (estado, tareaseleccionada) => {
    if (estado === "PENDIENTE") {
      Swal.fire({
        title: "Completar tarea",
        text: "¿Deseas continuar?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, tarea finalizada",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("¡Exito!", "Se ha completado la tarea", "success");
          actualizarInfoTarea(estado, tareaseleccionada);
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
            "Se ha puesto como pendiente la tarea",
            "success"
          );
          actualizarInfoTarea(estado, tareaseleccionada);
        }
      });
    }
  };

  return (
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
              onClick={() => validacion(estado, tareaseleccionada)}
            >
              Completado
            </button>
            <button
              className={`button ${
                estado === "PENDIENTE" && "is-danger is-selected"
              }`}
              disabled={estado === "PENDIENTE" && true}
              onClick={() => validacion(estado, tareaseleccionada)}
            >
              Pendiente
            </button>
          </div>
          <div className="content">
            <p>{descripcion}</p>
            <p>Proyecto: {NombreProyecto}</p>
            <p>Comentarios de la tarea:</p>
            <ListaComentarios tareaseleccionada={tareaseleccionada} />
          </div>
          <CrearComentario tareaseleccionada={tareaseleccionada} />
        </div>
      </div>
    </div>
  );
};

export default TareaInfo;
