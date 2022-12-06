import React from "react";
import reactDom from "react-dom";
import { BrowserRouter } from "react-router-dom";
 import App from "./App";
// import 'antd/dist/antd.css'; 
// import AppAnt from "./components/AppAnt/app-ant";
import "./style.css";
//import AppMUI from './components/AppMUI/app-mui';
/*  import { ProductPage } from "./pages/ProductPage" */
import 'regenerator-runtime/runtime'

/*  reactDom.render(
	<ProductPage/>,
	document.querySelector("#root")
	
);  */
reactDom.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'))

/*  reactDom.render(
	<ProductPage/>,
	document.querySelector("#root")
	
);  */

reactDom.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root')) 

 /* reactDom.render(
	<AppMUI/>,
	document.querySelector("#root")
	
);  */

/* reactDom.render(
	<AppAnt/>,
	document.querySelector("#root")
	
); */