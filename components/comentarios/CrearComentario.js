import React from "react";
import { useMutation, gql } from "@apollo/client";
import { useFormik } from "formik";
import * as Yup from "yup";

const CREAR_COMENTARIO = gql`
  mutation nuevoComentario($input: ComentarioInput) {
    nuevoComentario(input: $input) {
      id
    }
  }
`;

const OBTENER_COMENTARIOS = gql`
  query obtenerComentariosTarea($id: ID!) {
    obtenerComentariosTarea(id: $id) {
      id
      contenido
      tarea
      usuario
      creado
    }
  }
`;

const CrearComentario = (tarea) => {
  const [nuevoComentario] = useMutation(CREAR_COMENTARIO, {
    update(cache, { data: nuevoComentario }) {
      // Obtener el objeto del cache que queremos actualizar

      const { obtenerComentariosTarea } = cache.readQuery({
        query: OBTENER_COMENTARIOS,
        variables: {
          id: tarea.tareaseleccionada.id,
        },
      });

      // Sobreescribir el cache

      cache.writeQuery({
        query: OBTENER_COMENTARIOS,
        variables: {
          id: tarea.tareaseleccionada.id,
        },
        data: {
          obtenerComentariosTarea: [
            ...obtenerComentariosTarea,
            nuevoComentario,
          ],
        },
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      contenido: "",
    },
    validationSchema: Yup.object({
      contenido: Yup.string().required("Escribe un comentario"),
    }),

    onSubmit: async (values, { resetForm }) => {
      const { contenido } = values;

      try {
        const { data } = await nuevoComentario({
          variables: {
            input: {
              contenido,
              tarea: tarea.tareaseleccionada.id,
            },
          },
        });

        resetForm({});
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="field">
          <label className="label" htmlFor="contenido">
            Agregar comentario
          </label>
          <div className="control">
            <textarea
              id="contenido"
              className="textarea"
              placeholder="Inserte tu comentario"
              value={formik.values.contenido}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></textarea>
          </div>
          {formik.touched.contenido && formik.errors.contenido ? (
            <div className="notification is-danger my-2">
              <p>{formik.errors.contenido}</p>
            </div>
          ) : null}
        </div>
        <div className="field">
          <div className="control">
            <button
              type="submit"
              className="button is-primary is-fullwidth mt-3"
            >
              Agregar
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CrearComentario;
