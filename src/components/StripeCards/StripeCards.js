// https://stackoverflow.com/questions/41500135/react-js-stripe-checkout-is-not-working

import React, { Component } from 'react';
import axios from "axios";
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom' 

const publishableKey = "pk_test_pt1UnWeg7M8aXk1Qh8Ef5UmM00NyCvXYL4";

class StripeCards extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            stripeLoading: true,
            // REDIRECT
            redirectSuccess: false,
            redirectFail: false
        };
        // onStripeUpdate must be bound or else clicking on button will produce error.
        this.onStripeUpdate = this.onStripeUpdate.bind(this);
        // binding loadStripe as a best practice, not doing so does not seem to cause error.
        this.loadStripe = this.loadStripe.bind(this);
    }

    // REDIRECT
    setRedirect = () => {
        this.setState({
            redirectSuccess: true,
            redirectFail: true
        })
    }

    // REDIRECT
    renderRedirect = () => {
        if (this.state.redirectSuccess) {
            return <Redirect to='/order/success' />
        } else if (this.state.redirectFail) {
            return <Redirect to='/order/fail' />
        }
    }

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

    componentDidMount() {

        this.loadStripe(() => {
            this.stripeHandler = window.StripeCheckout.configure({
                key: publishableKey,
                image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
                locale: 'auto',
                token: (token) => {
                    this.setState({ loading: true });
                    console.log("Token ID: " + token.id);
                    //alert("Token ID: " + token.id);

                    axios.post("https://secure-payment-api.herokuapp.com/stripe/charge", {
                        amount: 10000,
                        currency: "nok",
                        token: token.id,
                        receiptEmail: token.email,
                        userOrderId: 1
                    }).then(data => {

                        console.log(
                            "Payment Success!!" +
                            "\nData STATUS:" + data.status +
                            "\n\nToken Email: " + token.email
                        );
                        /*
                        alert(
                            "Payment Success!!" +
                            "\nData STATUS: " + data.status +
                            "\n\nToken Email: " + token.email
                        );
                        */

                        // REDIRECT SUCCESS
                        this.setState({ redirectSuccess: true });

                    }).catch(error => {
                        console.log(
                            "Payment FAILED!" +
                            "Payment Error: ", error
                        )
                        /*
                        alert(
                            "Payment FAILED!" +
                            "\nPayment Error: " + error +
                            "\n\nToken ID: " + token.id + // can be used to create a charge or can be attached to a customer
                            "\nToken card ID: " + token.card.id +
                            "\nToken email: " + token.email  //contains the email address entered by the user
                        );
                        */

                        // REDIRECT FAIL
                        this.setState({ redirectFail: true });
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

    componentWillUnmount() {
        if (this.stripeHandler) {
            this.stripeHandler.close();
        }
    }

    onStripeUpdate(e) {
        this.stripeHandler.open({
            name: 'Stripe Payment!',
            description: 'Stripe Description',
            panelLabel: 'Pay with Card',
            allowRememberMe: false,
        });
        e.preventDefault();
    }

    render() {
        const { stripeLoading, loading, redirectSuccess, redirectFail } = this.state;

        return (
            <div>
                {(loading || stripeLoading)
                    ? <p>loading..</p>
                    : <Button onClick={this.onStripeUpdate}>Pay with Card</Button>
                }
                
                {(redirectSuccess) // REDIRECT SUCCESS PAGE
                    ? <Redirect to='/order/success' />
                    : <p></p>
                }
                {(redirectFail) // REDIRECT FAIL PAGE
                    ? <Redirect to='/order/fail' />
                    : <p></p>
                }

            </div>

        );
    }
}

export default StripeCards;