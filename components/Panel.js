import React, { useContext } from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import appContext from "../context/app/appContext";

const Sidebar = styled.div`
  display: none;
  position: fixed;
  height: 100%;
  background-color: #00c5a2;

  @media (min-width: 768px) {
    display: block;
  }
`;

const Opcion = styled.li`
  padding: 15px 0;
`;

const Icono = styled(FontAwesomeIcon)`
  margin-right: 5px;
`;

const Panel = () => {
  const AppContext = useContext(appContext);

  const { elegirDashboard, setPanelTarea, setPanelProyecto } = AppContext;

  return (
    <Sidebar className="column is-2">
      <h3 className="title is-4 has-text-centered has-text-white mt-6">
        Panel de control
      </h3>
      <aside className="has-text-centered">
        <ul className="menu-list">
          <Opcion>
            <Link href="/">
              <a onClick={() => elegirDashboard("inicio")}>
                <Icono icon="home" />
                Inicio
              </a>
            </Link>
          </Opcion>
        </ul>
        <ul className="menu-list">
          <Opcion>
            <Link href="/">
              <a
                onClick={() => {
                  elegirDashboard("proyectos");
                  setPanelProyecto(null);
                }}
              >
                <Icono icon="folder" />
                Proyectos
              </a>
            </Link>
          </Opcion>
        </ul>
        <ul className="menu-list">
          <Opcion>
            <Link href="/">
              <a
                onClick={() => {
                  elegirDashboard("tareas");
                  setPanelTarea(null);
                }}
              >
                <Icono icon="tasks" />
                Tareas
              </a>
            </Link>
          </Opcion>
        </ul>
        {/* <ul className="menu-list">
          <Opcion>
            <Link href="/">
              <a onClick={() => elegirDashboard("usuarios")}>
                <Icono icon="user" />
                Usuarios
              </a>
            </Link>
          </Opcion>
        </ul> */}
      </aside>
    </Sidebar>
  );
};

export default Panel;
