import React, { useContext } from "react";
import Layout from "../components/Layout";
import Panel from "../components/Panel";
import { css } from "@emotion/core";
import DashboardPrincipal from "../components/DashboardPrincipal";
import DashboardUsuarios from "../components/DashboardUsuarios";
import DashboardProyectos from "../components/proyectos/DashboardProyectos";
import DashboardTareas from "../components/tareas/DashboardTareas";
import appContext from "../context/app/appContext";

const Index = () => {
  const AppContext = useContext(appContext);
  const { dashboard } = AppContext;

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
