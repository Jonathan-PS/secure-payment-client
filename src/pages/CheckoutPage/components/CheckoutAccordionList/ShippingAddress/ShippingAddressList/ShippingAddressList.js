import React, { Component } from "react";
import { Button, Row, Col } from "react-bootstrap";
import "./ShippingAddressList.css";

class ShippingAddressList extends Component {
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
        <Col sm={6} md={4} lg={4} key={addresses.addressId} className="border">
          <div id="generalStyle">
            <p>
              {addresses.streetName} {addresses.streetNumber},{" "}
            </p>

            {addresses.housingCode}
            <p>
              {addresses.postalCode}, {addresses.city}, {addresses.country}
            </p>
          </div>
          <Button align="center" type="submit" variant="success">
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

export default ShippingAddressList;
