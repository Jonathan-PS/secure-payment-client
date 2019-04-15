import React, { Component } from "react";
import "./ActiveOrderCard.css";

class ActiveOrderCard extends Component {
  render() {
    return (
      <div className="col-xs-12 col-sm-6 col-md-4" align="right">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Active order</h4>
            <ul>
              <li><b>Order id: </b>{this.props.userOrderId}</li>
              <li><b>User id: </b>{this.props.registeredUserId}</li>
              <li><b>Shipping name: </b>{this.props.shippingName}</li>
              <li><b>Shipped to: </b>{this.props.shippingAddress}</li>
              <li><b>Shipping email: </b>{this.props.shippingEmail}</li>
              <li><b>Order created: </b>{this.props.createdAt}</li>
              <li><b>Order updated: </b>{this.props.updatedAt}</li>
              <li><b>Status: </b>{this.props.status}</li>
              <li><b>Is the order active? </b>{this.props.isActive}</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default ActiveOrderCard;
