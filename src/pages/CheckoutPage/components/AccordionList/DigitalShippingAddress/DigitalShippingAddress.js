import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

class DigitalShippingAddress extends Component {
  componentDidMount() {
    /*if (sessionStorage.getItem("user_id") > 0 ){
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
    }*/
  }

  render() {
    return (
      <div id="generalStyle">
        <div label="Address">
          <Container>
            <Row>
              <Col sm={12} md={4} lg={4}>
                input form
              </Col>
              {sessionStorage.getItem("user_id") > 0 ? (
                <p>Logged IN email</p>
              ) : null}
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default DigitalShippingAddress;
