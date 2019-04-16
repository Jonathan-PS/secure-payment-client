import React, { Component } from "react";
import "./SettingsCard.css";
import "./../../../../../App.css";

class Settings extends Component {
  render() {
    return (
      <div className="col-xs-12 col-sm-6 col-md-12" align="left" id="generalStyle">
      <div className="card" id="liststyling">
        <div className="card-body">
          <h4 className="card-title">Settings</h4>
          <ul>
            <li><h4>Change password</h4></li>
            <li><b>Email address:</b> {this.props.email}</li>
            <li><b>Old password:</b> {this.props.password}</li>
            <li><b>New password:</b> {this.props.password}</li>
          </ul>
        </div>
      </div>
    </div>
  );
  }
}

export default Settings;
