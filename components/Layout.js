import React from "react";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import { Global, css } from "@emotion/core";
import "./Fontawesome";
import { config, dom } from "@fortawesome/fontawesome-svg-core";
import { useRouter } from "next/router";

config.autoAddCss = false;

const Layout = ({ children }) => {
  const router = useRouter();
  return (
    <>
      <Global
        styles={css`
          html,
          body {
            scroll-behavior: smooth;
            background-color: #f8f9fa;
            ${dom.css()}
          }
        `}
      />
      <Head>
        <title>TaskList</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bulma@0.9.0/css/bulma.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.0/animate.min.css"
        />
      </Head>
      <Header />
      {children}

      {router.pathname === "/login" || router.pathname === "/crear-cuenta" ? (
        <Footer />
      ) : (
        <div className="column is-offset-2">
          <Footer />
        </div>
      )}
    </>
  );
};

export default Layout;
