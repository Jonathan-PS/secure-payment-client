import React, { Component } from "react";
import Card from "./components/Card/Card";

import "./Address.css";

class Address extends Component {
  state = {
    allAddresses: [],
    allAddresses2: []
  };

  constructor(props) {
    super(props);
    this.getAddresses = this.getAddresses.bind(this);
  }

  /* getAddresses() gets the addresses using fetch. It appends the stored user_id to make sure that
   *  we serve the correct addresses to the user that is currently logged in */
  getAddresses = event => {
    
    fetch(
      "https://secure-payment-api.herokuapp.com/addresses/users/" +
        localStorage.getItem("user_id")
    )
      .then(resp => resp.json())
      .then(data => {
        //console.log(data);
        this.setState({
          allAddresses2: this.state.allAddresses,
          allAddresses: this.state.allAddresses.concat(data)
        });
      })
      .catch(err => {});
  };

  componentDidMount() {
    this.getAddresses();
    //this.props.triggerSetAddressesFunction(this.getAddresses);
  }

  // Rendering and returning the cards on screen using the layout from Card.js
  render() {
    
    const cards = this.state.allAddresses.map(addresses => (
      <Card
        key={addresses.addressId}
        streetName={addresses.streetName}
        streetNumber={addresses.streetNumber}
        housingCode={addresses.housingCode}
        postalCode={addresses.postalCode}
        city={addresses.city}
        country={addresses.country}
      />
    ));
    
    return (
      
      <div id="generalStyle">
        <div className="row" id="margins"> {/* key={this.state.addresses.addressId} */}
          {cards}
        </div>
      </div>
    );
  }
}

export default Address;
