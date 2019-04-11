import React, { Component } from "react";
import "./LoginPage.css";
import LoginForm from "./components/LoginForm/LoginForm";

class LoginPage extends Component {
  render() {
    return (
      <div>
        <br />
        <h4>Login</h4>
        <hr />
        <LoginForm />
      </div>
    );
  }
}

export default LoginPage;
