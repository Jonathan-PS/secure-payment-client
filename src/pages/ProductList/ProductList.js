import React, { Component } from "react";
import "./components/ProductListCard";
import ProductListCard from "./components/ProductListCard";

class ProductList extends Component {
  state = {
    allProducts: []
  };

  componentDidMount() {
    /* Hardcoded products */
    this.setState({
      allProducts: [
        {
          product_id: "23",
          product_name: "Vans Custom Sneaker",
          description: "Colorful, white sole",
          price_each: 699,
          quantity: 3,
          image_url: "https://i.imgur.com/3XTEQVN.jpg"
        },
        {
          product_id: "23",
          product_name: "Vans Custom Sneaker",
          description: "Colorful, white sole",
          price_each: 699,
          quantity: 3,
          image_url: "https://i.imgur.com/3XTEQVN.jpg"
        },
        {
          product_id: "23",
          product_name: "Vans Custom Sneaker",
          description: "Colorful, white sole",
          price_each: 699,
          quantity: 3,
          image_url: "https://i.imgur.com/3XTEQVN.jpg"
        },
        {
          product_id: "23",
          product_name: "Vans Custom Sneaker",
          description: "Colorful, white sole",
          price_each: 699,
          quantity: 3,
          image_url: "https://i.imgur.com/3XTEQVN.jpg"
        }
      ]
    });
    /*fetch("https://api.spacexdata.com/v3/launches")
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        this.setState({
          allProducts: data
        });
      })
      .catch(err => {}); }*/
  }

  render() {
    const cards = this.state.allProducts.map(product => (
      <ProductListCard
        key={product.product_id}
        product_name={product.product_name}
        description={product.description}
        image_url={product.image_url}
        price_each={product.price_each}
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
