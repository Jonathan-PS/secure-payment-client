import React, { Component } from "react";
import "./AccordionList.css";
import { Accordion, Button, Card } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";

import { NavLink } from "react-router-dom";
import ProductList from "./ProductList/ProductList";
import ShippingAddress from "./ShippingAddress/ShippingAddress";
import DigitalShippingAddress from "./DigitalShippingAddress/DigitalShippingAddress";

import axios from "axios";
import { Redirect } from "react-router-dom";

class AccordionList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Upon Order creation, we recieve back the UserOrderId here:
      userOrderId: 0,

      // After that, redirect is set to true. When component re-renders,
      // it changes page automatically.
      redirect: false,

      // calculated in its own function
      totalPrice: 0,
      currency: "nok",

      // If all products are digital, then shipping address is simply an email.
      anyPhysical: false,

      // All required fields for creation of an order
      shippingInformation: {
        valid: false,
        firstName: "",
        lastName: "",
        receiptEmail: "",
        streetName: "",
        streetNumber: "",
        housingCode: "",
        postalCode: "",
        city: "",
        country: ""
      }
    };

    this.computeTotalPrice = this.computeTotalPrice.bind(this);
    this.checkAnyPhysical = this.checkAnyPhysical.bind(this);
    this.setShippingInformation = this.setShippingInformation.bind(this);
    //this.validateForm = this.validateForm.bind(this);
    this.createOrderAndContinue = this.createOrderAndContinue.bind(this);
    this.redirectToOrderPage = this.redirectToOrderPage.bind(this);
  }

  componentDidMount() {
    // 0: Compute total price:
    this.computeTotalPrice();
    this.checkAnyPhysical();
  }

  computeTotalPrice() {
    let sum = 0;
    for (let i = 0; i < this.props.cartProducts.length; i++) {
      sum +=
        this.props.cartProducts[i].priceEach *
        this.props.cartProducts[i].selectedQuantity;
    }

    this.setState({
      //totalPrice: Math.round(sum)
      totalPrice: parseFloat(Math.round(sum * 100) / 100).toFixed(2)
    });
  }

  checkAnyPhysical() {
    let physical = false;

    for (let i = 0; i < this.props.cartProducts.length; i++) {
      physical = physical || !this.props.cartProducts[i].digital;
    }

    this.setState({
      anyPhysical: physical
    });
  }

  setShippingInformation(shippingInfo) {
    this.setState({
      shippingInformation: shippingInfo
    });
  }

  /* Checks whether required forms are typed in at all */
  /*validateForm() {
    return (
      this.state.totalPrice > 0 &&
      this.state.shippingInformation.firstName.length > 0 &&
      this.state.shippingInformation.lastName.length > 0 &&
      (this.state.shippingInformation.receiptEmail + "").length > 0 &&
      this.state.shippingInformation.streetName.length > 0 &&
      (this.state.shippingInformation.streetNumber + "").length > 0 &&
      (this.state.shippingInformation.postalCode + "").length > 0 &&
      (this.state.shippingInformation.city + "").length > 0
    );
  }*/

  async createOrderAndContinue() {
    // 1 - create UserOrder - Retrieves the userOrderId

    let newUserOrder;

    if (this.state.anyPhysical) {
      newUserOrder = {
        registeredUserId:
          localStorage.getItem("user_id") > 0
            ? localStorage.getItem("user_id")
            : "",
        shippingName:
          this.state.shippingInformation.firstName +
          " " +
          this.state.shippingInformation.lastName,
        shippingAddress:
          this.state.shippingInformation.streetName +
          " " +
          this.state.shippingInformation.streetNumber +
          " " +
          this.state.shippingInformation.housingCode +
          ", " +
          this.state.shippingInformation.postalCode +
          " " +
          this.state.shippingInformation.city +
          ", " +
          this.state.shippingInformation.country,
        orderEmail: this.state.shippingInformation.receiptEmail,
        currency: this.state.currency,
        totalPrice: this.state.totalPrice
      };
    } else {
      newUserOrder = {
        registeredUserId:
          localStorage.getItem("user_id") > 0
            ? localStorage.getItem("user_id")
            : "",
        shippingName: "",
        shippingAddress: this.state.shippingInformation.receiptEmail,
        orderEmail: this.state.shippingInformation.receiptEmail,
        currency: this.state.currency,
        totalPrice: this.state.totalPrice
      };
    }

    await axios
      .put(
        "https://secure-payment-api.herokuapp.com/orders/create",
        newUserOrder
      )
      .then(response => {
        if (response.data < 1) {
          alert("In Then - Order Creation failed. Not a valid UserOrderId");
        } else {
          this.state.userOrderId = response.data;
          console.log("Success! UserOrderId: " + response.data);
        }
      })
      .catch(error => {
        alert("Create Order : In catch - " + error);
      });

    // 2 - Create OrderProduct for every distinct product
    if (this.state.userOrderId > 0) {
      const orderProductList = this.props.cartProducts.map(product => {
        return {
          userOrderId: this.state.userOrderId,
          productId: product.productId,
          priceEach: product.priceEach,
          quantity: product.selectedQuantity
        };
      });
      console.log(JSON.stringify(orderProductList));

      await axios
        .put(
          "https://secure-payment-api.herokuapp.com/orderproducts/bulkcreate",
          orderProductList
        )
        .then(response => {
          console.log(response.data);

          // 3 - Redirect to Order page
          //Redirect: if successful : set redirect to true
          this.setState({
            redirect: true
          });
        })
        .catch(error => {
          alert("Add Order Products : In catch - " + error);
        });
    }
  }

  redirectToOrderPage() {
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: "/order",
            // sends these to be used in success page
            state: {
              userOrderId: this.state.userOrderId
            }
          }}
        />
      );
    }
  }

  render() {
    const productList = this.props.cartProducts.map(product => (
      <ul key={product.productId} className="list-style: none;">
        {/*Math.round(product.priceEach * product.selectedQuantity)*/}
        {parseFloat(
          Math.round(product.priceEach * product.selectedQuantity * 100) / 100
        ).toFixed(2)}{" "}
        NOK = NOK = {product.priceEach}x{product.selectedQuantity}{" "}
        {product.productName}
      </ul>
    ));

    return (
      <div>
        <b>anyPhysical: {JSON.stringify(this.state.anyPhysical)}</b>

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
              Products ({" "}
              {String(this.state.totalPrice)
                .toString()
                .replace(".", ",")}{" "}
              NOK )
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
                {this.state.anyPhysical ? (
                  <ShippingAddress
                    triggerSetShippingInformation={this.setShippingInformation}
                  />
                ) : (
                  <DigitalShippingAddress
                    triggerSetShippingInformation={this.setShippingInformation}
                  />
                )}
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
                        <b>Summary</b>

                        {productList}
                        <ul className="list-style: none;">
                          {String(this.state.totalPrice)
                            .toString()
                            .replace(".", ",")}{" "}
                          NOK = sum
                        </ul>
                      </Col>
                    </Row>
                  </Container>
                </div>
                <Button
                  disabled={
                    !this.state.shippingInformation.valid ||
                    this.state.totalPrice < 1
                  }
                  onClick={this.createOrderAndContinue}
                  type="submit"
                  variant="primary"
                >
                  Create Order
                </Button>
                <br />
              </div>
            </Accordion.Collapse>
          </Card>
        </Accordion>

        {/* WHen button is clicked, the following function will redirect to the page /order */}
        {this.redirectToOrderPage()}
      </div>
    );
  }
}

export default AccordionList;
