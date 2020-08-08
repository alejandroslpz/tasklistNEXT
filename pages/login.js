import React, { useState } from "react";
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { css } from "@emotion/core";

const Container = styled.div`
  margin-top: 40%;
  @media (min-width: 768px) {
    margin-top: 150px;
  }
`;

const AUTENTICAR_USUARIO = gql`
  mutation autenticarUsuario($input: AutenticarInput) {
    autenticarUsuario(input: $input) {
      token
    }
  }
`;

const Login = () => {
  // State que guarda la respuesta del servidor
  const [mensaje, guardarMensaje] = useState(null);
  // Uso de mutation
  const [autenticarUsuario] = useMutation(AUTENTICAR_USUARIO);

  const router = useRouter();

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

    onSubmit: async (valores) => {
      const { email, password } = valores;

      try {
        const { data } = await autenticarUsuario({
          variables: {
            input: {
              email,
              password,
            },
          },
        });

        localStorage.setItem("token", data.autenticarUsuario.token);
        guardarMensaje("¡Bienvenido!");
        setTimeout(() => {
          guardarMensaje(null);
          router.push("/");
        }, 3000);
      } catch (error) {
        guardarMensaje(error.message);
        setTimeout(() => {
          guardarMensaje(null);
        }, 3000);
      }
    },
  });

  const mostrarMensaje = () => {
    return (
      <div className="notification is-warning has-text-centered">{mensaje}</div>
    );
  };

  return (
    <Container>
      <Layout>
        <div className="container">
          <div className="columns is-centered my-6">
            <div className="column is-offset-1-mobile is-10-mobile is-10-tablet is-6-desktop">
              <h1 className="title is-1 has-text-centered">Login</h1>
              <div>
                {mensaje && mostrarMensaje()}
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
                  </div>
                  <div className="field">
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
                    <div className="field">
                      <div className="control">
                        <button
                          type="submit"
                          className="button is-primary is-fullwidth mt-3"
                        >
                          Iniciar Sesión
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </Container>
  );
};

export default Login;
