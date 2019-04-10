import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

/* Pages */
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import NotFound from "./pages/NotFound/NotFound";
import ProductList from "./pages/ProductList/ProductList";
import Dashboard from "./pages/Dashboard/Dashboard";
import StripePaymentPage from "./pages/StripePaymentPage/StripePaymentPage";

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route
          exact
          path="/products"
          render={() => (
            <ProductList
              triggerAddCartProduct={this.props.triggerAddCartProduct}
            />
          )}
        />
        <Route exact path="/dashboard" component={Dashboard} />

        <Route exact path="/stripepayment" component={StripePaymentPage} />
        <Route component={NotFound} />
      </Switch>
    );
  }
}
