import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";

import "./Card.css";

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false // ADDED TO REDIRECT
    };

    this.redirectToOrderPage = this.redirectToOrderPage.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  // ADDED TO REDIRECT
  redirectToOrderPage() {
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: "/order",
            state: {
              userOrderId: this.props.userOrderId
            }
          }}
        />
      );
    }
  }

  handleRedirect() {
    this.setState({ redirect: true });
  }

  showPrice = (price) =>{
    const showPrice = parseFloat(Math.round(price * 100) / 100).toFixed(2).toString().replace(".", ",")
    return showPrice
  }

  render() {
    { /* This component basically makes the card that is used to display the orders.
       It gets the data from OrderHistory.js and displays it the way we want to */ }
    return (
      <div className="col-xs-12 col-sm-12 col-md-12" align="left">
        <div className="card" id="border">
          <div className="card-body">
            <ul>
              <li>
                <b>Order #: </b>
                {this.props.userOrderId}
              </li>
              <li>
                <b>Shipped to: </b>
                {this.props.shippingAddress}
              </li>
              <li>
                <b>Date created: </b>
                {new Date(this.props.createdAt).toUTCString()}
              </li>
              <li>
                <b>Date updated: </b>
                {new Date(this.props.updatedAt).toUTCString()}
              </li>
              <li>
                <b>Total price: </b>
                {this.showPrice(this.props.totalPrice)} {String(this.props.currency).toUpperCase()}
              </li>
              <li>
                <b>Order status: </b>
                {this.props.status}
              </li>
              <br/>
              <Button
                type="submit"
                onClick={this.handleRedirect}
                variant="dark"
              >
                View order
              </Button>
            </ul>
          </div>
        </div>
        {this.redirectToOrderPage()}
      </div>
    );
  }
}

export default Card;
