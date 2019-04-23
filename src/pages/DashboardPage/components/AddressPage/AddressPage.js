import React, { Component } from 'react';
import AddressList from './components/AddressList/AddressList';

class Address extends Component {
  render() {
    return (
      <div id="generalStyle">
        <AddressList allAddresses={this.props.allAddresses} triggerSetAddressesFunction={this.props.triggerSetAddressesFunction}/>
      </div>
    );
  }
}

export default Address;
