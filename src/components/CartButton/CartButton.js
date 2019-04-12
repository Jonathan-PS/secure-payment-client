import React, { components } from "react";
import { NavLink } from "react-router-dom";

const CartButton = props => {
  return (
    <div>
      <div className="container">
        <NavLink to="/checkout" className="nav-link" activeClassName="active">
          <button type="button" className="btn btn-outline-success">
            <i className="fas fa-shopping-cart" />
            <b> ( {props.cartProducts.length} )</b>
          </button>
        </NavLink>

        {props.cartProducts.map(product => (
          <li key={product}>
            id: {product.productId} name: {product.productName}
          </li>
        ))}
      </div>
    </div>
  );
};

export default CartButton;
