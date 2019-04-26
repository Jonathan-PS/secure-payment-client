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

      // disable "Create Order"- button after pressed (to not get duplicates)
      isButtonDisabled: false,

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

    // first set the isButtonDisabled to true
    this.setState({
      isButtonDisabled: true
    });
    

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

  showPrice = (price) =>{
    const showPrice = parseFloat(Math.round(price * 100) / 100).toFixed(2).toString().replace(".", ",")
    return showPrice
  }

  render() {

    const {currency} = this.state;

    const { firstName, lastName, streetName, streetNumber, housingCode,
      postalCode, city, country, receiptEmail } = this.state.shippingInformation;


    const productList = this.props.cartProducts.map(product => (
      <ul key={product.productId} className="list-style: none;">
        <li>
          {/*Math.round(product.priceEach * product.selectedQuantity)*/}
          <b>{product.productName}</b>
          <br />
          <small>Price:</small> {this.showPrice(product.priceEach)} x {product.selectedQuantity}{" "}
          ({this.showPrice(product.priceEach * product.selectedQuantity)} {currency.toUpperCase()})
        </li>
      </ul>
    ));


    const formattedTotalPrice = String(this.state.totalPrice).toString().replace(".", ",");
    
    


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
            {/* First Card - PRODUCTS*/}
            <Accordion.Toggle as={Card.Header} eventKey="0">
              <strong> 1 |</strong> Products ({" "} {formattedTotalPrice}{" "} NOK ) &nbsp;
              {(this.props.cartProducts.length > 0) ? <span className="symbol">✓</span> : <span></span>}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <ProductList cartProducts={this.props.cartProducts} />
                <b>Total price in NOK: {formattedTotalPrice} </b>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            {/* Second Card - DELIVERY METHOD */}
            <Accordion.Toggle as={Card.Header} eventKey="1">
              <strong> 2 |</strong> Delivery Method &nbsp;
              {}
              {/*((streetName.length > 0) || (receiptEmail))? <span class="symbol">✓</span> : <span></span>*/}
              {((streetName) || (receiptEmail)) ? <span class="symbol">✓</span> : <span></span>}
              {/* "SHIPPING ADDRESS" */}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                {this.state.anyPhysical ?
                  /* IF PHYSICAL */
                  <div>
                    <small><i>Since you're buying physical products, we'll need your shipping information.</i></small>
                    <br /><br />
                    <ShippingAddress
                      triggerSetShippingInformation={this.setShippingInformation}
                    />
                  </div>
                  :
                  /* IF DIGITAL */
                  <div>
                    <small><i>Since you're buying digital products, we'll need your email.</i></small>
                    <br /><br />
                    <DigitalShippingAddress
                      triggerSetShippingInformation={this.setShippingInformation}
                    />
                  </div>
                }
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            {/*  Third Card - CREATE ORDER */}
            <Accordion.Toggle as={Card.Header} eventKey="2">
              <strong> 3 |</strong> Create Your Order &nbsp;
              {((this.props.cartProducts.length > 0) && ((streetName) || (receiptEmail))) ? <span class="symbol">✓</span> : <span></span>}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="2">
              <div align="center">
                <div id="generalStyle">
                  <br />
                  <Container>
                    <Row>
                      <Col sm={12} md={6} lg={6}>
                        {
                          (this.state.anyPhysical) ?
                            <ul><b>Shipping address</b></ul>
                            :
                            <ul><b>Delivery address</b></ul>
                        }
                        {
                          (streetName || receiptEmail) ?
                            <div>
                              <ul className="list-style: none;">
                                <li>
                                  {firstName}{" "}
                                  {lastName}
                                </li>

                                <li>
                                  {streetName}{" "}
                                  {streetNumber}{" "}
                                  {housingCode}
                                </li>
                                <li>
                                  {postalCode}{" "}
                                  {city}{" "}
                                  {country}
                                </li>
                              </ul>
                              <ul><b>Email</b><br /><i>{receiptEmail}</i></ul>
                            </div>
                            :
                            <div>
                              <ul><small><i>You need to select delivery method!</i></small></ul>
                            </div>
                        }



                      </Col>
                      <Col sm={12} md={6} lg={6}>
                        <ul><b>Products summary</b></ul>
                        {
                          (productList.length > 0) ?
                            <span>{productList}</span>
                            :
                            <ul><small><i>You need to select products!</i></small></ul>
                        }

                      </Col>
                    </Row>
                  </Container>
                </div>
                <br />
                <p><b><i>Total price to pay: {formattedTotalPrice + " NOK"} </i></b></p>
                <Button
                  disabled={
                    !this.state.shippingInformation.valid ||
                    this.state.totalPrice < 1
                  }
                  onClick={this.createOrderAndContinue}
                  disabled={this.state.isButtonDisabled} // will disable after calling createOrderAndContinue!
                  type="submit"
                  variant="primary"
                >
                  Create Order
                </Button>
                <br /><br />
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
