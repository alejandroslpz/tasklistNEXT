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

export default useUsuario;
