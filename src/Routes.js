import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

/* Pages */
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import ProductListPage from "./pages/ProductListPage/ProductListPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import StripePaymentPage from "./pages/StripePaymentPage/StripePaymentPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import OrderSuccessPage from "./pages/OrderSuccessPage/OrderSuccessPage";
import OrderFailPage from "./pages/OrderFailPage/OrderFailPage";

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={SignUpPage} />
        <Route exact path="/dashboard" component={DashboardPage} />
        <Route exact path="/stripepayment" component={StripePaymentPage} />
        <Route exact path="/order/success" component={OrderSuccessPage} />
        <Route exact path="/order/fail" component={OrderFailPage} />
        <Route
          exact
          path="/products"
          render={() => (
            <ProductListPage
              triggerAddCartProduct={this.props.triggerAddCartProduct}
            />
          )}
        />
        <Route
          exact
          path="/checkout"
          render={() => <CheckoutPage cartProducts={this.props.cartProducts} />}
        />

        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}
