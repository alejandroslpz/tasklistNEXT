import React, { useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";
import authContext from "../context/auth/authContext";

const Header = () => {
  // Query para obtener usuario y validar

  const Auhtcontext = useContext(authContext);
  const { autenticado, usuarioLogin, usuario } = Auhtcontext;

  useEffect(() => {
    const usuarioToken = localStorage.getItem("token");
    if (usuarioToken) {
      usuarioLogin(true);
    }
  }, [autenticado]);

  // Definir el routing
  const router = useRouter();

  const redireccionarLogin = () => {
    router.push("/");
  };

  // Cerrar Sesión
  const cerrarSesion = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <nav className="navbar is-ligth is-fixed-top">
      <div className="navbar-brand">
        <div className="navbar-item">
          <a className="title is-3" onClick={() => redireccionarLogin()}>
            <span className="has-text-primary">
              <strong>Task</strong>
            </span>
            Manager
          </a>
        </div>
      </div>
      <div className="navbar-end">
        <div className="navbar-item">
          {autenticado ? (
            <button
              type="button"
              className="button is-primary is-outlined"
              onClick={() => cerrarSesion()}
            >
              Cerrar sesión
            </button>
          ) : (
            <div className="buttons">
              <Link href="/login">
                <a className="button is-primary is-outlined">Iniciar Sesión</a>
              </Link>
              <Link href="/crear-cuenta">
                <a className="button is-primary is-outlined">Crear Cuenta</a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
