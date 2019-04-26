import React, { Component } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import "./SignUpForm.css";
import axios from "axios";

class SignUpForm extends Component {
  constructor() {
    super();
    this.state = {
      registerUser: {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      }
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.loginUser = this.loginUser.bind(this);
  }

  onChange(e) {
    const user = this.state.registerUser;
    user[e.target.name] = e.target.value;
    this.setState({ registerUser: user });
  }

  async onSubmit(e) {
    e.preventDefault();
    const { registerUser } = this.state;

    // First register user in db
    await axios
      .put(
        "https://secure-payment-api.herokuapp.com/users/create",
        registerUser
      )
      .then(response => {
        this.loginUser();
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  async loginUser() {
    try {
      const user_query = {
        email: this.state.registerUser.email,
        password: this.state.registerUser.password
      };
      await axios
        .post(
          "https://secure-payment-api.herokuapp.com/users/login",
          user_query
        )
        .then(response => {
          if (response.data < 1) {
            alert("login failed");
          } else {
            localStorage.setItem("user_id", response.data);
            localStorage.setItem("email", this.state.registerUser.email);

            window.location = "/dashboard";
          }
        })
        .catch(error => {
          alert("In catch - " + error);
        });
    } catch (e) {
      alert("Login failed - Wrong email or password \n" + e);
    }
  }

  render() {
    return (
      <div className="Login" id="generalStyle">
        <form onSubmit={this.onSubmit}>
          <FormGroup controlId="firstName">
            First Name
            <FormControl
              autoFocus
              name="firstName"
              type="firstName"
              onChange={this.onChange}
              defaultValue={this.state.registerUser.firstName}
              required="required"
            />
          </FormGroup>
          <FormGroup controlId="lastName">
            Last Name
            <FormControl
              autoFocus
              name="lastName"
              type="lastName"
              onChange={this.onChange}
              defaultValue={this.state.registerUser.lastName}
              required="required"
            />
          </FormGroup>
          <FormGroup controlId="email">
            Email
            <FormControl
              autoFocus
              name="email"
              type="email"
              onChange={this.onChange}
              defaultValue={this.state.registerUser.email}
              required="required"
            />
          </FormGroup>
          <FormGroup controlId="password">
            Password
            <FormControl
              autoFocus
              name="password"
              type="password"
              onChange={this.onChange}
              defaultValue={this.state.registerUser.password}
              required="required"
            />
          </FormGroup>

          <Button
            block
            type="submit"
            variant="dark"
          >
            Sign Up
          </Button>
        </form>
      </div>
    );
  }
}

export default SignUpForm;
