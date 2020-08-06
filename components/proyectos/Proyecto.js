import React from "react";
import styled from "@emotion/styled";

const Box = styled.div`
  display: flex;
  background-color: hsl(204, 86%, 33%) !important;
  color: white;
  justify-content: space-between;
`;

const Proyecto = () => {
  return (
    <Box className="box">
      <p>Nombre del proyecto</p>
      <div className="buttons are-small has-addons">
        <button className="button is-success is-selected">Completado</button>
        <button className="button">En Proceso</button>
      </div>
    </Box>
  );
};

export default Proyecto;
