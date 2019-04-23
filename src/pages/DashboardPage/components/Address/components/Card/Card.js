import React, { Component } from 'react';
import './Card.css';

class Card extends Component {
    render() {
        return (
            <div className="col-xs-12 col-sm-12 col-md-12" align="left">
                <div className="card" id="border">
                    <div className="card-body">
                        <h4 className="card-title"></h4>
                        <ul>
                            <li><b>Address Line 1: </b>{this.props.streetName} {this.props.streetNumber}</li>
                            <li><b>Address Line 2: </b>{this.props.housingCode}</li>
                            <li><b>ZIP/City: </b>{this.props.postalCode} {this.props.city}</li>
                            <li><b>Country: </b>{this.props.country}</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;