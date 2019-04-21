import React, { Component } from "react";
import "./CartList.css";
import "./../../../../App.css";

class CartList extends Component {
  state = {
    totalPrice: 0
  };

  componentDidMount() {
    var sum = 0;
    for (var i = 0; i < this.props.cartProducts.length; i++) {
      sum +=
        this.props.cartProducts[i].priceEach *
        this.props.cartProducts[i].selectedQuantity;
    }

    this.setState({
      totalPrice: Math.round(sum)
    });
  }

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
        totalPriceasd : {this.state.totalPrice},-
        {/* Create Order Button - to create order page */}
      </div>
    );
  }
}

export default CartList;
