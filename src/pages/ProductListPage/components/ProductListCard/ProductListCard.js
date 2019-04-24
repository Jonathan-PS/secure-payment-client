import React, { Component } from "react";
import "./ProductListCard.css";

class ProductListCard extends Component {
  addToCart = event => {
    //if (product["selectedQuantity"] == 0) {
    //product["selectedQuantity"] = product["selectedQuantity"] + 1;

    this.props.triggerAddCartProduct({
      key: this.props.productId,
      productId: this.props.productId,
      productName: this.props.productName,
      description: this.props.description,
      imageUrl: this.props.imageUrl,
      priceEach: this.props.priceEach,
      stock: this.props.stock,
      digital: this.props.stock,
      selectedQuantity: this.props.selectedQuantity
    });
  };

  render() {
    return (
      <div
        className="col-xs-12 col-sm-6 col-md-3"
        align="center"
        id="generalStyle"
      >
        <div className="card">
          <img src={this.props.imageUrl} alt="Product Image" width="100" />
          <div className="card-body">
            <h4 className="card-title">{this.props.productName}</h4>
            <p>Description: {this.props.description}</p>
            <p>Price: {this.props.priceEach} NOK</p>
            <p>Stock: {this.props.stock}</p>
            <p>Digital: {JSON.stringify(this.props.digital)}</p>
            <button
              onClick={this.addToCart}
              type="button"
              className="btn btn-success"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductListCard;
