import React, { useState } from "react";
import * as Yup from "yup";
import Select from "react-select";
import { Formik } from "formik";
import { useQuery, gql, useMutation } from "@apollo/client";

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
      nombre
    }
  }
`;

const CrearTarea = () => {
  // State para elegir proyecto
  const [proyecto, setProyecto] = useState("");

  // Mutation para crear tareas
  const [nuevaTarea] = useMutation(NUEVA_TAREA);

  // Query para obtener los usuarios

  const {
    data: dataUsuarios,
    loading: loadingUsuarios,
    error: errorUsuarios,
  } = useQuery(OBTENER_USUARIOS);

  if (loadingUsuarios) {
    return null;
  }

  console.log(dataUsuarios);

  // Query de obtención de proyectos de usuario
  const { data, loading, error } = useQuery(OBTENER_PROYECTOS_USUARIO);

  if (loading) {
    return null;
  }

  const { obtenerProyectosUsuario } = data;

  const initialValues = {
    proyectoId: "",
    nombreTarea: "",
    descripcion: "",
  };

  const validationSchema = Yup.object({
    nombreTarea: Yup.string().required("El nombre de la tarea es obligatorio"),
    proyectoId: Yup.string().required("Es obligatoio seleccionar un proyecto"),
    descripcion: Yup.string().required(
      "La descripción de la tarea es obligatoria"
    ),
  });

  const enviarDatos = async (valores) => {
    const { nombreTarea, proyectoId } = valores;

    try {
      await nuevaTarea({
        variables: {
          input: {
            nombre: nombreTarea,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="box">
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
                  <label className="label" htmlFor="proyectoId">
                    Proyecto
                  </label>
                  <div className="control">
                    <Select
                      id="proyectoId"
                      placeholder="Selecciona un proyecto"
                      options={obtenerProyectosUsuario}
                      getOptionValue={(opciones) => opciones.id}
                      getOptionLabel={(opciones) => opciones.nombre}
                      onChange={(opcion) => setProyecto(opcion.id)}
                      value={(props.values.proyectoId = proyecto)}
                      noOptionsMessage={() => "No hay resultados"}
                    />
                  </div>
                </div>
                {props.touched.proyectoId && props.errors.proyectoId ? (
                  <div className="notification is-danger my-2">
                    <p>{props.errors.proyectoId}</p>
                  </div>
                ) : null}
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
                      placeholder="Breve descripción del proyecto "
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
