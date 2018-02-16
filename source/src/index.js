import React from 'react';
import ReactDOM from 'react-dom';
import "./css/main.css";
import "react-input-range/lib/css/index.css";
import App from './App';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./service-worker.js')
    .then(function() { console.log('Service Worker Registered'); });
}
