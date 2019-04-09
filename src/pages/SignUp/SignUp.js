import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

class SignUp extends Component {
  state = {
    email: "",
    password: "",
    redirectToReferrer: false
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

  /* Sign up on button click: NOT FINISHED */

  handleSubmit = event => {
    alert("You tried to sign up with " + this.state.email);
    /*
    try {
      // get our form data out of state
      const { email, password } = this.state;

      axios
        .post("https://restaurants-reviews-api.herokuapp.com/user/create/", {
          email,
          password
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
        <br />
        <h4>Sign Up</h4>
        <hr />
        <div className="Login">
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="email" bsSize="large">
              Set Email
              <FormControl
                autoFocus
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">
              Set Password
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
              type="submit"
            >
              Sign Up
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;
