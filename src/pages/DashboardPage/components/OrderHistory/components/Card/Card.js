import React, { Component } from 'react';
import { Button } from "react-bootstrap";
import './Card.css';

class Card extends Component {
    render() {
        { /* This component basically makes the card that is used to display the orders.
        * It gets the data from OrderHistory.js and displays it the way we want to */ } 
        return (
            <div className="col-xs-12 col-sm-12 col-md-12" align="left">
                <div className="card" id="border">
                    <div className="card-body">
                        <h4 className="card-title"></h4>
                        <ul>
                            <li><b>Order #: </b>{this.props.userOrderId}</li>
                            <li><b>Shipped to: </b>{this.props.shippingAddress}</li>
                            <li><b>Date created: </b>{this.props.createdAt}</li>
                            <li><b>Date updated: </b> {this.props.updatedAt}</li>
                            <li><b>Order status: </b>{this.props.status}</li>
                            <Button block type="submit" variant="dark">
                                View order
                            </Button>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;