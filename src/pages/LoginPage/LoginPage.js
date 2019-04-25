import React, { Component } from "react";
import "./LoginPage.css";
import "./../../App.css";
import LoginForm from "./components/LoginForm/LoginForm";

class LoginPage extends Component {
  render() {
    return (
      <div id="generalStyle">
        <h4>Login</h4>
        <hr />
        {localStorage.getItem("user_id") < 1 ? (
          <LoginForm />
        ) : (
          (window.location = "/")
        )}
      </div>
    );
  }
}

export default LoginPage;
