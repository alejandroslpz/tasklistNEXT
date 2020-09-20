import React, { useContext } from "react";
import appContext from "../../context/app/appContext";
import { useProyecto } from "../../hooks/useNombre";
import ComentarioTarea from "./ComentarioTarea";
import Swal from "sweetalert2";

const TareaInfo = () => {
  const Appcontext = useContext(appContext);
  // Hook para sacar nombre del proyecto mandando una ID
  const NombreProyecto = useProyecto(Appcontext.tareaseleccionada.proyecto);
  const { tareaseleccionada } = Appcontext;
  const { descripcion, estado, nombre } = tareaseleccionada;

  const validacion = (estado) => {
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
        }
      });
    }
  };

  return (
    <div className="columns is-centered mt-6 animate__animated animate__slideInRight">
      <div className="column is-6">
        <div className="box">
          <h4 className="title is-4 has-text-centered">{nombre}</h4>
          <div className="buttons has-addons are-small is-pulled-right">
            <button
              className={`button ${
                estado === "COMPLETADO" && "is-success is-selected"
              }`}
              disabled={estado === "COMPLETADO" && true}
              onClick={() => validacion(estado)}
            >
              Completado
            </button>
            <button
              className={`button ${
                estado === "PENDIENTE" && "is-danger is-selected"
              }`}
              disabled={estado === "PENDIENTE" && true}
              onClick={() => validacion(estado)}
            >
              Pendiente
            </button>
          </div>
          <div className="content">
            <p>{descripcion}</p>
            <p>Proyecto: {NombreProyecto}</p>
            <p>Comentarios de la tarea:</p>
            <ComentarioTarea />
          </div>
          <div className="media-content">
            <div className="field">
              <p className="control">
                <textarea
                  className="textarea"
                  placeholder="Agregar comentario"
                ></textarea>
              </p>
            </div>
          </div>
          <div className="level-left mt-3">
            <div className="level-item">
              <a className="button is-info">Enviar</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TareaInfo;
