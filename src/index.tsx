import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Login';
import Registration from "./Registration";
import App from "./App";

var mountNode = document.getElementById("app");
ReactDOM.render(
  
    <App />, mountNode
);
