import React, { Component } from "react";
import ShippingAddressList from "./ShippingAddressList/ShippingAddressList";
import { Container, Row, Col } from "react-bootstrap";
import ShippingAddressForm from "./ShippingAddressForm/ShippingAddressForm";

class ShippingAddress extends Component {
  state = {
    getAddresses: null /* Saves products by their productId */
  };

  constructor(props) {
    super(props);
    this.setAddressesFunction = this.setAddressesFunction.bind(this);
  }

  setAddressesFunction(getAddresses) {
    this.setState({
      getAddresses: getAddresses
    });
  }

  render() {
    return (
      <div id="generalStyle">
        <div label="Address">
          <Container>
            <Row>
              <Col sm={12} md={4} lg={4}>
                <ShippingAddressForm
                  triggerGetAddresses={this.state.getAddresses}
                />
              </Col>
              <Col sm={12} md={8} lg={8}>
                <ShippingAddressList
                  triggerSetAddressesFunction={this.setAddressesFunction}
                />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default ShippingAddress;
