import React from 'react';
import ReactDOM from 'react-dom';
import "./css/main.css";
import "react-input-range/lib/css/index.css";
import App from './App';
import registerServiceWorker from './registerServiceWorker';


document.getElementById('root') != null &&
ReactDOM.render(
  <App />,
  document.getElementById('root'));
registerServiceWorker();
