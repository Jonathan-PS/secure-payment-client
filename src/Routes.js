import React from "react";
import { Route, Switch } from "react-router-dom";

/* Pages */
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import NotFound from "./pages/NotFound/NotFound";

export default () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/signup" component={SignUp} />
    <Route component={NotFound} />
  </Switch>
);
