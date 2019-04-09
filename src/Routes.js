import React from "react";
import { Route, Switch } from "react-router-dom";

/* Pages */
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import NotFound from "./pages/NotFound/NotFound";
//import Product from "./pages/Product/Product";
import ProductList from "./pages/ProductList/ProductList";
import Dashboard from "./pages/Dashboard/Dashboard";

export default () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/signup" component={SignUp} />
    <Route exact path="/products" component={ProductList} />
    <Route exact path="/dashboard" component={Dashboard} />
    {/* NOT IMPLEMENTED A PRODUCT INFO PAGE YET
    <Route exact path="/products/:id" component={Product} />*/}
    <Route component={NotFound} />
  </Switch>
);
