import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./SignUpForm.css";
import "./../../../../App.css";
import axios from 'axios';

class SignUpForm extends Component {
  state = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    redirectToReferrer: false
  };

  /* Checks that required fields are filled */
  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.first_name.length > 0 &&
      this.state.last_name.length > 0
    );
  }

  /* Handles user inputs into the fields of email and password. */
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  /* Sign up on button click: NOT FINISHED */

  handleSubmit = event => {
    alert("You tried to sign up with " + this.state.email);

    /* try {
      // get our form data out of state
      const { email, password, first_name, last_name } = this.state;

      axios
        .put("localhost:9090/users/create", {
          email,
          password,
          first_name,
          last_name
        })
        .then(result => {
          //access the results here....
          this.setState = {
            password: "",
            email: "",
            redirectToReferrer: true
          };
          window.location = "/login";
        })
        .catch(err => {
          console.log(err);
        });
    } catch (e) {
      console.log(e);
    }*/
  };

  render() {
    return (
      <div>
        <div className="Login" id="generalStyle">
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="first_name" bsSize="large">
              First Name
              <FormControl autoFocus type="first_name" value={this.state.first_name} onChange={this.handleChange}/>
            </FormGroup>
            <FormGroup controlId="last_name" bsSize="large">
              Last Name
              <FormControl autoFocus type="last_name" value={this.state.last_name} onChange={this.handleChange} />
            </FormGroup>
            <FormGroup controlId="email" bsSize="large">
              Set Email
              <FormControl autoFocus type="email" value={this.state.email} onChange={this.handleChange}/>
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">
              Set Password
              <FormControl value={this.state.password} onChange={this.handleChange} type="password"/>
            </FormGroup>
            <Button block bsSize="large" disabled={!this.validateForm()} type="submit">
              Sign Up
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default SignUpForm;
