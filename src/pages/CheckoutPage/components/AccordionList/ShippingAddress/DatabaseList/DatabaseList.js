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

  getUserInfo() {
    fetch(
      "https://secure-payment-api.herokuapp.com/users/" +
        sessionStorage.getItem("user_id")
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
    /*check if user is logged in */
    let listItems = null;
    if (sessionStorage.getItem("user_id") > 0) {
      let listKey = 1;
      listItems = this.state.allAddresses.map(address => (
        <Col sm={6} md={4} lg={4} key={address.addressId} className="border">
          <div id="generalStyle">
            <p>
              {address.streetName} {address.streetNumber},{" "}
            </p>

            {address.housingCode}
            <p>
              {address.postalCode}, {address.city}, {address.country}
            </p>
          </div>
          <Button
            align="center"
            type="submit"
            onClick={() => this.handleClick(address)}
            variant="success"
          >
            Select
          </Button>
        </Col>
      ));
    }

    return (
      <div align="right">
        <div className="container" id="generalStyle" />

        <Row>{listItems}</Row>
      </div>
    );
  }
}

export default DatabaseList;
