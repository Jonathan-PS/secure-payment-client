import React, { Component } from "react";
import "./ProductListCheckout.css";

class ProductListCheckout extends Component {
  render() {
    let listKey = 1;

    const products = this.props.cartProducts.map(product => (
      <tr key={listKey++}>
        <th scope="row">
          <img src={product.imageUrl} alt="Product Image" width="30" />
        </th>
        <td>{product.productId}</td>
        <td>{product.productName}</td>
        {<td>{product.selectedQuantity}</td>}
        <td>
          {product.selectedQuantity} x {product.priceEach}
        </td>
      </tr>
    ));

    return (
      <div className="container" id="generalStyle">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col" />
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              {<th scope="col">Quantity</th>}
              <th scope="col">price</th>
            </tr>
          </thead>
          <tbody>{products}</tbody>
        </table>
      </div>
    );
  }
}

export default ProductListCheckout;
