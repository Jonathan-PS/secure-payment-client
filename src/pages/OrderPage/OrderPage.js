import React, { Component } from "react";
import "./OrderPage.css";

class OrderPage extends Component {
  render() {
    return (
      <div id="generalStyle">
        <h4>Creation and review</h4>
        <hr />
        <h2>Show list: </h2>
        <ul>
          <li>total price</li>
          <li>Items In Order</li>
          <li>firstName, LastName</li>
          <li>Shipping Address</li>
          <li>Receipt Email</li>
        </ul>
        <hr />
        BUTTON : Cancel order - BUTTON : Pay
      </div>
    );
  }
}

export default OrderPage;