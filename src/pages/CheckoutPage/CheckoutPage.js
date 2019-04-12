import React, { Component } from "react";
import "./CheckoutPage";
import CheckoutList from "./components/CheckoutList/CheckoutList";

class CheckoutPage extends Component {
  render() {
    return (
      <div>
        <br />
        <h4>Checkout</h4>
        <hr />
        <CheckoutList cartProducts={this.props.cartProducts} />
      </div>
    );
  }
}

export default CheckoutPage;