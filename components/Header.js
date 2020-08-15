import React, { useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import authContext from "../context/auth/authContext";
import appContext from "../context/app/appContext";

const Header = () => {
  // Definir el routing
  const router = useRouter();

  // App Context
  const AppContext = useContext(appContext);
  const { elegirDashboard } = AppContext;

  // Auth context
  const Auhtcontext = useContext(authContext);
  const { autenticado, usuarioLogin } = Auhtcontext;

  useEffect(() => {
    const usuarioToken = localStorage.getItem("token");
    if (usuarioToken) {
      usuarioLogin(true);
    }
  }, [autenticado]);

  const redireccionarLogin = () => {
    router.push("/");
  };

  // Cerrar Sesión
  const cerrarSesion = () => {
    localStorage.removeItem("token");
    router.push("/login");

    setTimeout(() => {
      elegirDashboard("inicio");
    }, 2000);
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
