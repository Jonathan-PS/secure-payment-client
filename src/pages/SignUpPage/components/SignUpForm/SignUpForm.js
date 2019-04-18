import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./SignUpForm.css";
import "./../../../../App.css";
import axios from 'axios';

class SignUpForm extends Component {
  constructor() {
    super();
    this.state = {
      registerUser: {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      }
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    const user = this.state.registerUser;
    user[e.target.name] = e.target.value;
    this.setState({registerUser: user});
    console.log(this.state.registerUser)
  }

  onSubmit(e) {
    e.preventDefault();
    const {registerUser} = this.state;
    console.log('Submit');
    console.log(registerUser);

    axios.put('https://secure-payment-api.herokuapp.com/users/create', registerUser)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error.response)
      });
  }

  render() {
    return (
      <div className="Login" id="generalStyle">
        <form onSubmit={this.onSubmit}>
          <FormGroup controlId="firstName" bsSize="large">
            First Name
            <FormControl autoFocus name="firstName" type="firstName" onChange={this.onChange}
              defaultValue={this.state.registerUser.firstName} required="required"/>
          </FormGroup>
          <FormGroup controlId="lastName" bsSize="large">
            Last Name
            <FormControl autoFocus name="lastName" type="lastName" onChange={this.onChange}
              defaultValue={this.state.registerUser.lastName} required="required"/>
          </FormGroup>
          <FormGroup controlId="email" bsSize="large">
            Email
            <FormControl autoFocus name="email" type="email" onChange={this.onChange}
              defaultValue={this.state.registerUser.email} required="required"/>
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            Password
            <FormControl autoFocus name="password" type="password" onChange={this.onChange}
              defaultValue={this.state.registerUser.password} required="required"/>
          </FormGroup>

          <Button block bsSize="large" type="submit" variant="dark">
            Sign Up
          </Button>
        </form>
      </div>
    );
  }
}

export default SignUpForm;
