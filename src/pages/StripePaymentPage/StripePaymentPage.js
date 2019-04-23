import React, { Component } from "react";
//import { render } from "react-dom";
import { Elements, StripeProvider } from "react-stripe-elements";

import StripeBtn from "../../components/StripeBtn/StripeBtn";
import StripeCheckoutForm from "../../components/StripeCheckoutForm/StripeCheckoutForm";
import StripePayment from "../../components/StripePayment/StripePayment";
import StripeShop from "../../components/StripeShop/StripeShop";

class StripePaymentPage extends Component {

    render() {
        return (
            <div>
                <h1>Stripe Payment Page</h1>
                <h5><strong><i>This page will not be on our Page, only used for testing!</i></strong></h5>

                <br /><br /><br />
                {/* Stripe Cards */}
                <h3>"StripePayment, use this!"</h3>
                <StripePayment></StripePayment>
                <br /><br /><br />

                <h5><i>Don't use the ones under, only displayed to see the different ways of using Stripe's front-end..</i></h5>

                {/* Stripe Button */}
                <h3>"Stripe Btn"</h3>
                <StripeBtn />
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
