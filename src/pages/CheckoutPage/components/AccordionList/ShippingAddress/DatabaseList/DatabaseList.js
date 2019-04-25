import React, { Component } from "react";
import { Button, Row, Col } from "react-bootstrap";
import "./DatabaseList.css";
import axios from "axios";

class DatabaseList extends Component {
  state = {
    firstName: "",
    lastName: "",
    receiptEmail: "",
    allAddresses: []
  };

  constructor(props) {
    super(props);
    this.getAddresses = this.getAddresses.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
  }

  // Adds a product to the cart
  getAddresses = event => {
    fetch(
      "https://secure-payment-api.herokuapp.com/addresses/users/" +
        localStorage.getItem("user_id")
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

  getUserInfo() {
    fetch(
      "https://secure-payment-api.herokuapp.com/users/" +
        localStorage.getItem("user_id")
    )
      .then(resp => resp.json())
      .then(data => {
        console.log(data);

        this.setState({
          firstName: data.firstName,
          lastName: data.lastName,
          receiptEmail: data.email
        });
      })
      .catch(err => {});
  }

  componentDidMount() {
    this.getAddresses();
    this.getUserInfo();
  }

  handleClick(address) {
    const shippingInformation = {
      valid: true,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      receiptEmail: this.state.receiptEmail,
      streetName: address.streetName,
      streetNumber: address.streetNumber,
      housingCode: address.housingCode,
      city: address.city,
      postalCode: address.postalCode,
      country: address.country
    };
    this.props.triggerSetShippingInformation(shippingInformation);
  }

  render() {
    
    let listItems = null;

    /*check if user is logged in */
    if (localStorage.getItem("user_id") > 0) {
      let listKey = 1;
      listItems = this.state.allAddresses.map(address => (
        
        <Col sm={6} md={4} lg={5} key={address.addressId} className="existingAddressBox border">
          <div className="existingAddress">
          <h6><b>Existing address</b></h6>
            <p>
              {address.streetName} {address.streetNumber},{" "}
              {address.housingCode}
              {address.postalCode}, {address.city}, {address.country}
            </p>
          </div>
          <div className="button">
            <Button
              align="center"
              type="submit"
              onClick={() => this.handleClick(address)}
              variant="success"
            >
              Select
            </Button>
          </div>
        </Col>
      ));
    }

    return (
      <div align="right">
        <div className="container" id="generalStyle" />
        <Row><h6>&nbsp;&nbsp;&nbsp; Select an existing address</h6></Row>
        <Row>{listItems}</Row>
      </div>
    );
  }
}

export default DatabaseList;
