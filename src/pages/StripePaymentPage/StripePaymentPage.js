import React, { Component } from "react";
import { render } from 'react-dom';
import { StripeProvider } from 'react-stripe-elements';

import StripeBtn from '../../components/StripeBtn/StripeBtn'


class StripePaymentPage extends Component {
    render() {
        return (
            <div>
                <h1>Stripe Payment Page</h1>
                <p>Stripe Checkout - ReactJS</p>
                <StripeBtn />
            </div>

        );
    }
}

export default StripePaymentPage;

