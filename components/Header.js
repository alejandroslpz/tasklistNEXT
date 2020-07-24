import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <nav className="navbar is-ligth">
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
