import React, { Component } from "react";
import axios from "axios";

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
                if (!(this.state.successDetails).length === 0) {
                    console.log("PAYMENT COMPLETE!")
                    console.log("SUCCESS DETAILS:\n" + JSON.stringify(this.state.successDetails))
                }
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

        const { successDetails } = this.state;
        const { cantLoad, componentError } = this.state;

        // format amount
        const stringAmount = String(successDetails.amount);
        const prettyAmount = stringAmount.slice(0, stringAmount.length - 2) + "." +
            stringAmount.slice(stringAmount.length - 2) + " " + String(successDetails.currency).toUpperCase();

        // format date
        const date = successDetails.createdAt
        const formattedDate = (new Date(date)).toUTCString();


        /*  Checks for errors */
        if ((this.state.successDetails).length === 0) {
            // shows this fallback UI if successDetails is empty
            console.log("Trying to fetch data from latest transaction...")
            return (<div></div>);

        } else if (cantLoad) {
            // if variables from Stripe Checkout Payment are not received
            console.log("Variables from Stripe Checkout Payment are not received")
            return (<div></div>);

        } else if (componentError) {
            //  shows the fallback UI if there's an error
            console.log("Component error")
            return (<div><h3>Something went wrong!</h3><p>{componentError.toString()}</p></div>);

        } else {
            // If no error, render as normal
            console.log(
                "Transaction complete!" + 
                "\nOrder created: " + formattedDate +
                "\nPaid: " + this.firstLetterUpperCase(String(successDetails.paid)) +
                "\nRisk Level: " + this.firstLetterUpperCase(String(successDetails.outcomeRiskLevel)) +
                "\nRisk Score: " + successDetails.outcomeRiskScore + " (out of 99)"
            );

            return (

                <div className="block-example border border-light rounded mb-0" style={{ backgroundColor: '#f1f1f1' }}>
                    <div className="col-xs-12 col-sm-6 col-md-12" align="left">

                        {/* PRINT INFO */}
                        <br />
                        <h5>Thank you for the purchase!</h5>
                        <h1> <span className="symbol">✓</span> {String(successDetails.outcomeSellerMessage).replace(".", "")}</h1>


                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <b>Status</b><br />
                                <span className="statusText"><span className="symbol">✓</span> {this.firstLetterUpperCase(String(successDetails.outcomeType))}</span><br />
                                <span className="statusText"><span className="symbol">✓</span> {this.firstLetterUpperCase(String(successDetails.stripeStatus))}</span><br />
                                <span className="statusText"><span className="symbol">✓</span> {this.firstLetterUpperCase(String(successDetails.outcomeNetworkStatus)).replace(/_/g, ' ')}</span>

                            </li>
                            <li className="list-group-item">
                                <b>Date & Time</b> {formattedDate}
                            </li>

                            <li className="list-group-item">
                                <b>Amount</b> {prettyAmount}
                            </li>
                            <li className="list-group-item">
                                <b>Receipt Email</b> {successDetails.receiptEmail}
                            </li>
                            <li className="list-group-item">
                                <b>Receipt Url</b> {<a href={successDetails.receiptUrl} target="_blank" rel="noopener noreferrer">See Receipt</a>}
                            </li>
                        </ul>
                        <br />
                    </div>

                </div>

            );
        }
    }
}

export default OrderSuccessPage;
