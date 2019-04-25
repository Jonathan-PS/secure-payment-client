import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

class DigitalShippingAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      shippingInformation: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  async componentDidMount() {
    if (sessionStorage.getItem("user_id") > 0) {
      await this.setState({
        shippingInformation: {
          valid: true,
          firstName: "",
          lastName: "",
          receiptEmail: sessionStorage.getItem("email"),
          streetName: "",
          streetNumber: "",
          housingCode: "",
          postalCode: "",
          city: "",
          country: ""
        }
      });

      this.props.triggerSetShippingInformation(this.state.shippingInformation);
    }
  }

  onChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  async onSubmit(e) {
    e.preventDefault();
    await this.setState({
      shippingInformation: {
        valid: true,

        firstName: "",
        lastName: "",
        receiptEmail: this.state.email,
        streetName: "",
        streetNumber: "",
        housingCode: "",
        postalCode: "",
        city: "",
        country: ""
      }
    });
    this.props.triggerSetShippingInformation(this.state.shippingInformation);
  }

  render() {
    return (
      <div id="generalStyle">
        <div label="Address">
          <Container>
            <Row>
              {sessionStorage.getItem("user_id") > 0 ? (
                <Col sm={12} md={4} lg={4}>
                  <b>Selected email:</b>
                  <br />
                  {this.state.shippingInformation.receiptEmail}
                </Col>
              ) : null}
              <Col sm={12} md={4} lg={4}>
                <form onSubmit={this.onSubmit}>
                  <FormGroup controlId="email">
                    Choose Email:
                    <FormControl
                      autoFocus
                      name="email"
                      type="email"
                      placeholder="Email (e.g. ola.nordmann@mail.no)"
                      onChange={this.onChange}
                      defaultValue={this.state.email}
                      required="required"
                    />
                  </FormGroup>
                  <Button block type="submit" variant="dark">
                    Choose
                  </Button>
                </form>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default DigitalShippingAddress;
