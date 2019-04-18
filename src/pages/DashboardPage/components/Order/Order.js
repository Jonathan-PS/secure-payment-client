import React, { Component } from "react";
import "./Order.css";
import "./../../../../App.css";
import OrderCard from "./OrderCard/OrderCard";

class Order extends Component {
  state = {
    allOrders: []
  };

  componentDidMount() {
    fetch("https://secure-payment-api.herokuapp.com/orders/users/" + sessionStorage.getItem("user_id"))
    .then(resp => resp.json())
    .then(data => {
      console.log(data);
      this.setState({
        allOrders: data
      });
    })
    .catch(err => {});
  }

  render() {
    const cards = this.state.allOrders.map(orders => (
      <OrderCard
      key={orders.userOrderId}
      userOrderId={orders.userOrderId}
      registeredUserId={orders.registeredUserId}
      shippingName={orders.shippingName}
      shippingAddress={orders.shippingAddress}
      shippingEmail={orders.shippingEmail}
      createdAt={orders.createdAt}
      updatedAt={orders.updatedAt}
      status={orders.status}
      isActive={orders.isActive}
      />
    ));

    return (
      <div id="generalStyle">
        <div className="row" id="margins">{cards}</div>
      </div>
    );
  }
}

export default Order;
