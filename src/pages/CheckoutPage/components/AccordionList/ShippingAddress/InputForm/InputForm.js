import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./InputForm.css";
import axios from "axios";

class InputForm extends Component {
  constructor() {
    super();
    this.state = {
      valid: true,
      firstName: "",
      lastName: "",
      receiptEmail: "",
      streetName: "",
      streetNumber: "",
      housingCode: "",
      city: "",
      postalCode: "",
      country: "",
      registeredUserId: localStorage.getItem("user_id"),
      isCurrent: true
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  async onSubmit(e) {
    e.preventDefault();
    const addAddress = {
      streetName: this.state.streetName,
      streetNumber: this.state.streetNumber,
      housingCode: this.state.housingCode,
      city: this.state.city,
      postalCode: this.state.postalCode,
      country: this.state.country,
      registeredUserId: this.state.registeredUserId,
      isCurrent: this.state.isCurrent
    };
    console.log("Submit");
    console.log(addAddress);

    if (localStorage.getItem("user_id") > 0) {
      await fetch(
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

      await axios
        .put(
          "https://secure-payment-api.herokuapp.com/addresses/create",
          addAddress
        )
        .then(response => {
          console.log(response);
          this.props.triggerGetAddresses();
        })
        .catch(error => {
          console.log(error.response);
        });
    }

    this.props.triggerSetShippingInformation(this.state);
  }

  render() {
    return (
      <div>
        <div className="Login" id="generalStyle">
          <form onSubmit={this.onSubmit}>
            {localStorage.getItem("user_id") > 0 ? null : (
              <div>
                <FormGroup controlId="firstName">
                  First Name *
                  <FormControl
                    autoFocus
                    name="firstName"
                    type="firstName"
                    placeholder="First Name (e.g. Ola)"
                    onChange={this.onChange}
                    defaultValue={this.state.firstName}
                    required="required"
                  />
                </FormGroup>
                <FormGroup controlId="lastName">
                  Last Name *
                  <FormControl
                    autoFocus
                    name="lastName"
                    type="lastName"
                    placeholder="Last Name (e.g. Nordmann)"
                    onChange={this.onChange}
                    defaultValue={this.state.lastName}
                    required="required"
                  />
                </FormGroup>
                <FormGroup controlId="receiptEmail">
                  Receipt Email *
                  <FormControl
                    autoFocus
                    name="receiptEmail"
                    type="receiptEmail"
                    placeholder="Street Name (e.g. ola.nordmann@mail.no)"
                    onChange={this.onChange}
                    defaultValue={this.state.receiptEmail}
                    required="required"
                  />
                </FormGroup>
              </div>
            )}

            <FormGroup controlId="streetName">
              Street Name *
              <FormControl
                autoFocus
                name="streetName"
                type="streetName"
                placeholder="Street Name (e.g. Karl Johans gate)"
                onChange={this.onChange}
                defaultValue={this.state.streetName}
                required="required"
              />
            </FormGroup>
            <FormGroup controlId="streetNumber">
              Street Number *
              <FormControl
                autoFocus
                name="streetNumber"
                type="streetNumber"
                placeholder="Street number (e.g. 666)"
                onChange={this.onChange}
                defaultValue={this.state.streetNumber}
                required="required"
              />
            </FormGroup>
            <FormGroup controlId="housingCode">
              Housing Code
              <FormControl
                autoFocus
                name="housingCode"
                type="housingCode"
                placeholder="Housing Code (e.g. H0301)"
                onChange={this.onChange}
                defaultValue={this.state.housingCode}
              />
            </FormGroup>
            <FormGroup controlId="postalCode">
              Postal Code *
              <FormControl
                autoFocus
                name="postalCode"
                type="postalCode"
                placeholder="Postal Code (e.g. 3050)"
                onChange={this.onChange}
                defaultValue={this.state.postalCode}
                required="required"
              />
            </FormGroup>
            <FormGroup controlId="city">
              City *
              <FormControl
                autoFocus
                name="city"
                type="city"
                placeholder="City (e.g. Melbourne)"
                onChange={this.onChange}
                defaultValue={this.state.city}
                required="required"
              />
            </FormGroup>
            <FormGroup controlId="country">
              City *
              <FormControl
                autoFocus
                name="country"
                type="country"
                placeholder="Country (e.g. The Domican Republic)"
                onChange={this.onChange}
                defaultValue={this.state.country}
                required="required"
              />
            </FormGroup>
            <Button block type="submit" variant="dark">
              Add Address
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default InputForm;
