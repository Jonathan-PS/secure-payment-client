// https://hackernoon.com/stripe-api-reactjs-and-express-bc446bf08301

import React, { Fragment } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
//import qs from 'query-string-object'
//import { withRouter } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import OrderSuccessPage from "../../pages/OrderSuccessPage/OrderSuccessPage";
import OrderFailPage from "../../pages/OrderFailPage/OrderFailPage";


//const stripe = Stripe('pk_test_pt1UnWeg7M8aXk1Qh8Ef5UmM00NyCvXYL4');
const APIpayment = "https://secure-payment-api.herokuapp.com/stripe/charge"



const stripeBtn = (props) => {
    const publishableKey = "pk_test_pt1UnWeg7M8aXk1Qh8Ef5UmM00NyCvXYL4";

    const onToken = token => {

        const body = {
            amount: 10000,
            currency: "nok",
            token: token.id,
            receiptEmail: token.email,
            userOrderId: 1
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
            .post("https://secure-payment-api.herokuapp.com/stripe/charge", body)
            //.post(APIpayment)
            //.then(resp => resp.json())
            .then(data => {
                
                console.log(
                    "Payment Success!!" +
                    "\nData STATUS:" + data.status +
                    "\n\nToken Email: " + token.email +
                    "\nAmount: " + body.amount +
                    "\nCurrency: " + body.currency
                );
                alert(
                    "Payment Success!!" +
                    "\nData STATUS: " + data.status +
                    "\n\nToken Email: " + token.email +
                    "\nAmount: " + body.amount +
                    "\nCurrency: " + body.currency
                    //"\n\nToken object: " + JSON.stringify(token) +
                    //"\n\nData object: " + JSON.stringify(data) +
                    //"\n\nBody object: " + JSON.stringify(body) 
                );
                //browserHistory.push("/order/success")
                //this.context.history.push("/order/success")
                //this.context.router.history.push("/order/success");
            })
            //.then(() => this.setState({ redirect: true }))
            .catch(error => {
                console.log(
                    "Payment FAILED!" +
                    "Payment Error: ", error +
                    //"\nMessage: " + error.message +
                    "\nBody:" + JSON.stringify(body));
                alert(
                    "Payment FAILED!" +
                    "\nPayment Error: " + error +
                    "\n\nToken ID: " + token.id + // can be used to create a charge or can be attached to a customer
                    "\nToken card ID: " + token.card.id +
                    "\nToken email: " + token.email + //contains the email address entered by the user
                    "\nBody amount: " + body.amount +
                    "\nBody currency: " + body.currency
                    //"\n\nToken object: " + JSON.stringify(token) +
                    //"\n\nBody object: " + JSON.stringify(body)
                );
            });
            
        /*    
        axios({
            method: 'post',
            url: APIpayment,
            data: {
                amount: 10000,
                currency: "nok",
                token: token.id
            },
            //validateStatus: (status) => {
            //    return true; // I'm always returning true, you may want to do it depending on the status received
            //},
        })
        //.then(resp => resp.json())
        .then(response => {
            console.log("\nData:" + JSON.stringify(response));
            alert("Payment Success: " +
                "\nData:" + JSON.stringify(response)
                //"\nData billing details (name): " + data.billing_details.name +
                //"\nData amount: " + response.amount +
                //"\nData currency: " + response.currency +
                //"\nData CardID: " + response.source.id +
                //"\nData cvc check: " + response.source.cvc_check +
                //"\nData STATUS: " + response.status +

                //"\nData receipt url: " + response.receipt_url +

                //"\nBody: " + JSON.stringify(body) 
            );
        }).catch(error => {
            console.log("Payment Error: ", error + "\nMessage: " + error.message +
                "\nBody:" + JSON.stringify(body));
            alert("Payment Error: " + error +
                "\nToken ID: " + token.id +
                "\nBody amount: " + body.amount +
                "\nBody currency: " + body.currency +
                "\nBody email: " + body.email +
                "\nBody: " + JSON.stringify(body)
            );

        });
        */

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