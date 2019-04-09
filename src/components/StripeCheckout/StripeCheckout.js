import React, { Component } from "react";
import {Elements} from 'react-stripe-elements';
 
import InjectedCheckoutForm from '../StripeCheckoutForm/StripeCheckoutForm';
 
class StripeCheckout extends React.Component {
  render() {
    return (
      <Elements>
        <InjectedCheckoutForm />
      </Elements>
    );
  }
}
 
export default StripeCheckout;