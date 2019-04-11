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
        <ProductList />
      </div>
    );
  }
}

export default ProductListPage;
