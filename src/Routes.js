import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

/* Pages */
import LoginPage from "./pages/LoginPage/LoginPage";
import LogoutPage from "./pages/LogoutPage/LogoutPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";

import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import ProductListPage from "./pages/ProductListPage/ProductListPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import CartPage from "./pages/CartPage/CartPage";
import OrderSuccessPage from "./pages/OrderSuccessPage/OrderSuccessPage";
import OrderFailPage from "./pages/OrderFailPage/OrderFailPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import OrderPage from "./pages/OrderPage/OrderPage";
import LandingPage from "./pages/LandingPage/LandingPage";

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/logout" component={LogoutPage} />
        <Route exact path="/signup" component={SignUpPage} />
        <Route exact path="/dashboard" component={DashboardPage} />
        <Route exact path="/" component={LandingPage} />
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
          path="/cart"
          render={() => (
            <CartPage
              cartProducts={this.props.cartProducts}
              triggerAddCartProduct={this.props.triggerAddCartProduct}
              triggerDecreaseCartProduct={this.props.triggerDecreaseCartProduct}
              triggerRemoveProduct={this.props.triggerRemoveProduct}
              triggerClearCart={this.props.triggerClearCart}
            />
          )}
        />
        <Route
          exact
          path="/checkout"
          render={() => (
            <CheckoutPage
              cartProducts={this.props.cartProducts}
              triggerClearCart={this.props.triggerClearCart}
            />
          )}
        />

        <Route exact path="/order" component={OrderPage} />
        <Route exact path="/order/success" component={OrderSuccessPage} />
        <Route exact path="/order/fail" component={OrderFailPage} />
        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}
