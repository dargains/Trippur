import React from 'react';
import ReactDOM from 'react-dom';
import "./css/main.css";
import "react-input-range/lib/css/index.css";
import App from './App';
import registerServiceWorker from './registerServiceWorker';

if(document.getElementById('results') != null){
ReactDOM.render(
  <App />,
  document.getElementById('results'));
registerServiceWorker();
}
