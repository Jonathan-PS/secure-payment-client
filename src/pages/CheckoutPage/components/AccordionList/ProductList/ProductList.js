import React, { Component } from "react";
import "./ProductList.css";

class ProductList extends Component {

  // DISPLAY PRICES
  showPrice = (price) =>{
    const showPrice = parseFloat(Math.round(price * 100) / 100).toFixed(2).toString().replace(".", ",")
    return showPrice
  }

  render() {
    let listKey = 1;
    //const formattedProductTotalPrice = parseFloat(Math.round(sum * 100) / 100).toFixed(2).toString().replace(".", ",")
    //const formattedProductTotalPrice = String( ).toString().replace(".", ",");

    const products = this.props.cartProducts.map(product => (
      <tr key={listKey++}>
        <th scope="row">
          <div className="checkoutImageBox">
            <img className="checkoutImg" src={product.imageUrl} alt="Product Image" />
          </div>
        </th>
        <td>{product.productName}</td>
        <td>{product.selectedQuantity}</td>
        <td>{product.selectedQuantity} x {this.showPrice(product.priceEach)}</td>
      </tr>
    ));

    return (
      <div >
        <table className="table table-sm table-striped">
          <thead>
            <tr>
              <th scope="col" />
              <th scope="col">Name</th>
              {<th scope="col">Qty.</th>}
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>{products}</tbody>
        </table>
      </div>
    );
  }
}

export default ProductList;
