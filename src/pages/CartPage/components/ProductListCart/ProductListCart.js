import React, { Component } from "react";
import "./ProductListCart.css";
import { Button } from "react-bootstrap";

class ProductListCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPrice: 0
    };

    this.computeTotalPrice = this.computeTotalPrice.bind(this);
    this.handleIncrease = this.handleIncrease.bind(this);
    this.handleDecrease = this.handleDecrease.bind(this);
    this.handleRemoval = this.handleRemoval.bind(this);
    this.handleClearCart = this.handleClearCart.bind(this);
  }
  componentDidMount() {
    this.computeTotalPrice();
  }

  computeTotalPrice() {
    var sum = 0;
    for (var i = 0; i < this.props.cartProducts.length; i++) {
      sum +=
        this.props.cartProducts[i].priceEach *
        this.props.cartProducts[i].selectedQuantity;
    }

    this.setState({
      //totalPrice: Math.round(sum)
      totalPrice: parseFloat(Math.round(sum * 100) / 100).toFixed(2)
    });
  }

  async handleRemoval(product) {
    await this.props.triggerRemoveProduct(product);
    await this.computeTotalPrice();
  }

  async handleIncrease(product) {
    await this.props.triggerAddCartProduct(product);
    await this.computeTotalPrice();
  }

  async handleDecrease(product) {
    await this.props.triggerDecreaseCartProduct(product);
    await this.computeTotalPrice();
  }

  async handleClearCart(product) {
    await this.props.triggerClearCart(product);
    await this.computeTotalPrice();
  }

  render() {
    let listKey = 1;

    const products = this.props.cartProducts.map(product => (
      <tr key={listKey++}>
        <th scope="row">
          <img src={product.imageUrl} alt="Product" width="30" />
        </th>
        <td>{product.productName}</td>
        <td>
          <Button
            variant="dark"
            onClick={() => this.handleDecrease(product)}
            size="sm"
          >
            -
          </Button>
          &nbsp; <strong>{product.selectedQuantity}</strong> &nbsp;
          <Button
            variant="dark"
            onClick={() => this.handleIncrease(product)}
            size="sm"
          >
            +
          </Button>
        </td>
        <td>
          {product.selectedQuantity} x {product.priceEach}
        </td>
        <th scope="row">
          <Button
            variant="danger"
            onClick={() => this.handleRemoval(product)}
            size="sm"
          >
            Remove
          </Button>
        </th>
      </tr>
    ));

    return (
      <div className="container" id="generalStyle">
        <table className="table table-sm table-striped">
          <thead>
            <tr>
              <th scope="col" />
              <th scope="col">Name</th>
              {<th scope="col">&nbsp; &nbsp; &nbsp;Qty.</th>}
              <th scope="col">Price</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            {products}
            <tr>
              <th scope="col" />
              <th scope="col" />
              {<th scope="col" />}
              <th scope="col" />
              <th scope="col">
                <Button
                  disabled={this.props.cartProducts.length === 0}
                  variant="danger"
                  onClick={() => this.handleClearCart()}
                  size="sm"
                >
                  Clear Cart
                </Button>
              </th>
            </tr>
          </tbody>
        </table>
        <p align="center">
          Price:{" "}
          {String(this.state.totalPrice)
            .toString()
            .replace(".", ",")}
          {" NOK"}
        </p>
      </div>
    );
  }
}

export default ProductListCart;
