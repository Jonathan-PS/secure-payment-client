import React, { components } from "react";
import { NavLink } from "react-router-dom";

const CartButton = props => {
  return (
    <div>
      <div className="container">
        <NavLink to="/checkout" activeClassName="active">
          <button type="button" class="btn btn-outline-dark">
            <i className="fas fa-shopping-cart" />
            <b> ( {props.cartProducts.length} )</b>
          </button>
        </NavLink>

        {props.cartProducts.map(product => (
          <li key={product}>
            id: {product.productId} name: {product.productName} quantity:
            {product.selectedQuantity}
          </li>
        ))}
      </div>
    </div>
  );
};

export default CartButton;
