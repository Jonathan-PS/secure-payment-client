import React, { Fragment } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
const stripeBtn = () => {
  const publishableKey = "pk_test_pt1UnWeg7M8aXk1Qh8Ef5UmM00NyCvXYL4";
   
  const onToken = token => {
    const body = {
      amount: 999,
      token: token
  };
  axios
      .post("http://localhost:8000/payment", body)
      .then(response => {
        console.log(response);
        alert("Payment Success");
      })
      .catch(error => {
        console.log("Payment Error: ", error);
        alert("Payment Error");
      });
  };
  return (
    <StripeCheckout
      label="Go to payment" //Component button text
      name="Pay with Stripe!" //Modal Header
      description="Payment description."
      panelLabel="Pay" //Submit button in modal
      amount={999} //Amount in cents $9.99
      token={onToken}
      stripeKey={publishableKey}
      image="https://stripe.com/img/v3/home/twitter.png" //Pop-in header image
      billingAddress={false}
    />
  );
};
export default stripeBtn;