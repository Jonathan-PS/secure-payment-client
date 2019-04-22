import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class CartButton extends Component {
  constructor(props) {
    super(props);

    this.quantitySum = this.quantitySum.bind(this);
  }

  quantitySum() {
    const obj = this.props.cartProducts;

    var sum = 0;
    for (var i = 0; i < obj.length; i++) {
      sum += parseFloat(obj[i].selectedQuantity);
    }

    return sum;
  }

  render() {
    return (
      <NavLink to="/cart" activeClassName="active">
        <button type="button" className="btn btn-outline-dark">
          <b>
            Cart <i className="fas fa-shopping-cart" />( {this.quantitySum()} )
          </b>
        </button>
      </NavLink>
    );
  }
}

export default CartButton;
