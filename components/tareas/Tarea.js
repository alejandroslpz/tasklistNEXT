import React from "react";
import styled from "@emotion/styled";
import useNombreUsuario from "../../hooks/useNombreUsuario";

const Card = styled.div`
  border-left: 5px;
  border-left-style: solid;
  border-left-color: ${({ estado }) =>
    estado === "PENDIENTE" ? "hsl(348, 100%, 61%)" : "hsl(141, 71%, 48%)"};
`;

const Tarea = ({ tarea }) => {
  // Custo Hook para traer datos de usuario por ID
  const usuario = useNombreUsuario(tarea.usuario);

  const { nombreUsuario, correoUsuario } = usuario;
  const { nombre, descripcion, creado, estado } = tarea;

  return (
    <div className="column is-4">
      <Card className="card" estado={estado}>
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <figure className="image is-48x48">
                <img
                  src="https://bulma.io/images/placeholders/96x96.png"
                  alt="Placeholder image"
                />
              </figure>
            </div>
            <div className="media-content">
              <p className="title is-4">{nombre}</p>
              <p className="subtitle is-6">Responsable: @{nombreUsuario}</p>
            </div>
          </div>
          <div className="content">
            {descripcion}
            <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Tarea;
