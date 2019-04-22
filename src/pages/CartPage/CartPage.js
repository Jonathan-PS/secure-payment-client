import React, { Component } from "react";
import "./CartPage";
import ProductListCart from "./components/ProductListCart/ProductListCart";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

class CartPage extends Component {
  render() {
    return (
      <div id="generalStyle">
        <h4>Cart</h4>
        <hr />
        <ProductListCart cartProducts={this.props.cartProducts} />

        <div align="center">
          {this.props.cartProducts.length > 0 ? (
            <NavLink to="/checkout" activeClassName="active">
              <Button variant="primary">Proceed to Checkout</Button>
            </NavLink>
          ) : null}
        </div>
      </div>
    );
  }
}

export default CartPage;
