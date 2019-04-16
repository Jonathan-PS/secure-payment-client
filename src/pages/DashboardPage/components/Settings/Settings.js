import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Settings.css";
import "./../../../../App.css";
import SettingsCard from "./SettingsCard/SettingsCard";

class Settings extends Component {
  state = {
    email: "",
    password: "",
    redirectToReferrer: false
  };

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0
    );
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    alert("You tried to change password with " + this.state.email);
  };

  /*componentDidMount() {
    fetch("http://localhost:9090/users")
    .then(resp => resp.json())
    .then(data => {
      console.log(data);
      this.setState({
        allUsers: data
      });
    })
    .catch(err => {});
  }*/

  render() {
    return (
      <div id="generalStyle">
        <div className="Login">
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="email" bsSize="large">
              Email
              <FormControl autoFocus type="email" value={this.state.email} onChange={this.handleChange}/>
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">
              New Password
              <FormControl value={this.state.password} onChange={this.handleChange} type="password"/>
            </FormGroup>
            <Button block bsSize="large" disabled={!this.validateForm()} type="submit">
              Confirm
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default Settings;
