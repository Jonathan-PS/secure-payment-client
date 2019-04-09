import React, { Component } from "react";
import { render } from 'react-dom';
import { StripeProvider } from 'react-stripe-elements';

import StripePayment from '../../components/StripeCheckout/StripeCheckout'
import StripeBtn from '../../components/StripeBtn/StripeBtn'


class StripePaymentPage extends Component {
    render() {
        return (
            <div>
                <h1>Stripe Payment Page</h1>
                <StripeProvider apiKey="pk_test_pt1UnWeg7M8aXk1Qh8Ef5UmM00NyCvXYL4">
                    <StripePayment />
                </StripeProvider>
                <p>Stripe Checkout - ReactJS</p>
                <StripeBtn />
            </div>

        );
    }
}

export default StripePaymentPage;

