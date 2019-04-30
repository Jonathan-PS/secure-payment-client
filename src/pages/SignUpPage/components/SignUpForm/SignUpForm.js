import React, { Component } from "react";
import { Button, FormGroup, FormControl, ProgressBar } from "react-bootstrap";
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
        password: "",

        livePassword: "" // use for password strength meter
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

  // Used a separate for password to use Password Strength Meter
  onPasswordChange = e => {
    this.setState({ livePassword: e.target.value });
    this.onChange(e)
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

  

  

  // PASSWORD STRENGTH FEEDBACK
  passwordStrength(pw) {
    if (pw < 0 || pw === 0) {
      return " "
    } else if (pw > 0 && pw <= 5) {
      return <div>
        <small>Password strength: <b>Poor</b></small>
        <ProgressBar variant="danger" now={30} />
      </div>
    } else if (pw >= 6 && pw <= 10) {
      return <div>
        <small>Password strength: <b>OK</b></small>
        <ProgressBar variant="warning" now={60} />
      </div>
    } else {
      return <div>
      <small>Password strength: <b>Strong</b></small>
      <ProgressBar variant="success" now={100} />
    </div>
    }
  }


  render() {

    let { livePassword } = this.state;

    // before onChange is called, it's set to undefined. Setting to empty.
    if (String(livePassword) === "undefined") {
      livePassword = ""
    }

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
              //autoFocus
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
              //autoFocus
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
              //autoFocus
              name="password"
              type="password"
              //onChange={e => this.setState({ livePassword: e.target.value })} // Update "livePassword"
              //onChange={this.onChange}
              //onChange={this.onPasswordChange}
              onChange={this.onPasswordChange}
              defaultValue={this.state.registerUser.password}
              required="required"
            />
          </FormGroup>
          { // Present Password Strength (if at least one letter/number is written in)
            (String(livePassword).length > 0) ?
              <div>{this.passwordStrength(String(livePassword).length)}<br /></div> 
              : <p><br /></p>
          }



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
