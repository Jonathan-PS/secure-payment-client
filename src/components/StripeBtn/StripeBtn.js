// https://hackernoon.com/stripe-api-reactjs-and-express-bc446bf08301

import React, { Fragment } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";


const stripeBtn = () => {
    const publishableKey = "pk_test_pt1UnWeg7M8aXk1Qh8Ef5UmM00NyCvXYL4";

    const onToken = token => {
        const body = {
            amount: 999,
            currency: "NOK",
            token: token
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
            .post("http://localhost:8000/payment", body)
            .then(response => {
                console.log(response);
                alert("Payment Success (response):\n" + response + "\nToken ID: " + token.id);
            })
            .catch(error => {
                console.log("Payment Error: ", error);
                alert("Payment Error:\n" + error + "\nToken ID: " + token.id);
            });
    };
    return (
        <StripeCheckout
            label="Pay with Card" //Component button text
            name="Pay with Stripe!" // the pop-in header title
            description="Payment description." // the pop-in header subtitle
            panelLabel="Pay" //Submit button in modal
            amount={999} //Amount in cents $9.99
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