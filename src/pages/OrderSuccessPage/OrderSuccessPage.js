import React, { Component } from "react";
import axios from "axios";
import { render } from 'react-dom';
import { Elements, StripeProvider } from 'react-stripe-elements';
import { Redirect } from 'react-router-dom'

import "./OrderSuccessPage.css";

class OrderSuccessPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            /* get from Stripe and Database */
            allDetails: [],      // to save all transactions from /stripe
            successDetails: [],   // to save LAST transaction from /stripe
            
            /* Variables from Stripe Payment & database */
            userOrderId: null,
            tokenID: null,

            /* To check if variables are sent from Stripe Checkout */
            cantLoad: false,
            
            /* Internal Errors */
            hasError: false,
            componentError: null,
            componentErrorInfo: null
        }
    }

    componentDidMount() {
        try {
            this.setState({
                userOrderId: this.props.location.state.userOrderId,
                tokenID: this.props.location.state.tokenID
            });
        }
        catch (error) {
            this.setState({
                cantLoad: true
            });
        }
        /* GET FROM DATABASE AND STRIPE */
        axios
            .get("https://secure-payment-api.herokuapp.com/stripe")
            //.then(resp => resp.json())
            .then(data => {

                this.setState({
                    allDetails: data.data // all transactions from /stripe
                });

                /* Goes through all transactions */
                for (let key in this.state.allDetails) {
                    /* Finds matching token from database with the one that was sent through Stripe.
                     * (this is sent from "StripeCards" --> this.props.location.state.tokenID) */
                    if (this.state.allDetails[key].token === this.props.location.state.tokenID) {
                        this.setState({
                            successDetails: this.state.allDetails[key]
                        });
                    }
                }
                console.log("PAYMENT COMPLETE!")
                console.log("SUCCESS DETAILS:\n" + JSON.stringify(this.state.successDetails))
            })
            .catch(err => {
                console.log("ERROR: " + err)
            });
    }


    /* Use static getDerivedStateFromError() to handle fallback rendering. */
    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        console.log("Error: " + error)
        return { cantLoad: true };
    }

    /* Error boundary class. Works similar to JavaScript’s catch {} but for components. 
     * Triggered if the render() function throws an error */
    componentDidCatch(componentError, componentErrorInfo) {
        this.setState({ 
            componentError: componentError,
            componentErrorInfo: componentErrorInfo 
        });
        /* You can also log the error to an error reporting service */
        //logErrorToMyService(error, info);
        //logComponentStackToMyService(info.componentStack);
        console.log("Error: " + componentError + "\nInfo: " + componentErrorInfo)
    }

    /* Use on Strings to make first letter Uppercase */
    firstLetterUpperCase(word) {
        const firstLetter = word.substring(0, 1).toUpperCase()
        const restOfLetters = word.substring(1, word.length)
        return firstLetter + restOfLetters
    }

    render() {
        
        /*  Checks for errors */
        if ((this.state.successDetails).length == 0) { 
            /* shows this fallback UI if successDetails is empty */
            console.log("No success data")
            return (<div><h3></h3></div>);
            
        } else if (this.state.cantLoad == true) {
            /* if variables from Stripe Checkout Payment are not received */
            console.log("Variables from Stripe Checkout Payment are not received")
            return (<div><h3></h3></div>);

        } else if (this.state.componentError) {
            /*  shows the fallback UI if there's an error */
            console.log("Component error")
            return (<div><h3>Something went wrong!</h3><p>{this.state.componentError.toString()}</p></div>);

        } else {
            /* If no error, render as normal */

            const { successDetails, userOrderId, tokenID } = this.state;

            /* format amount */
            const stringAmount = String(successDetails.amount);
            const prettyAmount = stringAmount.slice(0, stringAmount.length - 2) + "." +
                stringAmount.slice(stringAmount.length - 2) + " " + String(successDetails.currency).toUpperCase();

            return (

                <div className="block-example border border-dark rounded mb-0" style={{ backgroundColor: '#f1f1f1' }}>
                    <div className="col-xs-12 col-sm-6 col-md-12" align="left">

                        {/* PRINT INFO */}
                        <br />
                        <h3>Thank you for the purchase!</h3>
                        <h1> <span class="symbol">✓</span> {String(successDetails.outcomeSellerMessage).replace(".", "")}</h1>


                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">
                                <b>Status</b><br />
                                <span class="statusText">{this.firstLetterUpperCase(String(successDetails.stripeStatus))}</span><br />
                                <span class="statusText">{this.firstLetterUpperCase(String(successDetails.outcomeNetworkStatus)).replace(/_/g, ' ')}</span>
                            </li>
                            <li class="list-group-item">
                                <b>Amount</b><br />{prettyAmount}
                            </li>
                            <li class="list-group-item">
                                <b>Receipt Email</b><br />{successDetails.receiptEmail}
                            </li>
                            <li class="list-group-item">
                                <b>Receipt Url</b><br />{<a href={successDetails.receiptUrl} target="_blank">See Receipt</a>}
                            </li>

                            {/* REMOVE LATER! */}
                            <br /><br />
                            <div>
                                <h5><i>This under will be removed! Only for show now:</i></h5>
                                <li><b>Success User Order ID</b> {userOrderId}</li>
                                <li><b>Success TokenID</b> {tokenID}</li>
                                <li><b>Paid</b> {String(successDetails.paid)}</li>
                                <li><b>Risk Level</b> {successDetails.outcomeRiskLevel}</li>
                                <li><b>Network Status</b> {String(successDetails.outcomeNetworkStatus).replace(/_/g, ' ')}</li>
                                <br />
                            </div>
                        </ul>
                    </div>

                </div>

            );
        }
    }
}

export default OrderSuccessPage;

