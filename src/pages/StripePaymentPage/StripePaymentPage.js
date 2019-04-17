import React, { Component } from "react";
import { render } from 'react-dom';
import { Elements, StripeProvider } from 'react-stripe-elements';

import StripeBtn from '../../components/StripeBtn/StripeBtn'
import StripeCheckoutForm from "../../components/StripeCheckoutForm/StripeCheckoutForm";
import StripeCards from "../../components/StripeCards/StripeCards";
import StripeShop from "../../components/StripeShop/StripeShop";

class StripePaymentPage extends Component {
    render() {
        return (
            <div>
                <h1>Stripe Payment Page</h1>

                {/* Stripe Button */}
                <h3>"Stripe Btn"</h3>
                <StripeBtn />
                <br /><br /><br />

                {/* Stripe Cards */}
                <h3>"StripeCards"</h3>
                <StripeCards></StripeCards>
                <br /><br /><br />

                {/*Stripe Checkout Form */}
                <StripeProvider apiKey="pk_test_pt1UnWeg7M8aXk1Qh8Ef5UmM00NyCvXYL4">
                    <div className="stripeCheckoutForm">
                        <h3>"Stripe Checkout Form"</h3>
                        <Elements>
                            <StripeCheckoutForm />
                            
                        </Elements>
                        <Elements>
                            
                            <StripeShop />
                        </Elements>
                    </div>
                </StripeProvider>

               

            </div>

        );
    }
}

export default StripePaymentPage;

