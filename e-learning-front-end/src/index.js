import React from 'react';


import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "remixicon/fonts/remixicon.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";











const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);






//import ReactDOM from "react-dom";
//import ReactDOM from 'react-dom/client';
//import reportWebVitals from './reportWebVitals';
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );