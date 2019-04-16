import React, { Component } from "react";
import "./ActiveOrder.css";
import "./../../../../App.css";
import ActiveOrderCard from "./ActiveOrderCard/ActiveOrderCard";

class ActiveOrder extends Component {
  state = {
    allOrders: []
  };

  componentDidMount() {
    fetch("http://localhost:9090/orders")
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
      <ActiveOrderCard
        key={orders.userOrderId}
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

export default ActiveOrder;
