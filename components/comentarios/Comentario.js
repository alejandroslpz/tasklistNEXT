import React from "react";
import { useUsuario } from "../../hooks/useNombre";

const Comentario = ({ comentario }) => {
  console.log(comentario);
  const { nombreUsuario, correoUsuario } = useUsuario(comentario.usuario);
  const { contenido } = comentario;

  return (
    <article className="media">
      <div className="media-content">
        <div className="content">
          <p>
            <strong>{nombreUsuario}</strong>
            <small className="ml-2">- {correoUsuario}</small>
            <br />
          </p>
          <p>{contenido}</p>
        </div>
      </div>
      {/* <div className="media-right">
        <button className="delete"></button>
      </div> */}
    </article>
  );
};

export default Comentario;
