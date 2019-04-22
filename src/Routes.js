import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

/* Pages */
import LoginPage from "./pages/LoginPage/LoginPage";
import LogoutPage from "./pages/LogoutPage/LogoutPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";

import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import ProductListPage from "./pages/ProductListPage/ProductListPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import StripePaymentPage from "./pages/StripePaymentPage/StripePaymentPage";
import CartPage from "./pages/CartPage/CartPage";
import OrderPage from "./pages/OrderPage/OrderPage";
import OrderSuccessPage from "./pages/OrderSuccessPage/OrderSuccessPage";
import OrderReviewPage from "./pages/OrderReviewPage/OrderReviewPage";
import OrderFailPage from "./pages/OrderFailPage/OrderFailPage";

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/logout" component={LogoutPage} />
        <Route exact path="/signup" component={SignUpPage} />
        <Route exact path="/dashboard" component={DashboardPage} />
        <Route exact path="/stripepayment" component={StripePaymentPage} />
        <Route exact path="/order" component={OrderPage} />
        <Route exact path="/order/review" component={OrderReviewPage} />

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
          path="/cart"
          render={() => <CartPage cartProducts={this.props.cartProducts} />}
        />

        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}
