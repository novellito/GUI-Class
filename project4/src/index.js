import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import './index.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import 'photonkit/dist/css/photon.css';
import 'photonkit/fonts/photon-entypo.ttf';


ReactDOM.render(
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root')
);
