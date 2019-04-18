import React, { Component } from "react";
import "./Address.css";
import "./../../../../App.css";
import AddressCard from "./AddressCard/AddressCard";

class Address extends Component {
  state = {
    allAddresses: []
  };

  componentDidMount() {
    fetch("https://secure-payment-api.herokuapp.com/addresses/users/" + sessionStorage.getItem("user_id"))
    .then(resp => resp.json())
    .then(data => {
      console.log(data);
      this.setState({
        allAddresses: data
      });
    })
    .catch(err => {});
  }

  render() {
    const cards = this.state.allAddresses.map(addresses => (
      <AddressCard
        key={addresses.addressId}
        streetName={addresses.streetName}
        streetNumber={addresses.streetNumber}
        housingCode={addresses.housingCode}
        postalCode={addresses.postalCode}
        city={addresses.city}
        country={addresses.country}
        addressId={addresses.addressId}
        registeredUserId={addresses.registeredUserId}
        isActive={addresses.active}
      />
    ));

    return (
      <div id="generalStyle">
        <div className="row">{cards}</div>
      </div>
    );
  }
}

export default Address;
