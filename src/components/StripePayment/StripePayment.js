/* Used parts from: 
 * - https://stackoverflow.com/questions/41500135/react-js-stripe-checkout-is-not-working
*/

import React, { Component } from 'react';
import axios from "axios";
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom'

// PUBLISHABLE KEY FROM STRIPE
const publishableKey = "pk_test_pt1UnWeg7M8aXk1Qh8Ef5UmM00NyCvXYL4";

class StripeCards extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            /* While Stripe is loading */
            loading: true,
            stripeLoading: true,

            /* REDIRECT to success page or fail page */
            redirectSuccess: false,
            redirectFail: false,

            /* ORDER CONTENT */
            amount: 3000,  // this.props.location.state.amount
            currency: String("nok").toLowerCase(), // this.props.location.state.currency
            orderEmail: "", // When empty, Checkout asks for email. Else, it uses this email!
            userOrderId: 5,  // this.props.location.state.userOrderId

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
            failErrorConfig: "null",
        };
        /* onStripeUpdate must be bound or else clicking on button will produce error. */
        this.onStripeUpdate = this.onStripeUpdate.bind(this);
        /* binding loadStripe as a best practice, not doing so does not seem to cause error. */
        this.loadStripe = this.loadStripe.bind(this);
    }


    /* LOAD STRIPE SCRIPT CHECKOUT */
    loadStripe(onload) {
        if (!window.StripeCheckout) {
            const script = document.createElement('script');
            script.onload = function () {
                console.info("Stripe script loaded");
                onload();
            };
            script.src = 'https://checkout.stripe.com/checkout.js';
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

        this.loadStripe(() => {
            this.stripeHandler = window.StripeCheckout.configure({
                key: publishableKey,
                //image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
                locale: 'auto',
                token: (token) => {
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
                                "Payment Success!!" +
                                "\nData STATUS:" + data.status +
                                "\n\nToken Email: " + token.email +
                                "\n\nToken: " + JSON.stringify(token) +
                                "\n\nData content: " + JSON.stringify(data)
                            );

                            // REDIRECT SUCCESS
                            //this.setState({ redirectSuccess: true });
                            this.setSuccessRedirect()
                        })
                        .catch(error => {

                            this.setState({
                                failError: String(error),
                                failErrorMessage: String(error.message),
                                failErrorResponseStatus: String(error.response.status),
                                failErrorResponseDataMessage: JSON.stringify(error.response.data.message),
                                failErrorRequest: JSON.stringify(error.request),
                                failErrorConfig: JSON.stringify(error.config)
                            });

                            console.log(
                                "Payment FAILED!" +
                                "\n Payment Error: ", error +
                                "\n error.response.data: ", JSON.stringify(error.response.data.message) +
                                "\n error.response.status: ", error.response.status +
                                "\n error.response.headers: ", JSON.stringify(error.response.headers) +
                                "\n error.request: ", JSON.stringify(error.request) +
                                "\n error.message: ", error.message
                            )
                            if (error.response) {
                                /* The request was made and the server responded with a status code
                                 * that falls out of the range of 2xx */
                                console.log(error.response.data);
                                console.log(error.response.status);
                                console.log(error.response.headers);
                            } else if (error.request) {
                                /* The request was made but no response was received.
                                 * `error.request` is an instance of XMLHttpRequest in the browser 
                                 * and an instance of http.ClientRequest in node.js */
                                console.log(error.request);
                            } else {
                                /* Something happened in setting up the request that triggered an Error */
                                console.log('Error', error.message);
                            }
                            console.log("Error config: " + JSON.stringify(error.config));

                            /* REDIRECT FAIL */
                            //this.setState({ redirectFail: true });
                            this.setFailRedirect()
                        });

                }
            });

            this.setState({
                stripeLoading: false,
                /* loading needs to be explicitly set false so component will render in 'loaded' state. */
                loading: false
            });
        });
    }


    /* SET REDIRECT SUCCESS PAGE */
    setSuccessRedirect = () => {
        this.setState({
            redirectSuccess: true
        })
    }

    /* SET REDIRECT FAIL PAGE */
    setFailRedirect = () => {
        this.setState({
            redirectFail: true
        })
    }

    /* REDIRECT TO PAGES IF SET TO TRUE */
    renderRedirect = () => {
        if (this.state.redirectSuccess) {
            return <Redirect to={{
                pathname: '/order/success',
                /* sends these to be used in success page */
                state: {
                    userOrderId: this.state.userOrderId,
                    tokenID: this.state.tokenID,
                }
            }} />
        } else if (this.state.redirectFail) {
            return <Redirect to={{
                pathname: '/order/fail',
                /* sends these to be used in fail page */
                state: {
                    failError: this.state.failError,
                    failInfo: this.state.failInfo,
                    failErrorMessage: this.state.failErrorMessage,
                    failErrorResponseStatus: this.state.failErrorResponseStatus,
                    failErrorResponseDataMessage: this.state.failErrorResponseDataMessage,
                    failErrorRequest: this.state.failErrorRequest,
                    failErrorConfig: this.state.failErrorConfig,
                }
            }} />

        }
    }



    componentDidCatch(error, info) {
        /* Display fallback UI */
        /* Calling setState will be deprecated in a future release
         * updated is static getDerivedStateFromError(error) */
        this.setState({
            hasError: true,
            hasErrorError: error, // error - The error that was thrown.
            hasErrorInfo: JSON.stringify(info) // object containing info about which component threw the error.
        });
        /* You can also log the error to an error reporting service */
        //logErrorToMyService(error, info);
        //logComponentStackToMyService(info.componentStack);
        console.log("Error: " + error + "\nInfo: " + info)
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
            name: 'Pay with Stripe',
            description: 'Please enter you card details',
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

        /* if componentDidCatch() catches error */
        if (hasError) {
            // custom fallback UI
            console.log(
                "hasErrorError: " + hasErrorError +
                "\nhasErrorInfo: " + hasErrorInfo
            );
            return <div><h4>Something went wrong! </h4>
                <p>{hasErrorError} {hasErrorInfo}</p></div>;
        }


        return (
            <div>
                {(
                    /* CHECK IF AMOUNT IS HIGH ENOUGH */
                    (currency == "nok" && amount < 300) ||
                    (currency == "usd" && amount < 50)
                )
                    ? /* IF FALSE */
                    <div><Button variant="primary" disabled>Pay with Card</Button>
                        <p><small>Amount too low!</small></p>
                    </div>
                    : /* IF TRUE */
                    /* Check if still loading... */
                    (loading || stripeLoading)
                        ? <p>Stripe is loading...</p> // <Button> Loading ... </Button>
                        : <Button variant="primary" onClick={this.onStripeUpdate}>Pay with Card</Button>
                }


                {/* BEFORE STRIPE HAS LOADED 
                {(loading || stripeLoading)
                    ? <p>Loading...</p> // <Button> Loading ... </Button>
                    : <Button variant="primary" onClick={this.onStripeUpdate}>Pay with Card</Button>
                }
                */}

                {/* REDIRECT if redirectSuccess or redirectFail is set to true*/}
                {this.renderRedirect()}

            </div>

        );
    }
}

export default StripeCards;