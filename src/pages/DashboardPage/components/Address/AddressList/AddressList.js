import React, { Component} from 'react';
import { Button } from "react-bootstrap";
import './AddressList.css';
import "./../../../../../App.css";

class AddressList extends Component {
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
    let listKey = 1;
    const listItems = this.state.allAddresses.map(addresses => (
      <tr key={listKey++}>
        <th scope="row"></th>
        <td><input type="radio" name="myGroupName" onChange={this.onChange}>{this.props.myValue}</input></td>
        <td>{addresses.streetName}</td>
        <td>{addresses.streetNumber}</td>
        <td>{addresses.housingCode}</td>
        <td>{addresses.postalCode}</td>
        <td>{addresses.city}</td>
        <td>{addresses.country}</td>
      </tr>
    ));

    return (
      <div align="right">
        <div className="container" id="generalStyle">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col" />
                <th scope="col">Select</th>
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
        <Button type="submit" variant="dark">
          Change address
        </Button>
      </div>
    );
  }
}

export default AddressList;
