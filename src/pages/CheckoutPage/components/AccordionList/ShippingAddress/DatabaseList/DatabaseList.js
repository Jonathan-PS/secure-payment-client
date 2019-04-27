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
    axios
    .get(
      "https://secure-payment-api.herokuapp.com/addresses/users/" +
        localStorage.getItem("user_id")
    )
      //.then(resp => resp.json())
      .then(response => {
        //console.log(response);

        this.setState({
          allAddresses: response.data
        });
      })
      .catch(err => {});
  };

  getUserInfo() {
    axios
    .get(
      "https://secure-payment-api.herokuapp.com/users/" +
        localStorage.getItem("user_id")
    )
      .then(response => {
        //console.log(data);

        this.setState({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          receiptEmail: response.data.email
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
    /*check if user is logged in */
    let listItems = null;
    if (localStorage.getItem("user_id") > 0) {
      //let listKey = 1;
      listItems = this.state.allAddresses.map(address => (
        <Col sm={6} md={5} lg={5} key={address.addressId} className="border existingAddressBox">
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
        {
          (localStorage.getItem("user_id") > 0) ? 
          <div><Row><h6>&emsp; Select an existing address:</h6></Row></div> 
          : 
          <div></div>
          }

        <Row>{listItems}</Row>
        <br/><br/>
      </div>
    );
  }
}

export default DatabaseList;
