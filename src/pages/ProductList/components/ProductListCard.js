import React from "react";
import "./ProductListCard.css";

const ProductListCard = props => {
  return (
    <div className="col-xs-12 col-sm-6 col-md-4" align="center">
      <div className="card">
        <img src={props.image_url} alt="Product Image" width="200" />
        <div className="card-body">
          <h4 className="card-title">{props.product_name}</h4>
          <p>Description: {props.description}</p>
          <p>Price: {props.price_each} NOK</p>
          <p>Stock: {props.quantity}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductListCard;
