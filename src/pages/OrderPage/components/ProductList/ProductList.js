import React, { Component } from "react";
import "./ProductList.css";

class ProductList extends Component {
  render() {
    let listKey = 1;

    const products = this.props.orderProducts.map(orderProduct => (
      <tr key={listKey++}>
        <th scope="row">
          <img
            src={orderProduct.product.imageUrl}
            alt="Product Image"
            width="30"
          />
        </th>
        <td>{orderProduct.product.productId}</td>
        <td>{orderProduct.product.productName}</td>
        {<td>{orderProduct.quantity}</td>}
        <td>
          {orderProduct.quantity} x {orderProduct.priceEach}
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

export default ProductList;
