import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import "photonkit/dist/css/photon.css";
import "photonkit/fonts/photon-entypo.ttf";

ReactDOM.render(
  <BrowserRouter>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
