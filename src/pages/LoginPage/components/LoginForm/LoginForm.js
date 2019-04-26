import React, { Component } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import "./LoginForm.css";
import axios from "axios";

class LoginForm extends Component {
  state = {
    email: "",
    password: ""
  };

  /* Handles user inputs into the fields of email and password. */
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  /* Handles what happens when the user pushes "Login"  */
  handleSubmit = async event => {
    event.preventDefault(); // Stops the page from reloading

    try {
      const user_query = {
        email: this.state.email,
        password: this.state.password
      };

      axios
        .post(
          "https://secure-payment-api.herokuapp.com/users/login",
          user_query
        )
        .then(response => {
          if (response.data < 1) {
            window.location = "/login";
          } else {
            localStorage.setItem("user_id", response.data);
            localStorage.setItem("email", this.state.email);

            //alert("Logged in with user_id: " + localStorage.getItem("user_id"));
            window.location = "/dashboard";
          }
        })
        .catch(error => {
          alert("In catch - " + error);
        });
    } catch (e) {
      alert("Login failed - Wrong Email or password");
    }
  };

  render() {
    return (
      <div>
        <div className="Login" id="generalStyle">
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="email">
              Email
              <FormControl
                autoFocus
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
                required="required"
              />
            </FormGroup>
            <FormGroup controlId="password">
              Password
              <FormControl
                value={this.state.password}
                onChange={this.handleChange}
                type="password"
                required="required"
              />
            </FormGroup>
            <Button
              block
              type="submit"
              variant="dark"
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
