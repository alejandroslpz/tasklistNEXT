import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  // Definir el routing

  const router = useRouter();

  const redireccionar = () => {
    router.push("/");
  };

  return (
    <nav className="navbar is-ligth is-fixed-top">
      <div className="navbar-brand">
        <div className="navbar-item">
          <a className="title is-3" onClick={() => redireccionar()}>
            <span className="has-text-primary">
              <strong>Task</strong>
            </span>
            Manager
          </a>
        </div>
      </div>
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            <Link href="/login">
              <a className="button is-primary is-outlined">Iniciar Sesión</a>
            </Link>
            <Link href="/crear-cuenta">
              <a className="button is-primary is-outlined">Crear Cuenta</a>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
