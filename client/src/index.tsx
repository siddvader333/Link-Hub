import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import CustomThemeProvider from "./themes/CustomThemeProvider";
import { CssBaseline } from "@material-ui/core";
import { Router } from "react-router-dom";
import history from "./utils/history";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <CustomThemeProvider>
          <CssBaseline />
          <App />
        </CustomThemeProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
