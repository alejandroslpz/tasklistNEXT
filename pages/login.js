import React, { useContext } from "react";
import Layout from "../components/Layout";
import authContext from "../context/auth/authContext";
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = () => {
  const AuthContext = useContext(authContext);
  const { usuario } = AuthContext;

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("El email no es valido")
        .required("El email es obligatorio"),
      password: Yup.string().required("La contraseña es obligatoria"),
    }),

    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Layout>
      <div className="container">
        <div className="columns is-centered my-6">
          <div className="column is-6">
            <h1 className="title is-1 has-text-centered">Login</h1>
            <div>
              <form onSubmit={formik.handleSubmit}>
                <div className="field">
                  <label className="label" htmlFor="email">
                    Correo
                  </label>
                  <div className="control">
                    <input
                      id="email"
                      type="email"
                      className="input"
                      placeholder="usuario@correo.com"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                  {formik.touched.email && formik.errors.email ? (
                    <div className="notification is-danger my-2">
                      <p>{formik.errors.email}</p>
                    </div>
                  ) : null}
                  <label className="label" htmlFor="password">
                    Contraseña
                  </label>
                  <div className="control">
                    <input
                      id="password"
                      type="password"
                      className="input"
                      placeholder="Contraseña"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <div className="notification is-danger my-2">
                        <p>{formik.errors.password}</p>
                      </div>
                    ) : null}
                  </div>
                  <div className="control">
                    <button
                      type="submit"
                      className="button is-primary is-fullwidth mt-3"
                    >
                      Iniciar Sesión
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
