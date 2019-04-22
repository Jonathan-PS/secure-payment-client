import React, { Component } from "react";
import "./CheckoutAccordionList.css";
import { Accordion, Button, Card } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";

import { NavLink } from "react-router-dom";
import ProductListCheckout from "./ProductListCheckout/ProductListCheckout";
import ShippingAddress from "./ShippingAddress/ShippingAddress";

class CheckoutAccordionList extends Component {
  state = {
    totalPrice: 0,
    shippingName: "",
    orderEmail: "",
    shippingAddress: {
      streetName: "",
      houseNumber: "",
      appartmentNumber: "",
      postalCode: "",
      city: "",
      country: ""
    }
  };

  constructor(props) {
    super(props);
    this.computeTotalPrice = this.computeTotalPrice.bind(this);
    this.setShippingAddress = this.setShippingAddress.bind(this);
  }

  componentDidMount() {
    // 0: Compute total price:
    this.computeTotalPrice();
    // If logged in, create shipment card using
    // AXIOS 1 : retrieve firstName, lastName and email
    // AXIOS 2 : retrive addresses
  }

  computeTotalPrice() {
    var sum = 0;
    for (var i = 0; i < this.props.cartProducts.length; i++) {
      sum +=
        this.props.cartProducts[i].priceEach *
        this.props.cartProducts[i].selectedQuantity;
    }

    this.setState({
      totalPrice: Math.round(sum)
    });
  }

  setShippingAddress(address) {
    this.setState({
      shippingAddress: address
    });
  }

  render() {
    return (
      <div>
        {/** Back To Cart Button */}
        <div align="center">
          <NavLink to="/cart" activeClassName="active">
            <Button variant="primary">Back to Cart</Button>
          </NavLink>
        </div>
        <br />
        {/** List */}
        <Accordion defaultActiveKey="0">
          <Card>
            {/* First Card */}
            <Accordion.Toggle as={Card.Header} eventKey="0">
              Products ( {this.state.totalPrice},- )
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <ProductListCheckout cartProducts={this.props.cartProducts} />
                <b>Total price in NOK: {this.state.totalPrice},- </b>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            {/* Second Card */}
            <Accordion.Toggle as={Card.Header} eventKey="1">
              Select a Shipping Address
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <ShippingAddress
                  triggerSetShippingAddress={this.setShippingAddress}
                />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            {/*  Third Card */}
            <Accordion.Toggle as={Card.Header} eventKey="2">
              Create Your Order
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="2">
              <div align="center">
                <NavLink to="/order/review" activeClassName="active">
                  <Button variant="primary">Create Order</Button>
                </NavLink>
                <br />
              </div>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    );
  }
}

export default CheckoutAccordionList;
