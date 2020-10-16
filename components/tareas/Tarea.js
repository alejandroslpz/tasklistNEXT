import React, { useContext } from "react";
import styled from "@emotion/styled";
import appContext from "../../context/app/appContext";
import { useProyecto } from "../../hooks/useNombre";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Card = styled.div`
  border-left: 5px;
  border-left-style: solid;
  border-left-color: ${({ estado }) =>
    estado === "PENDIENTE" ? "hsl(348, 100%, 61%)" : "hsl(141, 71%, 48%)"};
  transition: 0.3s ease-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
    transition: 0.3s ease;
  }
`;

const Icono = styled(FontAwesomeIcon)`
  font-size: 45px !important;
`;

const Tarea = ({ tarea }) => {
  const nombreProyecto = useProyecto(tarea.proyecto);
  const AppContext = useContext(appContext);
  const { setPanelTarea, setTareaSeleccionada, elegirDashboard } = AppContext;
  const { nombre, descripcion, creado, estado } = tarea;

  return (
    <div className="column is-4">
      <Card
        className="card"
        estado={estado}
        onClick={() => {
          elegirDashboard("tareas"),
            setPanelTarea("Tarea"),
            setTareaSeleccionada(tarea);
        }}
      >
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <Icono icon="pencil-alt" />
            </div>
            <div className="media-content">
              <p className="title is-4">{nombre}</p>
              <p className="subtitle is-6">Proyecto: {nombreProyecto}</p>
            </div>
          </div>
          <div className="content">{descripcion}</div>
        </div>
      </Card>
    </div>
  );
};

export default Tarea;
