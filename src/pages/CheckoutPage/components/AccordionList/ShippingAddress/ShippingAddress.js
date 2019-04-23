import React, { Component } from "react";
import DatabaseList from "./DatabaseList/DatabaseList";
import { Container, Row, Col } from "react-bootstrap";
import InputForm from "./InputForm/InputForm";

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
                <InputForm
                  triggerGetAddresses={this.state.getAddresses}
                  triggerSetShippingInformation={
                    this.props.triggerSetShippingInformation
                  }
                />
              </Col>
              {sessionStorage.getItem("user_id") > 0 ? (
                <Col sm={12} md={8} lg={8}>
                  <DatabaseList
                    triggerSetAddressesFunction={this.setAddressesFunction}
                    triggerSetShippingInformation={
                      this.props.triggerSetShippingInformation
                    }
                  />
                </Col>
              ) : null}
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default ShippingAddress;
