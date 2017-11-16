import React from 'react';
import ReactDOM from 'react-dom';
import './css/App.css';
import "./css/main.css";
import App from './App';
import registerServiceWorker from './registerServiceWorker';

/*THEME*/
import {orange, grey} from 'material-ui/colors';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
/*THEME*/

const trippurTheme = createMuiTheme({
  palette: {
    primary: orange,
    secondary:grey
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={trippurTheme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root'));
registerServiceWorker();
