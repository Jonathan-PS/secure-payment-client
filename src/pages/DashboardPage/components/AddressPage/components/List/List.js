import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "./AddressList.css";

class AddressList extends Component {
  state = {
    allAddresses: []
  };

  constructor(props) {
    super(props);
    this.getAddresses = this.getAddresses.bind(this);
  }

  // Adds a product to the cart
  getAddresses = event => {
    fetch(
      "https://secure-payment-api.herokuapp.com/addresses/users/" +
        sessionStorage.getItem("user_id")
    )
      .then(resp => resp.json())
      .then(data => {
        console.log(data);

        this.setState({
          allAddresses: data
        });
      })
      .catch(err => {});
  };

  componentDidMount() {
    this.getAddresses();
    this.props.triggerSetAddressesFunction(this.getAddresses);
  }

  render() {
    /*check if user is logged in */
    let listItems = null;
    if (sessionStorage.getItem("user_id") > 0) {
      let listKey = 1;
      listItems = this.state.allAddresses.map(addresses => (
        <tr key={listKey++}>
          <th scope="row" />
          <td>{addresses.streetName}</td>
          <td>{addresses.streetNumber}</td>
          <td>{addresses.housingCode}</td>
          <td>{addresses.postalCode}</td>
          <td>{addresses.city}</td>
          <td>{addresses.country}</td>
        </tr>
      ));
    }

    return (
      <div align="right">
        <div className="container" id="generalStyle">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col" />
                <th scope="col">Street</th>
                <th scope="col">Number</th>
                <th scope="col">Apt</th>
                <th scope="col">Postal Code</th>
                <th scope="col">City</th>
                <th scope="col">Country</th>
              </tr>
            </thead>
            <tbody>{listItems}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default AddressList;
