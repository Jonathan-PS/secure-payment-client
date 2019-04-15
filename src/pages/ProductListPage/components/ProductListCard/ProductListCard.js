import React, { Component } from "react";
import "./ProductListCard.css";

class ProductListCard extends Component {
  addToCart = event => {
    //if (product["selectedQuantity"] == 0) {
    //product["selectedQuantity"] = product["selectedQuantity"] + 1;

    this.props.triggerAddCartProduct({
      productId: this.props.productId,
      productName: this.props.productName,
      description: this.props.description,
      imageUrl: this.props.imageUrl,
      priceEach: this.props.priceEach,
      quantity: this.props.quantity,
      selectedQuantity: this.props.selectedQuantity
    });
    //} else {
    //this.props.updateSelectedQuantity(this.props.productId);
    //}
  };

  render() {
    return (
      <div className="col-xs-12 col-sm-6 col-md-4" align="center">
        <div className="card">
          <img src={this.props.imageUrl} alt="Product Image" width="200" />
          <div className="card-body">
            <h4 className="card-title">{this.props.productName}</h4>
            <p>Description: {this.props.description}</p>
            <p>Price: {this.props.priceEach} NOK</p>
            <p>Stock: {this.props.quantity}</p>
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
