import React from "react";
import "./app.less";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import routers from "./routes";
import { renderRoutes } from "react-router-config";

const App = () => {
  console.log(123);
  return (
    <Router>
      <Switch>{renderRoutes(routers)}</Switch>
    </Router>
  );
};
export default App;
