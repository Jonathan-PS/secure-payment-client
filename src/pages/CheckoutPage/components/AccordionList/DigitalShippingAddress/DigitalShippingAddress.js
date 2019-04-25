import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import { Popover, OverlayTrigger } from "react-bootstrap";

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
    if (localStorage.getItem("user_id") > 0) {
      await this.setState({
        shippingInformation: {
          valid: true,
          firstName: "",
          lastName: "",
          receiptEmail: localStorage.getItem("email"),
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

    // BUTTON POPOVER
    const popover = (
      <Popover id="popover-basic" title="Thank you!">
        Email added
      </Popover>
    );

    return (
      <div id="generalStyle">
        <div label="Address">
          <Container>
            <Row>

              {localStorage.getItem("user_id") > 0 ? (
                <Col sm={12} md={4} lg={4}>
                  <b>Selected email:</b>
                  <br />
                  {this.state.shippingInformation.receiptEmail}
                </Col>
              ) : null}
              <Col sm={12} md={4} lg={4}>
                <form onSubmit={this.onSubmit}>
                  <FormGroup controlId="email">
                    <b>Choose another email:</b>
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
                  { /* IF EMAIL IS FILLED IN */
                    (this.state.email) ?
                      <div>
                        {/* BUTTON POPOVER (OverLayTrigger) */}
                        <OverlayTrigger trigger="click" placement="right" overlay={popover} >
                          <Button block type="submit" variant="dark">
                            Choose
                          </Button>
                        </OverlayTrigger>
                      </div>
                      :
                      <div>
                        {/* NON-CLICKABLE BUTTON */}
                        <Button block type="submit" disabled variant="dark">
                          Choose
                        </Button>
                      </div>
                  }
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
