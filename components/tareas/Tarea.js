import React from "react";
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Box = styled.div`
  background-color: hsl(204, 86%, 73%) !important;
  color: white;
`;

const Icon = styled(FontAwesomeIcon)`
  margin-left: 5px;
`;

const Element = styled.li`
  display: flex;
  justify-content: space-between;
  margin: 0 25px 10px;
`;

const Tarea = () => {
  return (
    <Box className="box">
      <p className="title is-5 has-text-centered has-text-white">
        Nombre de la tarea
      </p>
      <div className="columns">
        <div className="column">
          <p className="has-text-centered mt-3">Responsables</p>
        </div>
        <div className="column">
          <p className="has-text-centered mt-3">Status</p>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <ul>
            <Element>
              Nombre 1<a className="button is-small is-primary">En proceso</a>
            </Element>
            <Element>
              Nombre 2<a className="button is-small is-primary">En proceso</a>
            </Element>
            <Element>
              Nombre 3<a className="button is-small is-primary">En proceso</a>
            </Element>
          </ul>
        </div>
      </div>
      <div className="buttons are-small is-centered">
        <button className="button is-primary">
          Editar
          <Icon icon="edit" />
        </button>
        <button className="button is-danger">
          Eliminar
          <Icon icon="times" />
        </button>
        <button className="button is-info">
          Información
          <Icon icon="info-circle" />
        </button>
      </div>
    </Box>
  );
};

export default Tarea;
