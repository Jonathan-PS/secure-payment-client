import React, { Component } from "react";
import "./OrderPage.css";
import axios from "axios";
import { Redirect } from "react-router-dom";
import StripePayment from "../../components/StripePayment/StripePayment";
import ProductList from "./components/ProductList/ProductList";

class OrderPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /* Variable from Redirection */
      userOrderId: "",
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
      /*[{
        orderProductId: "",
        userOrderId: "",
        productId: "",
        quantity: "",
        priceEach: "",
        product : {
          productId: "",
          productName: "",
          description: "",
          imageUrl: "",
          stock: ""
        }
      },]*/
    };
  }

  async componentDidMount() {
    try {
      await this.setState({
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
        })
        .catch(err => {
          alert(err);
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
      console.log("failed to redirect");
      this.setState({
        cantLoad: true
      });
    }
  }

  render() {
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
      const orderProducts = this.state.orderProducts.map(orderProduct => {
        return (
          <ul>
            <li> orderProductId: {orderProduct.orderProductId} </li>
            <li> userOrderId: {orderProduct.userOrderId} </li>
            <li> productId: {orderProduct.productId} </li>
            <li> priceEach:{orderProduct.priceEach}</li>
            <li> quantity: {orderProduct.quantity}</li>
            <li>
              product:
              <ul>
                <li> productId: {orderProduct.product.productId}</li>
                <li> productName: {orderProduct.product.productName}</li>
                <li> description: {orderProduct.product.description}</li>
                <li> stock: {orderProduct.product.stock}</li>
                <li> imageUrl: {orderProduct.product.imageUrl}</li>
                <li> active: {orderProduct.product.active} </li>
              </ul>
            </li>
          </ul>
        );
      });

      return (
        <div id="generalStyle">
          <h4>Order Review</h4>
          <hr />
          <h5>Order Information</h5>
          <ul>
            <li>UserOrderId: {this.state.userOrderInformation.userOrderId} </li>
            <li>
              registeredUserId:{" "}
              {this.state.userOrderInformation.registeredUserId}
            </li>
            <li>
              shippingName: {this.state.userOrderInformation.shippingName}
            </li>
            <li>
              shippingAddress: {this.state.userOrderInformation.shippingAddress}{" "}
            </li>
            <li>orderEmail: {this.state.userOrderInformation.orderEmail} </li>
            <li>totalPrice: {this.state.userOrderInformation.totalPrice} </li>
            <li>currency: {this.state.userOrderInformation.currency} </li>
            <li>
              Created:{" "}
              {new Date(
                this.state.userOrderInformation.createdAt
              ).toUTCString()}
            </li>
            <li>status: {this.state.userOrderInformation.status} </li>
          </ul>
          <hr />
          <h5>Order Products Information</h5>
          <ProductList orderProducts={this.state.orderProducts} />
          <b>Total Price: {this.state.userOrderInformation.totalPrice} NOK</b>
          <hr />
          <div align="center">
            <br />
            <StripePayment userOrderId={this.state.userOrderId} />
            BUTTON : Cancel order - BUTTON : Pay
            <br />
          </div>
          <hr />
        </div>
      );
    }
  }
}

export default OrderPage;
