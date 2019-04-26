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

        <div align="center">
          {" "}
          <NavLink to="/products" activeClassName="active">
            <Button variant="primary" size="sm">
              Back to Products
            </Button>
          </NavLink>
        </div>

        <hr />
        <ProductListCart
          cartProducts={this.props.cartProducts}
          triggerAddCartProduct={this.props.triggerAddCartProduct}
          triggerDecreaseCartProduct={this.props.triggerDecreaseCartProduct}
          triggerRemoveProduct={this.props.triggerRemoveProduct}
          triggerClearCart={this.props.triggerClearCart}
        />

        <div align="center">
          <NavLink to="/checkout" activeClassName="active">
            <Button
              disabled={this.props.cartProducts.length == 0}
              variant="primary"
              size="sm"
            >
              Proceed to Checkout
            </Button>
          </NavLink>
        </div>
        <br/>
      </div>
    );
  }
}

export default CartPage;
