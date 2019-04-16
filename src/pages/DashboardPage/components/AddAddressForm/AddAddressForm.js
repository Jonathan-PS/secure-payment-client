import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./AddAddressForm.css";
import "./../../../../App.css";

class AddressForm extends Component {
  state = {
    street_name: "",
    house_number: "",
    housing_code: "",
    city: "",
    postal_code: null,
    country: ""
  };

  /* Checks whether email and password are typed in at all */
  validateForm() {
    return (
      this.state.street_name.length > 0 &&
      this.state.house_number.length > 0 &&
      this.state.city.length > 0 &&
      this.state.postal_code.length > 0 &&
      this.state.country.length > 0
    );
  }

  /* Handles user inputs into the fields of email and password. */
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  /* Handles what happens when the user pushes "Add Address"  */
  /* NOT FINISHED */
  handleSubmit = async event => {
    event.preventDefault(); // Stops the page from reloading

    alert("Attempted to add address : " + this.state.street_name);

    /* NOT DONE - authenticate user with the database */
    /*try {
      const user_query = {
        username_email: this.state.email,
        password: this.state.password
      };

      await fetch("http://restaurants-reviews-api.herokuapp.com/login", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(user_query)
      })
        .then(resp => resp.json())
        .then(data => {
          //console.log(data)
          sessionStorage.setItem("username", data[0].username);
          sessionStorage.setItem("user_id", data[0].user_id);
          sessionStorage.setItem("email", data[0].email);
          sessionStorage.setItem("role", data[0].role);
          window.location.reload();
        });

      if (sessionStorage.getItem("username") != null) {
        window.location = "/dashboard";
      } else {
        alert("login failed");
        window.location = "/login";
      }
    } catch (e) {
      alert("Login failed - Wrong Email or password");
    }*/
  };

  render() {
    return (
      <div>
        <div className="Login" id="generalStyle">
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="street_name" bsSize="large">
              Street Name *
              <FormControl placeholder="Street Name (e.g. Karl Johans gate)" autoFocus type="street_name" value={this.state.street_name} onChange={this.handleChange} />
            </FormGroup>
            <FormGroup controlId="house_number" bsSize="large">
              House Number *
              <FormControl placeholder="House Number (e.g. 3A)" value={this.state.house_number} onChange={this.handleChange} type="house_number" />
            </FormGroup>
            <FormGroup controlId="housing_code" bsSize="large">
              Housing Code (optional)
              <FormControl placeholder="Housing Code (e.g. H0301)" value={this.state.housing_code} onChange={this.handleChange} type="housing_code" />
            </FormGroup>
            <FormGroup controlId="postal_code" bsSize="large">
              Postal Code *
              <FormControl placeholder="Postal Code" value={this.state.postal_code} onChange={this.handleChange} type="postal_code" />
            </FormGroup>
            <FormGroup controlId="city" bsSize="large">
              City *
              <FormControl placeholder="City" value={this.state.city} onChange={this.handleChange} type="city" />
            </FormGroup>
            <FormGroup controlId="country" bsSize="large">
              Country *
              <FormControl placeholder="Country" value={this.state.country} onChange={this.handleChange} type="country" />
            </FormGroup>
            <Button block bsSize="large" disabled={!this.validateForm()} type="submit">
              Add Address
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default AddressForm;
