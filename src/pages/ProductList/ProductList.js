import React, { Component } from "react";
import "./components/ProductListCard";
import ProductListCard from "./components/ProductListCard";

class ProductList extends Component {
  state = {
    allProducts: []
  };

  componentDidMount() {
    /* Hardcoded products */
    /*this.setState({
      allProducts: [
        {
          productId: "23",
          productName: "Vans Custom Sneaker",
          description: "Colorful, white sole",
          priceEach: 699,
          quantity: 3,
          imageUrl: "https://i.imgur.com/3XTEQVN.jpg"
        },
        {
          productId: "23",
          productName: "Vans Custom Sneaker",
          description: "Colorful, white sole",
          priceEach: 699,
          quantity: 3,
          imageUrl: "https://i.imgur.com/3XTEQVN.jpg"
        },
        {
          productId: "23",
          productName: "Vans Custom Sneaker",
          description: "Colorful, white sole",
          priceEach: 699,
          quantity: 3,
          imageUrl: "https://i.imgur.com/3XTEQVN.jpg"
        },
        {
          productId: "23",
          productName: "Vans Custom Sneaker",
          description: "Colorful, white sole",
          priceEach: 699,
          quantity: 3,
          imageUrl: "https://i.imgur.com/3XTEQVN.jpg"
        }
      ]
    });*/
    fetch("https://secure-payment-api.herokuapp.com/products")
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        this.setState({
          allProducts: data
        });
      })
      .catch(err => {});
  }

  render() {
    const cards = this.state.allProducts.map(product => (
      <ProductListCard
        key={product.productId}
        productName={product.productName}
        description={product.description}
        imageUrl={product.imageUrl}
        priceEach={product.priceEach}
        quantity={product.quantity}
      />
    ));

    return (
      <div>
        <br />
        <h4>Products</h4>
        <hr />
        <div className="row">{cards}</div>
      </div>
    );
  }
}

export default ProductList;
