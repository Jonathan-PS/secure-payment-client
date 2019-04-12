import React, { Component } from "react";
import "./CheckoutList.css";

class CheckoutList extends Component {
  state = {
    cartProducts: []
  };

  componentDidMount() {
    this.setState({
      cartProducts: [
        {
          productId: 1,
          productName: "fancy socks",
          description: "A pair of really fancy socks",
          imageUrl:
            "https://cdn.shopify.com/s/files/1/0002/4179/5099/products/Phintastic_hero_copy_7_2048x.png?v=1526476988",
          priceEach: 99.0,
          selectedQuantity: 1
        },
        {
          productId: 1,
          productName: "fancy socks",
          description: "A pair of really fancy socks",
          imageUrl:
            "https://cdn.shopify.com/s/files/1/0002/4179/5099/products/Phintastic_hero_copy_7_2048x.png?v=1526476988",
          priceEach: 99.0,
          selectedQuantity: 2
        }
      ]
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
        <td>{product.priceEach}</td>
      </tr>
    ));

    return (
      <div className="container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col" />
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              {<th scope="col">Quantity</th>}
              <th scope="col">priceEach</th>
            </tr>
          </thead>
          <tbody>{products}</tbody>
        </table>
      </div>
    );
  }
}

export default CheckoutList;
