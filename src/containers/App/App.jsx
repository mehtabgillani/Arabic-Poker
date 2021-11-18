import React, { useEffect } from "react";
import { connect, Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/lib/integration/react";
import { I18nextProvider } from "react-i18next";
import i18n from "i18next";
import { LoadScript } from "@react-google-maps/api";
import * as firebase from "firebase/app";
import "firebase/auth";
import "bootstrap/dist/css/bootstrap.css";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import "../../scss/app.scss";
import PropTypes from "prop-types";
import Router from "./Router";
import { store, persistor, history } from "./store";
import ScrollToTop from "./ScrollToTop";
import { config as i18nextConfig } from "../../translations";
import firebaseConfig from "../../config/firebase";

i18n.init(i18nextConfig);

const ThemeComponent = ({ children, themeName }) => {
  const theme = createTheme({
    palette: {
      type: themeName === "theme-dark" ? "dark" : "light",
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

ThemeComponent.propTypes = {
  children: PropTypes.shape().isRequired,
  themeName: PropTypes.string.isRequired,
};

const ConnectedThemeComponent = connect((state) => ({
  themeName: state.theme.className,
}))(ThemeComponent);

const App = () => {
  useEffect(() => {
    firebase.initializeApp(firebaseConfig);
  }, []);

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ToastContainer autoClose={8000} />
        <PersistGate persistor={persistor}>
          <I18nextProvider i18n={i18n}>
            <ScrollToTop>
              <ConnectedThemeComponent>
                <Router />
              </ConnectedThemeComponent>
            </ScrollToTop>
          </I18nextProvider>
        </PersistGate>
      </ConnectedRouter>
    </Provider>
  );
};

export default App;
