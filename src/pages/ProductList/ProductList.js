import React, { Component } from "react";
import "./components/ProductListCard";
import ProductListCard from "./components/ProductListCard";

class ProductList extends Component {
  state = {
    allProducts: []
  };

  componentDidMount() {
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
        productId={product.productId}
        productName={product.productName}
        description={product.description}
        imageUrl={product.imageUrl}
        priceEach={product.priceEach}
        quantity={product.quantity}
        triggerAddCartProduct={this.props.triggerAddCartProduct}
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
