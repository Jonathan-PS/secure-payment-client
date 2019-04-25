import React, { Component } from "react";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import "./SignUpPage.css";
import "./../../App.css";

class SignUpPage extends Component {
  render() {
    return (
      <div id="generalStyle">
        <h4>Sign Up</h4>
        <hr />
        {localStorage.getItem("user_id") < 1 ? (
          <SignUpForm />
        ) : (
          (window.location = "/")
        )}
      </div>
    );
  }
}

export default SignUpPage;
