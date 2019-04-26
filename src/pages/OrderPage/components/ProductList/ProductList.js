import React, { Component } from "react";
import "./ProductList.css";

class ProductList extends Component {

   // FORMAT PRICE TO LOOK LIKE THIS: 500,25
   showPrice = (price) =>{
    const showPrice = parseFloat(Math.round(price * 100) / 100).toFixed(2).toString().replace(".", ",")
    return showPrice
  }


  render() {
    let listKey = 1;

    const products = this.props.orderProducts.map(orderProduct => (
      <tr key={listKey++}>
        <th scope="row">
          <img
            src={orderProduct.product.imageUrl}
            alt="Product"
            width="30"
          />
        </th>
        <td>{orderProduct.product.productName}</td>
        {<td>{orderProduct.quantity}</td>}
        <td>
          {orderProduct.quantity} x {this.showPrice(orderProduct.priceEach)} NOK
        </td>
      </tr>
    ));

    return (
      <div className="container" id="generalStyle">
        <table className="table table-sm table-striped">
          <thead>
            <tr>
              <th scope="col" />
              <th scope="col">Name</th>
              {<th scope="col">Qty.</th>}
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
