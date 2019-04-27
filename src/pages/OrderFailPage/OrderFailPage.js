import React, { Component } from "react";
import axios from "axios";

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
            componentErrorInfo: null,

            userOrderId: null,
            userOrders: null,
            userOrderThisStatus: ""

        }
    }

    componentDidMount() {
        //console.log("cDM: "+((this.state.failError) === null))
        try {
            this.setState({
                userOrderId: this.props.location.state.userOrderId,
                failError: this.props.location.state.failError,
                failErrorMessage: this.props.location.state.failErrorMessage,
                failErrorResponseStatus: this.props.location.state.failErrorResponseStatus,
                failErrorResponseDataMessage: this.props.location.state.failErrorResponseDataMessage,
                failErrorRequest: this.props.location.state.failErrorRequest,
                failErrorConfig: this.props.location.state.failErrorConfig
            });
            //console.log("cDM in try cantLoad: " + this.state.cantLoad);
            //console.log("cDM after try: "+((this.state.failError) === null))
        }
        catch (error) {
            this.setState({
                cantLoad: true
            });
            //console.log("cDM after catch: "+((this.state.failError) === null))
        }

        /* GET ORDERS */
        axios
            .get("https://secure-payment-api.herokuapp.com/orders/users/" + localStorage.getItem("user_id"))
            //.then(resp => resp.json())
            .then(response => {

                this.setState({
                    userOrders: response.data // all orders from /orders/users/{user_id}
                });

                // Goes through all orders
                for (let key in this.state.userOrders) {
                    // Finds matching userOrderId from database with one given from payment page.
                    if (this.state.userOrders[key].userOrderId === this.props.location.state.userOrderId) {
                        this.setState({
                            userOrderThisStatus: this.state.userOrders[key].status
                        });
                        //console.log("userOrderThisStatus: \n" + JSON.stringify(this.state.userOrderThisStatus))
                    }
                }

                //console.log("userOrders: "+JSON.stringify(this.state.userOrders))
                //console.log("Loaded user order")
            })
            .catch(err => {
                //console.log("ERROR:\n" + err)
                console.log("Can't get content.")
            });

        //console.log("userOrderId: " + this.state.userOrderId)

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

    getErrorCodeDescription(errorCode) {
        let codeDescription = "";

        switch (String(errorCode)) {
            case "200":
                codeDescription = "Request worked as expected!"
                break;
            case "400":
                codeDescription = "Something is wrong with the information provided. Please get in contact with our technical support with the order number '" + this.state.userOrderId + "' !"
                break;
            case "500":
                codeDescription = "Something is broken (indicate an error with Stripe’s servers). Please get in contact with our technical support with the order number '" + this.state.userOrderId + "' !"
                break;
            default:
                codeDescription = "Something is broken. Please get in contact with our technical support with the order number '" + this.state.userOrderId + "' !"
        }

        return codeDescription;
    }

    render() {

        /* Checks for errors */
        if ((this.state.failError) === null) {
            /* If data from Stripe/DB is not yet saved to state */
            //console.log("Loading...")
            return (<div><p></p></div>);

        } else if (this.state.cantLoad === true) {
            /* if variables from Stripe Checkout Payment are not received */
            console.log("Variables from Stripe Checkout Payment are not received")
            return (<div><p></p></div>);

        } else if (this.state.componentError) {
            /* shows the fallback UI if there's an error */
            console.log("Component error")
            return (<div><h3>Something went wrong!</h3><p>{this.state.componentError.toString()}</p></div>);

        } else {
            /* If no error, render as normal */

            const { failError, failErrorResponseStatus, userOrderThisStatus } = this.state;
            //console.log("Error Response Data Message: " + failErrorResponseDataMessage);

            return (

                <div className="block-example border border-light rounded mb-0" style={{ backgroundColor: '#f1f1f1' }}>
                    <div className="col-xs-12 col-sm-6 col-md-12" align="left">

                        {/* PRINT INFO */}
                        <br />
                        <h2><span className="symbol text-danger">✘</span> Something went wrong! Payment failed.</h2>
                        {
                            (!failError.includes("null")) ?
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <b>{String(failError)}</b>
                                    </li>
                                    <li className="list-group-item">
                                        <b>Error Message</b> <br />{/*failErrorMessage*/}
                                        {this.getErrorCodeDescription(String(failErrorResponseStatus))}
                                    </li>
                                    {/* 
                                    <li className="list-group-item">
                                        <b>Error Response Status</b> <br />{failErrorResponseStatus}
                                    </li>
                                    */}
                                    <li className="list-group-item">
                                        <b>Order status:</b> <br />
                                        {(String(userOrderThisStatus).includes("progress")) ?
                                            <p>{this.firstLetterUpperCase(String(userOrderThisStatus))} <br/>
                                                <small>(If you're logged in, you can retry the payment in your Dashboard)</small>
                                            </p>
                                            :
                                            this.firstLetterUpperCase(String(userOrderThisStatus))
                                        }
                                    </li>
                                </ul>
                                :
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <b>Card Declined!</b> <br />Contact your issuing bank
                                    </li>
                                    <li className="list-group-item">
                                        <b>Order status:</b> <br />
                                        {this.firstLetterUpperCase(String(userOrderThisStatus))}
                                    </li>
                                </ul>
                        }

                        <br />
                    </div>
                </div>
            );

        }
    }
}

export default OrderFailPage;


