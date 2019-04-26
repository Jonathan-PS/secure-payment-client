import React, { Component } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import "./AddAddressForm.css";
import axios from "axios";

//
class AddressForm extends Component {
  constructor() {
    super();
    this.state = {
      addAddress: {
        streetName: "",
        streetNumber: "",
        housingCode: "",
        city: "",
        postalCode: "",
        country: "",
        registeredUserId: localStorage.getItem("user_id"),
        isCurrent: true
      }
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // onChange sets address at the address from what we set in the constructor
  onChange(e) {
    const address = this.state.addAddress;
    address[e.target.name] = e.target.value;
    this.setState({ addAddress: address });
    console.log(this.state.addAddress);
  }

  /* onSubmit handles what happens when the 'Add address'-button is pressed.
   * It makes an axios-call to put the JSON-object in our database using the
   * correct endpoint /addresses/create.
   */

  async onSubmit(e) {
    e.preventDefault();
    const { addAddress } = this.state;
    console.log("Submit");
    console.log(addAddress);

    await axios
      .put(
        "https://secure-payment-api.herokuapp.com/addresses/create",
        addAddress
      )
      .then(response => {
        console.log(response);
        //this.addAddress();
        this.props.triggerGetAddresses();
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  render() {
    { /* render() renders a form which has the following fields:
      streetName, streetNumber, housingCode, postalCode, city & country
      and a submit-button which sends the data. */ }
    return (
      <div>
        <div id="generalStyle">
          <form onSubmit={this.onSubmit}>
            <FormGroup controlId="streetName">
              Street Name *
              <FormControl
                autoFocus
                name="streetName"
                type="streetName"
                placeholder="Street Name (e.g. Karl Johans gate)"
                onChange={this.onChange}
                defaultValue={this.state.addAddress.streetName}
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
                defaultValue={this.state.addAddress.streetNumber}
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
                defaultValue={this.state.addAddress.housingCode}
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
                defaultValue={this.state.addAddress.postalCode}
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
                defaultValue={this.state.addAddress.city}
                required="required"
              />
            </FormGroup>
            <FormGroup controlId="country">
              Country *
              <FormControl
                autoFocus
                name="country"
                type="country"
                placeholder="Country (e.g. The Domican Republic)"
                onChange={this.onChange}
                defaultValue={this.state.addAddress.country}
                required="required"
              />
            </FormGroup>
            <Button block type="submit" variant="dark">
              Add Address
            </Button>
          </form>
          <br/><br/>
        </div>
      </div>
    );
  }
}

export default AddressForm;
