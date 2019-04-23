import React, { Component } from "react";
import axios from "axios";
import { render } from 'react-dom';
import { Elements, StripeProvider } from 'react-stripe-elements';
import { Redirect } from 'react-router-dom'

class OrderFailPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            /*  get from Stripe and Database */
            allDetails: [], // to save all transactions from /stripe. Not really needed?
            failDetails: [], // Not really needed?

            /* Variables from Stripe Payment & database */
            failError: null,
            failErrorMessage: null,
            failErrorResponseStatus: null,
            failErrorResponseDataMessage: null,
            failErrorRequest: null,
            failErrorConfig: null,

            /* To check if variables are sent from Stripe Checkout */
            cantLoad: false,

            /* Internal Errors */
            hasError: false,
            componentError: null,
            componentErrorInfo: null
        }
    }

    /* DONT REALLY NEED TO GET ANY INFO FROM DB?
    componentDidMount() {
        axios
            .get("https://secure-payment-api.herokuapp.com/stripe")
            //.then(resp => resp.json())
            .then(data => {
                //console.log(data);
                this.setState({
                    allDetails: data.data
                });
                //console.log("DETAILS:\n" + JSON.stringify(this.state.allDetails))
            })
            .catch(err => {
                console.log("ERROR: " + err)
            });
    }
    */

    componentDidMount() {
        //console.log("cDM: "+((this.state.failError) == null))
        try {
            this.setState({
                failError: this.props.location.state.failError,
                failErrorMessage: this.props.location.state.failErrorMessage,
                failErrorResponseStatus: this.props.location.state.failErrorResponseStatus,
                failErrorResponseDataMessage: this.props.location.state.failErrorResponseDataMessage,
                failErrorRequest: this.props.location.state.failErrorRequest,
                failErrorConfig: this.props.location.state.failErrorConfig
            });
            //console.log("cDM in try cantLoad: " + this.state.cantLoad);
            //console.log("cDM after try: "+((this.state.failError) == null))
        }
        catch (error) {
            this.setState({
                cantLoad: true
            });
            //console.log("cDM after catch: "+((this.state.failError) == null))
        }
    }

    /* Use static getDerivedStateFromError() to handle fallback rendering. */
    static getDerivedStateFromError(error) {
        /* Update state so the next render will show the fallback UI. */
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

        /* Checks for errors */
        if ((this.state.failError) == null) { 
            /* If data from Stripe/DB is not yet saved to state */
            console.log("Not yet loaded")
            return (<div><p></p></div>);

        } else if (this.state.cantLoad == true) {
            /* if variables from Stripe Checkout Payment are not received */
            console.log("Variables from Stripe Checkout Payment are not received")
            return (<div><h3></h3></div>);

        } else if (this.state.componentError) {
            /* shows the fallback UI if there's an error */
            console.log("Component error")
            return (<div><h3>Something went wrong!</h3><p>{this.state.componentError.toString()}</p></div>);

        } else {
            /* If no error, render as normal */

            const { failError, failErrorMessage, failErrorResponseStatus, failErrorResponseDataMessage, failErrorRequest, failErrorConfig } = this.state;

            return (

                <div className="block-example border border-dark rounded mb-0" style={{ backgroundColor: '#f1f1f1' }}>
                    <div className="col-xs-12 col-sm-6 col-md-12" align="left">

                        {/* PRINT INFO */}
                        <br />
                        <h2><span class="symbol">✘</span> Something went wrong! Payment failed.</h2>

                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">
                                <b>{String(failError)}</b>
                            </li>
                            <li class="list-group-item">
                                <b>Error Message</b> <br />{failErrorMessage}
                            </li>
                            <li class="list-group-item">
                                <b>Error Response Status</b> <br />{failErrorResponseStatus}
                            </li>

                            {/* REMOVE LATER! */}
                            <br /><br />
                            <h5><i>This under will be removed! Only for show now:</i></h5>
                            <li><b>Error Response Data Message</b> {failErrorResponseDataMessage}</li>
                            <li><b>Error Request</b> {failErrorRequest}</li>
                            <li><b>Error Config</b> {failErrorConfig}</li>
                            <br />
                        </ul>
                    </div>
                </div>
            );

        }
    }
}

export default OrderFailPage;


