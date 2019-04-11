import React, { Component } from "react";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import "./SignUpPage.css";

class SignUpPage extends Component {
  render() {
    return (
      <div>
        <br />
        <h4>Sign Up</h4>
        <hr />
        <SignUpForm />
      </div>
    );
  }
}

export default SignUpPage;
