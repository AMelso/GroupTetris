import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import 'semantic-ui-css/semantic.min.css'
import './index.css';

ReactDOM.render(
  // StrictMode activates additional checks and warnings for it's decendants
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
