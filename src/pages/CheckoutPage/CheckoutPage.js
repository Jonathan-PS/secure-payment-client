import React, { Component } from "react";
import "./CheckoutPage.css";
import AccordionList from "./components/AccordionList/AccordionList";

class CheckoutPage extends Component {
  render() {
    return (
      <div id="generalStyle">
        <h4>Creation and review</h4>
        <hr />
        <AccordionList cartProducts={this.props.cartProducts} />
        <hr />
      </div>
    );
  }
}

export default CheckoutPage;
