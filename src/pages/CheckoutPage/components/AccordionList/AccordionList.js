import React, { Component } from "react";
import "./AccordionList.css";
import { Accordion, Button, Card } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";

import { NavLink } from "react-router-dom";
import ProductList from "./ProductList/ProductList";
import ShippingAddress from "./ShippingAddress/ShippingAddress";

class AccordionList extends Component {
  state = {
    totalPrice: 0,
    shippingInformation: {
      firstName: "",
      lastName: "",
      receiptEmail: "",
      orderEmail: "",
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
    this.setShippingInformation = this.setShippingInformation.bind(this);
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

  setShippingInformation(shippingInfo) {
    this.setState({
      shippingInformation: shippingInfo
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
                <ProductList cartProducts={this.props.cartProducts} />
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
                  triggerSetShippingInformation={this.setShippingInformation}
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
                <div id="generalStyle">
                  <Container>
                    <Row>
                      <Col sm={12} md={4} lg={4}>
                        <b>Shipping Address</b>
                      </Col>
                      <Col sm={12} md={8} lg={8}>
                        <b>Summary</b>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={12} md={4} lg={4}>
                        <ul className="list-style: none;">
                          <li>
                            {this.state.shippingInformation.firstName}{" "}
                            {this.state.shippingInformation.lastName}
                          </li>
                          <li>{this.state.shippingInformation.receiptEmail}</li>
                          <li>
                            {this.state.shippingInformation.streetName}{" "}
                            {this.state.shippingInformation.streetNumber}{" "}
                            {this.state.shippingInformation.housingCode}
                          </li>
                          <li>
                            {this.state.shippingInformation.postalCode}{" "}
                            {this.state.shippingInformation.city}{" "}
                            {this.state.shippingInformation.country}
                          </li>
                        </ul>
                      </Col>
                      <Col sm={12} md={8} lg={8}>
                        products
                      </Col>
                    </Row>
                  </Container>
                </div>
                <Button variant="primary">Create Order</Button>
                <br />
              </div>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    );
  }
}

export default AccordionList;
