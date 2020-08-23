import { useQuery, gql } from "@apollo/client";

const OBTENER_NOMBRE_USUARIO = gql`
  query obtenerNombreUsuario($id: ID!) {
    obtenerNombreUsuario(id: $id) {
      id
      nombre
      email
      creado
    }
  }
`;

const OBTENER_NOMBRE_PROYECTO = gql`
  query obtenerProyecto($id: ID!) {
    obtenerProyecto(id: $id) {
      id
      nombre
      descripcion
      usuario
      creado
      estado
    }
  }
`;

const useUsuario = (id) => {
  const { data, loading, error } = useQuery(OBTENER_NOMBRE_USUARIO, {
    variables: {
      id,
    },
  });

  if (loading) {
    return "Cargando...";
  }

  return {
    nombreUsuario: data.obtenerNombreUsuario.nombre,
    correoUsuario: data.obtenerNombreUsuario.email,
  };
};

const useProyecto = (id) => {
  const { data, loading, error } = useQuery(OBTENER_NOMBRE_PROYECTO, {
    variables: {
      id,
    },
  });

  if (loading) {
    return null;
  }

  return data.obtenerProyecto.nombre;
};

export { useUsuario, useProyecto };
