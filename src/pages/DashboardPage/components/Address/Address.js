import React, { Component } from 'react';
import AddressList from './AddressList/AddressList';

class Address extends Component {
  render() {
    return (
      <div id="generalStyle">
        <AddressList allAddresses={this.props.allAddresses} />
      </div>
    );
  }
}

export default Address;
