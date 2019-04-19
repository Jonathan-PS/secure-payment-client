import React, { Component } from "react";
import "./Order";
import OrderList from "./OrderList/OrderList";

class Order extends Component {
  render() {
    return (
      <div id="generalStyle">
        <br />
        <h4>Orders</h4>
        <hr />
        <OrderList allOrders={this.props.allOrders} />
      </div>
    );
  }
}

export default Order;
