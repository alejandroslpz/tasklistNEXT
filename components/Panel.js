import React, { useContext } from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import appContext from "../context/app/appContext";

const Sidebar = styled.div`
  position: fixed;
  height: 100%;
  background-color: #00c5a2;
`;

const Opcion = styled.li`
  padding: 15px 0;
`;

const Icono = styled(FontAwesomeIcon)`
  margin-right: 5px;
`;

const Panel = () => {
  const AppContext = useContext(appContext);

  const { elegirDashboard } = AppContext;

  return (
    <Sidebar className="column is-2">
      <h3 className="title is-4 has-text-centered has-text-white mt-6">
        Panel de control
      </h3>
      <aside>
        <ul className="menu-list has-text-centered">
          <Opcion>
            <Link href="/">
              <a onClick={() => elegirDashboard("inicio")}>
                <Icono icon="home" />
                Inicio
              </a>
            </Link>
          </Opcion>
          <Opcion>
            <Link href="/">
              <a onClick={() => elegirDashboard("proyectos")}>
                <Icono icon="folder" />
                Proyectos
              </a>
            </Link>
          </Opcion>
          <Opcion>
            <Link href="/">
              <a onClick={() => elegirDashboard("tareas")}>
                <Icono icon="tasks" />
                Tareas
              </a>
            </Link>
          </Opcion>
          <Opcion>
            <Link href="/">
              <a onClick={() => elegirDashboard("usuarios")}>
                <Icono icon="user" />
                Usuarios
              </a>
            </Link>
          </Opcion>
        </ul>
      </aside>
    </Sidebar>
  );
};

export default Panel;
