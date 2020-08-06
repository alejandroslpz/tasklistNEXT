import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const CrearTarea = () => {
  const formik = useFormik({
    initialValues: {
      nombreTarea: "",
    },
    validationSchema: Yup.object({
      nombreTarea: Yup.string().required(
        "El nombre del proyecto es obligatorio"
      ),
    }),

    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="box">
      <h3 className="title is-4 has-text-centered">Crear Tarea</h3>
      <div className="container">
        <form onSubmit={formik.handleSubmit}>
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
                value={formik.values.nombreTarea}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.nombreTarea && formik.errors.nombreTarea ? (
              <div className="notification is-danger my-2">
                <p>{formik.errors.nombreTarea}</p>
              </div>
            ) : null}
            <div className="field">
              <label className="label" htmlFor="integrantes">
                Integrantes
              </label>
              <div className="control">
                <div className="select is-rounded">
                  <select id="integrantes">
                    <option value="">-- Integrantes --</option>
                  </select>
                </div>
              </div>
            </div>
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
      </div>
    </div>
  );
};

export default CrearTarea;
