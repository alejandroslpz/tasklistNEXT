import React, { useState, useContext } from "react";
import * as Yup from "yup";
import Select from "react-select";
import { Formik } from "formik";
import { useQuery, gql, useMutation } from "@apollo/client";
import appContext from "../../context/app/appContext";

// Comentarios

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

const OBTENER_USUARIOS = gql`
  query obtenerUsuarios {
    obtenerUsuarios {
      id
      nombre
    }
  }
`;

const NUEVA_TAREA = gql`
  mutation nuevaTarea($input: TareaInput) {
    nuevaTarea(input: $input) {
      id
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

const CrearTarea = () => {
  // Context para panel de creación de tareas

  const AppContext = useContext(appContext);

  const { setPanelTarea } = AppContext;
  // State para elegir proyecto
  const [proyecto, setProyecto] = useState("");

  // State para elegir usuario
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState("");

  // Mutation para crear tareas
  const [nuevaTarea] = useMutation(NUEVA_TAREA, {
    update(cache, { data: nuevaTarea }) {
      // Obtener el objeto del cache que queremos actualizar

      const { obtenerTareasUsuario } = cache.readQuery({
        query: OBTENER_TAREAS_USUARIO,
      });

      // Sobreescribir el cache

      cache.writeQuery({
        query: OBTENER_TAREAS_USUARIO,
        data: {
          obtenerTareasUsuario: [...obtenerTareasUsuario, nuevaTarea],
        },
      });
    },
  });

  // Query para obtener los usuarios

  const {
    data: dataUsuarios,
    loading: loadingUsuarios,
    error: errorUsuarios,
  } = useQuery(OBTENER_USUARIOS);

  // Query de obtención de proyectos de usuario
  const { data, loading, error } = useQuery(OBTENER_PROYECTOS_USUARIO);

  if (loadingUsuarios) {
    return null;
  }

  if (loading) {
    return null;
  }

  const { obtenerUsuarios } = dataUsuarios;
  const { obtenerProyectosUsuario } = data;

  const initialValues = {
    nombreTarea: "",
    descripcion: "",
    proyectoId: "",
    usuarioId: "",
  };

  const validationSchema = Yup.object({
    nombreTarea: Yup.string().required("El nombre de la tarea es obligatorio"),
    descripcion: Yup.string().required(
      "La descripción de la tarea es obligatoria"
    ),
  });

  const enviarDatos = async (valores) => {
    const { nombreTarea, proyectoId, usuarioId, descripcion } = valores;

    try {
      const { data } = await nuevaTarea({
        variables: {
          input: {
            nombre: nombreTarea,
            descripcion,
            proyecto: proyectoId,
            usuario: usuarioId,
          },
        },
      });

      setTimeout(() => {
        setPanelTarea(false);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="box mt-4">
      <h3 className="title is-4 has-text-centered">Crear Tarea</h3>
      <div className="container">
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={(valores, funciones) => {
            enviarDatos(valores);
          }}
        >
          {(props) => {
            return (
              <form onSubmit={props.handleSubmit}>
                <div className="field">
                  <label className="label">Proyecto</label>
                  <div className="control">
                    <Select
                      options={obtenerProyectosUsuario}
                      onChange={(opcion) => setProyecto(opcion.id)}
                      getOptionValue={(opciones) => opciones.id}
                      getOptionLabel={(opciones) => opciones.nombre}
                      placeholder="Selecciona un proyecto"
                      noOptionsMessage={() => "No hay resultados"}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Usuario</label>
                  <div className="control">
                    <Select
                      options={obtenerUsuarios}
                      onChange={(opcionesUsuario) =>
                        setUsuarioSeleccionado(opcionesUsuario.id)
                      }
                      getOptionValue={(opcionesUsuario) => opcionesUsuario.id}
                      getOptionLabel={(opcionesUsuario) =>
                        opcionesUsuario.nombre
                      }
                      placeholder="Selecciona un usuario"
                      noOptionsMessage={() => "No hay resultados"}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label" htmlFor="nombreTarea">
                    Nombre de la tarea
                  </label>
                  <div className="control">
                    <input
                      id="nombreTarea"
                      type="text"
                      className="input"
                      placeholder="Tarea de ejemplo"
                      value={props.values.nombreTarea}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                  </div>
                </div>
                {props.touched.nombreTarea && props.errors.nombreTarea ? (
                  <div className="notification is-danger my-2">
                    <p>{props.errors.nombreTarea}</p>
                  </div>
                ) : null}
                <div className="field">
                  <label className="label" htmlFor="descripcion">
                    Descripcion
                  </label>
                  <div className="control">
                    <textarea
                      id="descripcion"
                      className="textarea"
                      placeholder="Breve descripción de la tarea "
                      value={props.values.descripcion}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    ></textarea>
                  </div>
                </div>
                {props.touched.descripcion && props.errors.descripcion ? (
                  <div className="notification is-danger my-2">
                    <p>{props.errors.descripcion}</p>
                  </div>
                ) : null}
                <div className="field">
                  <div className="control">
                    <button
                      type="submit"
                      className="button is-primary is-fullwidth mt-3"
                      onClick={() => (
                        (props.values.proyectoId = proyecto),
                        (props.values.usuarioId = usuarioSeleccionado)
                      )}
                    >
                      Crear tarea
                    </button>
                  </div>
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default CrearTarea;
