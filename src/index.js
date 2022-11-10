import React from "react";
import reactDom from "react-dom";
 import App from "./App";
// import 'antd/dist/antd.css'; 
// import AppAnt from "./components/AppAnt/app-ant";
import "./style.css";
//import AppMUI from './components/AppMUI/app-mui';


 reactDom.render(
	<App/>,
	document.querySelector("#root")
	
); 

 /* reactDom.render(
	<AppMUI/>,
	document.querySelector("#root")
	
);  */

/* reactDom.render(
	<AppAnt/>,
	document.querySelector("#root")
	
); */