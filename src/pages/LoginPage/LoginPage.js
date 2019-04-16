import React, { Component } from "react";
import "./LoginPage.css";
import "./../../App.css";
import LoginForm from "./components/LoginForm/LoginForm";

class LoginPage extends Component {
  render() {
    return (
      <div id="generalStyle">
        <br />
        <h4>Login</h4>
        <hr />
        <LoginForm />
      </div>
    );
  }
}

export default LoginPage;
