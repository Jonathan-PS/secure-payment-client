import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./SignUpForm.css";
import "./../../../../App.css";
import axios from 'axios';

class SignUpForm extends Component {
  constructor() {
    super();
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      redirectToReferrer: false
    };
  }

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.first_name.length > 0 &&
      this.state.last_name.length > 0
    );
  }

  onChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  onSubmit = async (e) => {
    e.preventDefault(); // Stops the page from reloading

    const { first_name, last_name, email, password } = this.state;

    axios.put('http://localhost:9090/users/create', { first_name, last_name, email, password })
      .then((result) => {
        this.setState = {
          first_name: '',
          last_name: '',
          email: '',
          password: '',
        };
    })
  }

  render() {
    const { first_name, last_name, email, password } = this.state;
    return (
      <div>
        <div className="Login" id="generalStyle">
          <form onSubmit={this.onChange}>
            <FormGroup controlId="first_name" bsSize="large">
              First Name
              <FormControl autoFocus type="text" value={first_name} onChange={this.onChange}/>
            </FormGroup>
            <FormGroup controlId="last_name" bsSize="large">
              Last Name
              <FormControl autoFocus type="text" value={last_name} onChange={this.onChange} />
            </FormGroup>
            <FormGroup controlId="email" bsSize="large">
              Set Email
              <FormControl autoFocus type="text" value={email} onChange={this.onChange}/>
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">
              Set Password
              <FormControl type="password" value={password} onChange={this.onChange} />
            </FormGroup>
            <Button block bsSize="large" disabled={!this.validateForm()} type="submit" variant="dark">
              Sign Up
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default SignUpForm;
