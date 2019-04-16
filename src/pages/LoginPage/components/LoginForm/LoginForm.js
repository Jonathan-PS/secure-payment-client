import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./LoginForm.css";
import "./../../../../App.css";

class LoginForm extends Component {
  state = {
    email: "",
    password: ""
  };

  /* Checks whether email and password are typed in at all */
  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  /* Handles user inputs into the fields of email and password. */
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  /* Handles what happens when the user pushes "Login"  */
  /* NOT FINISHED */
  handleSubmit = async event => {
    event.preventDefault(); // Stops the page from reloading

    alert("Attempted to login with: " + this.state.email);

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
            <FormGroup controlId="email" bsSize="large">
              Email
              <FormControl
                autoFocus
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">
              Password
              <FormControl
                value={this.state.password}
                onChange={this.handleChange}
                type="password"
              />
            </FormGroup>
            <Button
              block
              bsSize="large"
              disabled={!this.validateForm()}
              type="submit" variant="dark"
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
