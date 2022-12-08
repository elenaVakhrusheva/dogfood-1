/* import React from "react";
import reactDom from "react-dom";
import { BrowserRouter } from "react-router-dom";
 import App from "./App";
import "./style.css";
import 'regenerator-runtime/runtime'

reactDom.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'))

 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import App from "./App";
import "./style.css";

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
   document.getElementById('root'));