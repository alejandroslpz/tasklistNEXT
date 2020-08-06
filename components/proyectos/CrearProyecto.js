import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const CrearProyecto = () => {
  const formik = useFormik({
    initialValues: {
      nombreProyecto: "",
      password: "",
    },
    validationSchema: Yup.object({
      nombreProyecto: Yup.string().required(
        "El nombre del proyecto es obligatorio"
      ),
      password: Yup.string().required("La contraseña es obligatoria"),
    }),

    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="box">
      <h3 className="title is-4 has-text-centered">Crear proyecto</h3>
      <div className="container">
        <form onSubmit={formik.handleSubmit}>
          <div className="field">
            <label className="label" htmlFor="nombreProyecto">
              Nombre del proyecto
            </label>
            <div className="control">
              <input
                id="nombreProyecto"
                type="text"
                className="input"
                placeholder="Proyecto de ejemplo"
                value={formik.values.nombreProyecto}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.nombreProyecto && formik.errors.nombreProyecto ? (
              <div className="notification is-danger my-2">
                <p>{formik.errors.nombreProyecto}</p>
              </div>
            ) : null}
            <div className="field my-4">
              <label className="label" htmlFor="propietario">
                Propietario
              </label>
              <div className="control">
                <input
                  id="promietario"
                  class="input"
                  type="text"
                  placeholder="Nombre del propietario"
                  disabled
                />
              </div>
            </div>
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
