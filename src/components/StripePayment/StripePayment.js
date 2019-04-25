import React, { Component } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

// PUBLISHABLE KEY FROM STRIPE
const publishableKey = "pk_test_pt1UnWeg7M8aXk1Qh8Ef5UmM00NyCvXYL4";

class StripePayment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      /* While Stripe is loading */
      loading: true,
      stripeLoading: true,

      /* REDIRECT to success page or fail page */
      redirectSuccess: false,
      redirectFail: false,

      /* To check if variables are sent from Order */
      cantLoad: false,
      cantLoadUserId: false,
      cantLoadOrder: false,

      allOrders: [],
      orders: [],

      /* ORDER CONTENT */
      amount: 0, // STRIPE'S, in øre, cents, etc..
      totalPrice: 0, // From order, in kr, dollars, etc
      currency: null, //String("nok").toLowerCase(), // this.props.location.state.currency
      orderEmail: "", // When empty, Checkout asks for email. Else, it uses this email!
      userOrderId: null, // this.props.location.state.userOrderId

      /* Get back from calling Stripe */
      tokenID: "null",
      tokenEmail: "null",
      last4: "null",

      /* componentDidCatch errors */
      hasError: false,
      hasErrorError: "null",
      hasErrorInfo: "null",

      /* if axios returns errors, save to these */
      failError: "null",
      failInfo: "null",
      failErrorMessage: "null",
      failErrorResponseStatus: "null",
      failErrorResponseDataMessage: "null",
      failErrorRequest: "null",
      failErrorConfig: "null"
    };
    /* onStripeUpdate must be bound or else clicking on button will produce error. */
    this.onStripeUpdate = this.onStripeUpdate.bind(this);
    /* binding loadStripe as a best practice, not doing so does not seem to cause error. */
    this.loadStripe = this.loadStripe.bind(this);
  }

  /* LOAD STRIPE SCRIPT CHECKOUT */
  loadStripe(onload) {
    if (!window.StripeCheckout) {
      const script = document.createElement("script");
      script.onload = function() {
        console.info("Stripe script loaded");
        onload();
      };
      script.src = "https://checkout.stripe.com/checkout.js";
      document.head.appendChild(script);
    } else {
      onload();
    }
  }

  /* Use static getDerivedStateFromError() to handle fallback rendering instead. */
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidMount() {
    // SET USER ORDER ID (get it from Order Page after redirect)
    try {
      this.setState({
        userOrderId: this.props.userOrderId
      });
    } catch (error) {
      console.log("STRIPE:\n Getting userId from Order...");
      this.setState({
        //userOrderId: 6, // <--- DELETE THIS!!!!
        cantLoadUserId: true
      });
    }

    // GET ORDERS FROM DATABASE AND STRIPE
    try {
      // AXIOS
      axios
        .get("https://secure-payment-api.herokuapp.com/orders")
        //.then(resp => resp.json())

        .then(data => {
          // set state
          this.setState({
            allOrders: data.data // all transactions from /orders
          });

          console.log("STRIPE:\n Axios: Got all orders!:");
          console.log(this.state.allOrders);

          // Goes through all orders
          for (let key in this.state.allOrders) {
            // Finds matching order from database with the one that was sent from Order Page.
            // (this is sent from "Order" --> this.props.location.state.userOrderId) */
            if (
              this.state.allOrders[key].userOrderId === this.state.userOrderId
            ) {
              this.setState({
                order: this.state.allOrders[key]
              });
              console.log("STRIPE:\n Axios: Order received from database!");
              console.log(
                "STRIPE:\n ORDER DETAILS:\n" + JSON.stringify(this.state.order)
              );

              // TRY TO SET totalPrice, amount, currecy and oderEmail to STATE
              try {
                this.setState({
                  totalPrice: this.state.order.totalPrice, // set totalPrice (handling kr, dollars, etc...)
                  amount: this.state.order.totalPrice * 100, // For Stripe (handling øre, cents, etc..)
                  currency: String(this.state.order.currency).toLowerCase(), // currency set to Lower Case
                  orderEmail: this.state.order.orderEmail // When empty, Checkout asks for email. Else, it uses this email!
                  //userOrderId: this.state.order.totalPrice,
                });
              } catch (error) {
                console.log(
                  "STRIPE:\n ERROR! Can't get amount, currency or email from order. Error:\n" +
                    error
                );
              }
            }
          }
        })
        .catch(err => {
          console.log("STRIPE:\n AXIOS ERROR: " + err);
        });
    } catch (error) {
      console.log("STRIPE:\n Can't find order. \nERROR: " + error);
      this.setState({
        //
        cantLoadOrder: true
      });
    }

    this.loadStripe(() => {
      this.stripeHandler = window.StripeCheckout.configure({
        key: publishableKey,
        //image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
        locale: "auto",
        token: token => {
          this.setState({
            loading: true,
            tokenID: token.id,
            tokenEmail: token.email,
            last4: token.card.last4
          });
          //console.log("Token ID: " + token.id);

          axios
            .put("https://secure-payment-api.herokuapp.com/stripe/charge", {
              amount: this.state.amount,
              currency: this.state.currency,
              token: token.id, // token.id
              receiptEmail: token.email,
              userOrderId: this.state.userOrderId,
              last4: this.state.last4
            })
            .then(data => {
              console.log(
                "STRIPE:\n" +
                  "Payment Success!!" +
                  "\nData STATUS:" +
                  data.status +
                  "\n\nToken Email: " +
                  token.email +
                  "\n\nToken: " +
                  JSON.stringify(token) +
                  "\n\nData content: " +
                  JSON.stringify(data)
              );

              // REDIRECT SUCCESS
              //this.setState({ redirectSuccess: true });
              this.setSuccessRedirect();
            })
            .catch(error => {
              this.setState({
                failError: String(error),
                failErrorMessage: String(error.message),
                failErrorResponseStatus: String(error.response.status),
                failErrorResponseDataMessage: JSON.stringify(
                  error.response.data.message
                ),
                failErrorRequest: JSON.stringify(error.request),
                failErrorConfig: JSON.stringify(error.config)
              });

              console.log(
                "STRIPE:\n" + "Payment FAILED!" + "\n Payment Error: ",
                error + "\n error.response.data: ",
                JSON.stringify(error.response.data.message) +
                  "\n error.response.status: ",
                error.response.status + "\n error.response.headers: ",
                JSON.stringify(error.response.headers) + "\n error.request: ",
                JSON.stringify(error.request) + "\n error.message: ",
                error.message
              );
              if (error.response) {
                /* The request was made and the server responded with a status code
                 * that falls out of the range of 2xx */
                console.log("STRIPE:\n error: " + error.response.data);
                console.log("STRIPE:\n error: " + error.response.status);
                console.log("STRIPE:\n error: " + error.response.headers);
              } else if (error.request) {
                // The request was made but no response was received.
                // `error.request` is an instance of XMLHttpRequest in the browser
                // and an instance of http.ClientRequest in node.js
                console.log("STRIPE:\n error: " + error.request);
              } else {
                /* Something happened in setting up the request that triggered an Error */
                console.log("Error", error.message);
              }
              console.log(
                "STRIPE:\n Error config: " + JSON.stringify(error.config)
              );

              // REDIRECT FAIL
              //this.setState({ redirectFail: true });
              this.setFailRedirect();
            });
        }
      });

      this.setState({
        stripeLoading: false,
        // loading needs to be explicitly set false so component will render in 'loaded' state.
        loading: false
      });
    });
  }

  /* SET REDIRECT SUCCESS PAGE */
  setSuccessRedirect = () => {
    this.setState({
      redirectSuccess: true
    });
  };

  /* SET REDIRECT FAIL PAGE */
  setFailRedirect = () => {
    this.setState({
      redirectFail: true
    });
  };

  /* REDIRECT TO PAGES IF SET TO TRUE */
  renderRedirect = () => {
    if (this.state.redirectSuccess) {
      console.log("Redirecting to success page...");
      return (
        <Redirect
          to={{
            pathname: "/order/success",
            // sends these to be used in success page
            state: {
              userOrderId: this.state.userOrderId,
              tokenID: this.state.tokenID
            }
          }}
        />
      );
    } else if (this.state.redirectFail) {
      console.log("Redirecting to fail page...");
      return (
        <Redirect
          to={{
            pathname: "/order/fail",
            // sends these to be used in fail page
            state: {
              failError: this.state.failError,
              failInfo: this.state.failInfo,
              failErrorMessage: this.state.failErrorMessage,
              failErrorResponseStatus: this.state.failErrorResponseStatus,
              failErrorResponseDataMessage: this.state
                .failErrorResponseDataMessage,
              failErrorRequest: this.state.failErrorRequest,
              failErrorConfig: this.state.failErrorConfig
            }
          }}
        />
      );
    }
  };

  /* Use static getDerivedStateFromError() to handle fallback rendering. */
  /*
    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        console.log("Error: " + error)
        return { cantLoad: true };
    }
    */

  componentDidCatch(error, info) {
    // Display fallback UI
    // Calling setState will be deprecated in a future release
    // updated is static getDerivedStateFromError(error)
    this.setState({
      hasError: true,
      hasErrorError: error, // error - The error that was thrown.
      hasErrorInfo: JSON.stringify(info) // object containing info about which component threw the error.
    });
    // You can also log the error to an error reporting service
    //logErrorToMyService(error, info);
    //logComponentStackToMyService(info.componentStack);
    console.log("STRIPE:\n Error: " + error + "\nInfo: " + info);
  }

  componentWillUnmount() {
    if (this.stripeHandler) {
      this.stripeHandler.close();
    }
  }

  /* Don't delete yet! (Might use for "panelLabel" in this.stripeHandler.open() )
    toPayText() {
        const stringAmount = String(this.state.amount);
        const prettyAmount = stringAmount.slice(0, stringAmount.length - 2) + "." + stringAmount.slice(3);
        const prettyCurrency = String(this.state.currency).toUpperCase()
        return "Pay " + prettyAmount + " " + prettyCurrency
    }
    */

  onStripeUpdate(e) {
    this.stripeHandler.open({
      name: "Pay with Stripe",
      description: "Please enter you card details",
      email: this.state.orderEmail,
      amount: this.state.amount,
      currency: this.state.currency,
      panelLabel: "", // If custom, uncomment toPayText() and write this: this.toPayText()
      allowRememberMe: true,
      image: "https://stripe.com/img/v3/home/twitter.png" //Pop-in header image
    });
    /* preventDefault(): Event interface's preventDefault() method tells the user agent
     * that if the event does not get explicitly handled, its default action
     * should not be taken as it normally would be. */
    e.preventDefault();
  }

  render() {
    const { stripeLoading, loading } = this.state;
    const { amount, currency } = this.state;
    const { hasError, hasErrorError, hasErrorInfo } = this.state;
    /*
        if ((this.state.orders).length == 0) {
            // shows this fallback UI if successDetails is empty
            console.log("No order received")
            return (<div><h3></h3></div>);

        } else 
        */
    if (hasError) {
      // custom fallback UI
      console.log(
        "STRIPE:\n " +
          "hasErrorError: " +
          hasErrorError +
          "\nhasErrorInfo: " +
          hasErrorInfo
      );
      return (
        <div>
          <h4>Something went wrong! </h4>
          <p>
            {hasErrorError} {hasErrorInfo}
          </p>
        </div>
      );
    } /*else if (this.state.cantLoadUserId == true) {
            // if variables from Stripe Checkout Payment are not received
            console.log("Can't load userId from Order...")
            return (<div><h3>Can't load userId from Order...</h3></div>);

        } else if (this.state.cantLoadOrder == true) {
            // if variables from Stripe Checkout Payment are not received
            console.log("Variables from Order DB are not received...")
            return (<div><h3>Variables from Order DB are not received...</h3></div>);

        }
        */

    console.log(
      "STRIPE: Loading variables..." +
        "\n totalPrice: " +
        this.state.totalPrice +
        "\n amount: " +
        this.state.amount +
        "\n currency: " +
        this.state.currency +
        "\n orderEmail: " +
        this.state.orderEmail +
        "\n userOrderId: " +
        this.state.userOrderId
    );

    return (
      <div>
        {/* CHECK IF AMOUNT IS HIGH ENOUGH */}
        {// CHECK IF AMOUNT IS HIGH ENOUGH
        (currency == "nok" && amount < 300) ||
        (currency == "usd" && amount < 50) ? (
          // IF FALSE
          <div>
            <Button variant="primary" disabled>
              Pay with Card
            </Button>
            <p>
              <small>Amount too low!</small>
            </p>
          </div>
        ) : // IF TRUE
        // If Stripe is loading...
        loading || stripeLoading ? (
          // If loading: text
          <div>
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
            {/* <p>Stripe is loading...</p> // <Button> Loading ... </Button> */}
          </div>
        ) : (
          // If not loading: Show Pay-button
          <Button variant="primary" onClick={this.onStripeUpdate}>
            Pay with Card
          </Button>
        )}

        {/* REDIRECT if redirectSuccess or redirectFail is set to true*/}
        {this.renderRedirect()}
      </div>
    );
  }
}

export default StripePayment;
