import React, { Component } from "react";
import "./OrderHistory.css";
import Card from "./components/Card/Card";

class OrderHistory extends Component {
  state = {
    allOrders: []
  };

  constructor(props) {
    super(props);
    this.getOrders = this.getOrders.bind(this);
  }

  getOrders = event => {
    fetch(
      "https://secure-payment-api.herokuapp.com/orders/users/" +
        localStorage.getItem("user_id")
    )
      .then(resp => resp.json())
      .then(data => {
        //console.log(data);
        this.setState({
          allOrders: this.state.allOrders.concat(data),
          redirect: true // ADDED TO REDIRECT
        });
      })
      .catch(err => {});
  };

  componentDidMount() {
    this.getOrders();
  }

  render() {
    const cards = this.state.allOrders.map(orders => (
      <Card
        key={orders.userOrderId}
        userOrderId={orders.userOrderId}
        createdAt={orders.createdAt}
        updatedAt={orders.updatedAt}
        shippingAddress={orders.shippingAddress}
        totalPrice={orders.totalPrice}
        currency={orders.currency}
        status={orders.status}
      />
    ));

    return (
      <div id="generalStyle">
        <div className="row">
        {
          (cards.length === 0) ?
          <p><small><i>You have no orders yet. Purchase items in our shop to see your orders!</i></small></p>
          :
          cards
        }
        </div>
      </div>
    );
  }
}

export default OrderHistory;
