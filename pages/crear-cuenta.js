import React, { useState } from "react";
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";
import styled from "@emotion/styled";

const Container = styled.div`
  margin-top: 40%;
  @media (min-width: 768px) {
    margin-top: 150px;
  }
`;

// Mutation para crear usuario
const NUEVO_USUARIO = gql`
  mutation nuevoUsuario($input: UsuarioInput) {
    nuevoUsuario(input: $input) {
      nombre
      email
    }
  }
`;

const CrearCuenta = () => {
  // State que guarda la respuesta del servidor
  const [mensaje, guardarMensaje] = useState(null);
  // Uso de mutation
  const [nuevoUsuario] = useMutation(NUEVO_USUARIO);

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      nombre: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("El nombre es obligatorio"),
      email: Yup.string()
        .email("El email no es valido")
        .required("El email es obligatorio"),
      password: Yup.string()
        .min(6, "La contraseña debe de contener minimo 6 caracteres")
        .required("La contraseña es obligatoria"),
    }),

    onSubmit: async (values) => {
      const { nombre, email, password } = values;
      try {
        await nuevoUsuario({
          variables: {
            input: {
              nombre,
              email,
              password,
            },
          },
        });
        guardarMensaje("Usuario creado correctamente");
        setTimeout(() => {
          guardarMensaje(null);
          router.push("/login");
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
              <h1 className="title is-1 has-text-centered">Crear Cuenta</h1>
              <div>
                {mensaje && mostrarMensaje()}
                <form onSubmit={formik.handleSubmit}>
                  <div className="field">
                    <label className="label" htmlFor="nombre">
                      Nombre
                    </label>
                    <div className="control">
                      <input
                        id="nombre"
                        type="text"
                        className="input"
                        placeholder="Nombre"
                        value={formik.values.nombre}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.nombre && formik.errors.nombre ? (
                        <div className="notification is-danger my-2">
                          <p>{formik.errors.nombre}</p>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="field">
                    <label className="label" htmlFor="email">
                      Correo
                    </label>
                    <div className="control">
                      <input
                        id="email"
                        type="email"
                        className="input"
                        placeholder="ejemplo@correo.com"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <div className="notification is-danger my-2">
                          <p>{formik.errors.email}</p>
                        </div>
                      ) : null}
                    </div>
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
                  </div>
                  <div className="field">
                    <div className="control">
                      <button
                        type="submit"
                        className="button is-primary is-fullwidth mt-3"
                      >
                        Crear cuenta
                      </button>
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

export default CrearCuenta;
