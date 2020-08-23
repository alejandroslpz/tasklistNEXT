import React from "react";
import styled from "@emotion/styled";
import { useUsuario } from "../../hooks/useNombre";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Card = styled.div`
  border-left: 5px;
  border-left-style: solid;
  border-left-color: ${({ estado }) =>
    estado === "PENDIENTE" ? "hsl(348, 100%, 61%)" : "hsl(141, 71%, 48%)"};
  cursor: pointer;
  transition: 0.3s ease-out;

  &:hover {
    transform: scale(1.1);
    transition: 0.3s ease;
  }
`;

const Icono = styled(FontAwesomeIcon)`
  font-size: 45px !important;
`;

const Proyecto = ({ proyecto }) => {
  // Custo Hook para traer datos de usuario por ID
  const usuario = useUsuario(proyecto.usuario);

  const { nombreUsuario, correoUsuario } = usuario;
  const { nombre, descripcion, creado, estado } = proyecto;

  return (
    <div className="column is-4">
      <Card className="card" estado={estado}>
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <Icono icon="clipboard-list" />
            </div>
            <div className="media-content">
              <p className="title is-4">{nombre}</p>
              <p className="subtitle is-6">Responsable: @{nombreUsuario}</p>
            </div>
          </div>
          <div className="content">{descripcion}</div>
        </div>
      </Card>
    </div>
  );
};

export default Proyecto;
