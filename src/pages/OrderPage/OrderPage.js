import React, { Component } from "react";
import "./OrderPage.css";

class OrderPage extends Component {
  render() {
    return (
      <div id="generalStyle">
        <h4>Creation and review</h4>
        <hr />
        <h2>List: </h2>
        <ul>Current Items In Order</ul>
        <h2>Select: Shipping Name</h2>
        <ul>
          <li>firstName</li>
          <li>lastName</li>
        </ul>
        <h2>Select: Shipping Address</h2>
        <ul>
          <li>Anonymous: AddAddressField</li>
          <li>
            LoggedInUser : Select current address / Select another address /
            AddAddressField that saves a new address and chooses this one
          </li>
        </ul>
        <h2>Select: Receipt Email</h2>
        <ul>
          <li>Anonymous: input receipt address</li>
          <li>LoggedInUser: choose your own, or choose another</li>
        </ul>
        <hr />
        BUTTON : back to cart - BUTTON : Create UserOrder in db and proceed to
        OrderReviewPage
      </div>
    );
  }
}

export default OrderPage;
