import React, { useContext } from "react";
import { css } from "@emotion/core";
import appContext from "../context/app/appContext";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import Panel from "../components/Panel";
import DashboardPrincipal from "../components/DashboardPrincipal";
import DashboardUsuarios from "../components/DashboardUsuarios";
import DashboardProyectos from "../components/proyectos/DashboardProyectos";
import DashboardTareas from "../components/tareas/DashboardTareas";

const OBTENER_USUARIO = gql`
  query obtenerUsuario {
    obtenerUsuario {
      id
      nombre
    }
  }
`;

const Index = () => {
  const router = useRouter();
  const AppContext = useContext(appContext);
  const { dashboard } = AppContext;

  // consultar usuario desde backend
  const { data, loading, error } = useQuery(OBTENER_USUARIO, {
    fetchPolicy: "cache-and-network",
  });

  if (loading) {
    return null;
  }

  if (!data.obtenerUsuario) {
    router.push("/login");
    return null;
  }

  return (
    <>
      <Layout>
        <div
          className="columns"
          css={css`
            margin-top: 55px;
          `}
        >
          <Panel />
          <div className="column is-offset-2">
            <div className="container">
              {dashboard === "inicio" ? <DashboardPrincipal /> : null}
              {dashboard === "proyectos" ? <DashboardProyectos /> : null}
              {dashboard === "tareas" ? <DashboardTareas /> : null}
              {dashboard === "usuarios" ? <DashboardUsuarios /> : null}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Index;
