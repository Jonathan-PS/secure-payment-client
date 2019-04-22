import React, { Component } from "react";
import "./CheckoutPage.css";
import CheckoutAccordionList from "./components/CheckoutAccordionList/CheckoutAccordionList";

class CheckoutPage extends Component {
  render() {
    return (
      <div id="generalStyle">
        <h4>Creation and review</h4>
        <hr />
        <CheckoutAccordionList cartProducts={this.props.cartProducts} />
        <hr />
      </div>
    );
  }
}

export default CheckoutPage;
