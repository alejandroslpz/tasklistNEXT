import AuthState from "../context/auth/authState";
import AppState from "../context/app/appState";
import { ApolloProvider } from "@apollo/client";
import client from "../config/apollo";

const MyApp = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <AuthState>
        <AppState>
          <Component {...pageProps} />
        </AppState>
      </AuthState>
    </ApolloProvider>
  );
};

export default MyApp;
