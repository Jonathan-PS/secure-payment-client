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
      digital: this.props.digital,
      selectedQuantity: this.props.selectedQuantity
    });
  };

  render() {
    let priceEachFormatted = parseFloat(
      Math.round(this.props.priceEach * 100) / 100
    )
      .toFixed(2)
      .toString()
      .replace(".", ",");

    return (
      <div
        className="col-xs-12 col-sm-6 col-md-4"
        align="center"
        id="generalStyle"
      >
        <div className="card">
          {/* IMAGE */}
          <br />
          <div className="imageBox">
            <img src={this.props.imageUrl} alt="Product" width="100" />
          </div>
          <div className="card-body">
            {/* PRODUCT NAME */}
            <div className="productNameText">
              <h5 className="card-title">{this.props.productName}</h5>
            </div>
            {/* DESCRIPTION */}
            <div className="descriptionBox">
              <p>
                <small>
                  <i>"{this.props.description}"</i>
                </small>
              </p>
            </div>
            {/* PRICE */}
            <p className="priceText">{priceEachFormatted} NOK</p>
            {/* IS PRODUCT DIGITAL OR PHYSICAL ? */}
            {this.props.digital ? (
              <span>
                <small>Digital Product</small>
              </span>
            ) : (
                <span>
                  <small>Physical Product</small>
                </span>
              )}

            {/* IS PRODUCT DIGITAL ? */}
            {this.props.digital ? (
              <span>
                <p />
                <button
                  onClick={this.addToCart}
                  type="button"
                  className="btn btn-success"
                >
                  Add to Cart
                </button>
              </span>
            ) : /* IS PRODUCT IN STOCK ? */
              this.props.stock > 0 ? (
                this.props.stock > 75 ? (
                  <span>
                    <p>
                      <small>In stock (75+)</small>
                    </p>
                    <button
                      onClick={this.addToCart}
                      type="button"
                      className="btn btn-success"
                    >
                      Add to Cart
                  </button>
                  </span>
                ) : (
                    <span>
                      <p>
                        <small>In stock ({this.props.stock})</small>
                      </p>
                      <button
                        onClick={this.addToCart}
                        type="button"
                        className="btn btn-success"
                      >
                        Add to Cart
                  </button>
                    </span>
                  )
              ) : (
                  <span>
                    <p> </p>
                    <button disabled type="button" className="btn btn-secondary">
                      Sold out!
                </button>
                  </span>
                )}
          </div>
        </div>
      </div>
    );
  }
}

export default ProductListCard;
