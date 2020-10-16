import React, { useContext } from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import appContext from "../../context/app/appContext";

const Ul = styled.ul`
  z-index: 10;
  list-style: none;
  display: flex;
  flex-flow: row nowrap;

  li {
    padding: 18px 10px;
  }

  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: #00c5a2;
    position: fixed;
    transform: ${({ open }) => (open ? "translateY(0)" : "translateY(-100%)")};
    top: 0;
    right: 0;
    height: 100%;
    width: 100%;
    padding: 40% 0;
    transition: ${({ open }) =>
      open ? "transform 0.3s ease-in-out" : "transform 0.1s ease-in-out"};

    li {
      margin: 5px 0;
      font-size: 25px;
      text-align: center;
    }
  }
`;

const NavigationLink = styled.a`
  color: white;
  text-decoration: none;

  &:hover {
    color: hsl(0, 0%, 71%);
  }
`;

const Icono = styled(FontAwesomeIcon)`
  margin-right: 5px;
`;

const ResponsivePanel = ({ open, setOpen }) => {
  const AppContext = useContext(appContext);

  const { elegirDashboard, setPanelTarea, setPanelProyecto } = AppContext;

  const closeBurger = () => {
    setOpen(!open);
  };

  return (
    <Ul open={open}>
      <li>
        <Link href="/">
          <NavigationLink
            onClick={() => {
              closeBurger();
              elegirDashboard("inicio");
            }}
          >
            <Icono icon="home" />
            Inicio
          </NavigationLink>
        </Link>
      </li>
      <li>
        <Link href="/">
          <NavigationLink
            onClick={() => {
              closeBurger();
              elegirDashboard("proyectos");
              setPanelProyecto(null);
            }}
          >
            <Icono icon="folder" />
            Proyectos
          </NavigationLink>
        </Link>
      </li>
      <li>
        <Link href="/">
          <NavigationLink
            onClick={() => {
              closeBurger();
              elegirDashboard("tareas");
              setPanelTarea(null);
            }}
          >
            <Icono icon="tasks" />
            Tareas
          </NavigationLink>
        </Link>
      </li>
    </Ul>
  );
};

export default ResponsivePanel;
