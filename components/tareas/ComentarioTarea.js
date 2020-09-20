import React from "react";

const ComentarioTarea = () => {
  return (
    <article className="media">
      <div className="media-content">
        <div className="content">
          <p>
            <strong>John Smith</strong>
            <small className="ml-2">31m</small>
            <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
            ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas
            non massa sem. Etiam finibus odio quis feugiat facilisis.
          </p>
        </div>
      </div>
      <div className="media-right">
        <button className="delete"></button>
      </div>
    </article>
  );
};

export default ComentarioTarea;
