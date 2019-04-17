// https://hackernoon.com/stripe-api-reactjs-and-express-bc446bf08301

import React, { Fragment } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import qs from 'query-string-object'

//const stripe = Stripe('pk_test_pt1UnWeg7M8aXk1Qh8Ef5UmM00NyCvXYL4');
const APIpayment = "https://secure-payment-api.herokuapp.com/stripe/payment"

const stripeBtn = () => {
    const publishableKey = "pk_test_pt1UnWeg7M8aXk1Qh8Ef5UmM00NyCvXYL4";

    const onToken = token => {
        
        const body = {
            token: "token",
            email: "ola@nordmann.com",
            amount: 999.00,
            currency: "NOK"            
        };

        /*
        stripe.createToken(card).then(function (result) {
            // Handle result.error or result.token
        });
        */
        /*
        stripe.createToken('bank_account', {
            country: 'US',
            currency: 'usd',
            routing_number: '110000000',
            account_number: '000123456789',
            account_holder_name: 'Jenny Rosen',
            account_holder_type: 'individual',
        }).then(function (result) {
            // Handle result.error or result.token
            console.log(result);
            alert("Result:\n" + result);
        });
        */

        axios
            .post(APIpayment, body)
            .then(response => {
                console.log(response);
                alert("Payment Success (response): " + response +
                    "\nToken ID: " + token.id +
                    "\nBody amount: " + body.amount +
                    "\nBody currency: " + body.currency +
                    "\nBody email: " + body.email +
                    "\nToken CardID: " + token.card.id +
                    "\nBody: " + JSON.stringify(body) 
                );
            })
            .catch(error => {
                console.log("Payment Error: ", error);
                alert("Payment Error: " + error +
                    "\nToken ID: " + token.id +
                    "\nBody amount: " + body.amount +
                    "\nBody currency: " + body.currency +
                    "\nBody email: " + body.email +
                    "\nBody: " + JSON.stringify(body) 
                );
            });
    };
    return (
        <StripeCheckout
            label="Pay with Card" //Component button text
            name="Pay with Stripe!" // the pop-in header title
            description="Payment description." // the pop-in header subtitle
            panelLabel="Pay" //Submit button in modal
            amount={999.00} //Amount in cents $9.99
            currency="NOK"
            token={onToken}
            stripeKey={publishableKey}
            image="https://stripe.com/img/v3/home/twitter.png" //Pop-in header image
            billingAddress={false}
        >

        </StripeCheckout>
    );
};
export default stripeBtn;