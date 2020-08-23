import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { gql, useMutation } from "@apollo/client";
import appContext from "../../context/app/appContext";

const NUEVO_PROYECTO = gql`
  mutation nuevoProyecto($input: ProyectoInput) {
    nuevoProyecto(input: $input) {
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

const CrearProyecto = () => {
  // Context para panel de creación de proyectos
  const AppContext = useContext(appContext);

  const { setPanelProyecto } = AppContext;
  // Mutation para crear proyecto
  const [nuevoProyecto] = useMutation(NUEVO_PROYECTO, {
    update(cache, { data: { nuevoProyecto } }) {
      // Obtener el objeto de cache que deseamos actualizar
      const { obtenerProyectosUsuario } = cache.readQuery({
        query: OBTENER_PROYECTOS_USUARIO,
      });

      // Sobreescribir el cache
      cache.writeQuery({
        query: OBTENER_PROYECTOS_USUARIO,
        data: {
          obtenerProyectosUsuario: [...obtenerProyectosUsuario, nuevoProyecto],
        },
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      nombre: "",
      descripcion: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("El nombre del proyecto es obligatorio"),
      descripcion: Yup.string().required(
        "La descripción del proyecto es obligatoria"
      ),
    }),

    onSubmit: async (values) => {
      const { nombre, descripcion } = values;

      try {
        const { data } = await nuevoProyecto({
          variables: {
            input: {
              nombre,
              descripcion,
            },
          },
        });

        setTimeout(() => {
          setPanelProyecto(false);
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="box">
      <h3 className="title is-4 has-text-centered">Crear Proyecto</h3>
      <div className="container">
        <form onSubmit={formik.handleSubmit}>
          <div className="field">
            <label className="label" htmlFor="nombre">
              Nombre del Proyecto
            </label>
            <div className="control">
              <input
                id="nombre"
                type="text"
                className="input"
                placeholder="Proyecto de ejemplo"
                value={formik.values.nombre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
          {formik.touched.nombre && formik.errors.nombre ? (
            <div className="notification is-danger my-2">
              <p>{formik.errors.nombre}</p>
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
                value={formik.values.descripcion}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></textarea>
            </div>
            {formik.touched.descripcion && formik.errors.descripcion ? (
              <div className="notification is-danger my-2">
                <p>{formik.errors.descripcion}</p>
              </div>
            ) : null}
          </div>
          <div className="field">
            <div className="control">
              <button
                type="submit"
                className="button is-primary is-fullwidth mt-3"
              >
                Crear Proyecto
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearProyecto;
