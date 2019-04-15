// https://stripe.com/docs/recipes/elements-react#create-token

import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';

class StripeCheckoutForm extends Component {
    constructor(props) {
        super(props);
        this.state = { complete: false };
        this.submit = this.submit.bind(this);
    }

    state = {
        allProducts: []
      };
    
      componentDidMount() {
        fetch("https://secure-payment-api.herokuapp.com/payment")
          .then(resp => resp.json())
          .then(data => {
            console.log(data);
            this.setState({
              allProducts: data
            });
          })
          .catch(err => {});
      }

    async submit(ev) {
        // let { token } = await this.props.stripe.createToken({ name: "Name" });
        let { token } = await this.props.stripe.createToken({ name: "Name" }).then(({token, error}) => {
            if (error) {
                console.warn('Received error', error);
                alert("Error: " + error + "\nToken: " + token);
            } else {
              // handle token
              console.log('Received Stripe token:', token);
              alert('Received Stripe token:', token);
            }
          });;
        
        let response = await fetch("/charge", {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: token.id
        });
        
       /*
       let response = await this.props.stripe.createToken({name: "Name"});
       response = {
        token: {
         id: 'some id'
        },
        //other properties.
       }
       */

        //if (response.ok) console.log("Purchase Complete!")
        if (response.ok) this.setState({complete: true});
    }

    render() {
        if (this.state.complete) return <h1>Purchase Complete</h1>;
        return (
            <div className="checkout">
                <p>Would you like to complete the purchase?</p>
                <CardElement />
                <button onClick={this.submit}>Send</button>
            </div>
        );
    }
}

export default injectStripe(StripeCheckoutForm);