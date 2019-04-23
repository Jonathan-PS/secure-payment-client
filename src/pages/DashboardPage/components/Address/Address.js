import React, { Component } from 'react';
import Card from './components/Card/Card';

import './Address.css';

class Address extends Component {
  state = {
    allAddresses: []
  };

  constructor(props) {
    super(props);
    this.getAddresses = this.getAddresses.bind(this);
  }

  getAddresses = event => {
    fetch('http://secure-payment-api.herokuapp.com/addresses/users/' + sessionStorage.getItem('user_id'))
        .then(resp => resp.json())
        .then(data => {
          console.log(data);
          this.setState({
            allAddresses: this.state.allAddresses.concat(data)
          });
        })
        .catch(err => {});
  }

  componentDidMount() {
    this.getAddresses();
    this.props.triggerSetAddressesFunction(this.getAddresses);
  }

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
        <div className="row" id="margins">{cards}</div>
      </div>
    );
  }
}

export default Address;
