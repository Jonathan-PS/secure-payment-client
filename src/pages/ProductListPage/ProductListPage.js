import React, { Component } from "react";
import ProductList from "./components/ProductList/ProductList";
import "./ProductListPage.css";

class ProductListPage extends Component {
  render() {
    return (
      <div>
        <br />
        <h4>Products</h4>
        <hr />
        <ProductList triggerAddCartProduct={this.props.triggerAddCartProduct} />
      </div>
    );
  }
}

export default ProductListPage;
