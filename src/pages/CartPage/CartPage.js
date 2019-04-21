import React, { Component } from "react";
import "./CartPage";
import "./../../App.css";
import CartList from "./components/CartList/CartList";

class CartPage extends Component {
  render() {
    return (
      <div id="generalStyle">
        <h4>Cart</h4>
        <hr />
        <CartList cartProducts={this.props.cartProducts} />
      </div>
    );
  }
}

export default CartPage;
