import React, { Component } from "react";
import "./OrderPage.css";
import axios from "axios";
import { Redirect } from "react-router-dom";
import StripePayment from "../../components/StripePayment/StripePayment";
import ProductList from "./components/ProductList/ProductList";
import { Col, Row, Container } from "react-bootstrap";

class OrderPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /* Variable from Redirection */
      userOrderId: this.props.location.state.userOrderId,
      /* To check if variables are sent from Stripe Checkout */
      cantLoad: false,

      /* UserOrder information that is retrieved from the database upon mount */
      userOrderInformation: {
        userOrderId: "",
        registeredUserId: "",
        shippingName: "",
        shippingAddress: "",
        orderEmail: "",
        totalPrice: "",
        currency: "",
        createdAt: "",
        updatedAt: "",
        status: ""
      },
      /* Products that are part of the UserOrder, which are retrieved from the databse upon mount */
      orderProducts: []
    };
  }

  componentDidMount() {
    try {
      this.setState({
        userOrderId: this.props.location.state.userOrderId
      });

      /* GET USER ORDER FROM DATABASE */
      axios
        .get(
          "https://secure-payment-api.herokuapp.com/orders/" +
          this.state.userOrderId
        )
        .then(response => {
          console.log(JSON.stringify(response.data));
          this.setState({
            userOrderInformation: response.data
          });
        });

      /* GET ORDERPRODUCTS FROM DATABASE */
      axios
        .get(
          "https://secure-payment-api.herokuapp.com/orderproducts/orders/" +
          this.state.userOrderId
        )
        .then(response => {
          console.log(JSON.stringify(response.data));
          this.setState({
            orderProducts: this.state.orderProducts.concat(response.data)
          });
        })
        .catch(err => {
          console.log("Fetching Order Products Error : " + err);
        });
    } catch (error) {
      this.setState({
        cantLoad: true
      });
    }
  }

  // FORMAT PRICE TO LOOK LIKE THIS: 500,25
  showPrice = (price) => {
    const showPrice = parseFloat(Math.round(price * 100) / 100).toFixed(2).toString().replace(".", ",")
    return showPrice
  }

  render() {

    const { shippingName, shippingAddress, orderEmail, totalPrice, currency,
      userOrderId, registeredUserId, createdAt, updatedAt, status } = this.state.userOrderInformation;

    if (this.state.cantLoad) {
      return (
        <Redirect
          to={{
            pathname: "/"
            // sends these to be used in success page
          }}
        />
      );
    } else {
      console.log(
        "userOrderId: " + userOrderId +
        "\nregisteredUserId: " + registeredUserId
      )

      return (
        <div>

          <h4>Order Review</h4>
          <hr />
          <h5>Order Information</h5>

          <Container>
            <Row>
              <Col sm={12} md={12} lg={6}>
                <dl class="row">
                  <dt class="col-sm-5">Shipping to:</dt>
                  <dd class="col-sm-10">{shippingName} <br /> {shippingAddress}</dd>
                  <dt class="col-sm-5 text-truncate">Email:</dt>
                  <dd class="col-sm-10">{orderEmail}</dd>
                  <dt class="col-sm-5">Total price:</dt>
                  <dd class="col-sm-10">{this.showPrice(totalPrice)} {String(currency).toUpperCase()}</dd>
                </dl>
              </Col>
              <Col sm={12} md={12} lg={6}>
                <dl class="row">
                  <dt class="col-sm-5">Order created:</dt>
                  <dd class="col-sm-10">{new Date(createdAt).toUTCString()}</dd>
                  <dt class="col-sm-5">Last Updated:</dt>
                  <dd class="col-sm-10">{new Date(updatedAt).toUTCString()}</dd>
                  <dt class="col-sm-5">Order status:</dt>
                  <dd class="col-sm-10">{status}</dd>
                </dl>
              </Col>
            </Row>
          </Container>


          <hr />
          <h5>Order Products Information</h5>
          <ProductList orderProducts={this.state.orderProducts} />
          
          <hr />
          <div align="center">
          <b>Total Price: {this.showPrice(totalPrice)} NOK</b>
            <br /><br />
            {status === "in progress" ? (
              <StripePayment userOrderId={this.state.userOrderId} />
            ) : null}
            <br />
          </div>
          <hr />
        </div>
      );
    }
  }
}

export default OrderPage;
