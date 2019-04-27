import React, { Component } from 'react';
import './Card.css';

class Card extends Component {

    /* Use on Strings to make first letter Uppercase */
    firstLetterUpperCase(word) {
        const firstLetter = word.substring(0, 1).toUpperCase()
        const restOfLetters = word.substring(1, word.length)
        return firstLetter + restOfLetters
    }

    render() {
        /* This component basically makes the card that is used to display the addresses.
           * It gets the data from Address.js and displays it the way we want to */
        return (
            <div className="col-xs-12 col-sm-12 col-md-12" align="left">
                <div className="card" id="border">
                    <div className="card-body">
                        <ul>
                            <li><b>Address Line 1: </b>{this.firstLetterUpperCase(this.props.streetName)} {this.props.streetNumber}</li>
                            <li><b>Address Line 2: </b>{this.props.housingCode}</li>
                            <li><b>ZIP/City: </b>{this.props.postalCode} {this.firstLetterUpperCase(this.props.city)}</li>
                            <li><b>Country: </b>{this.firstLetterUpperCase(this.props.country)}</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;