import React, { Component } from "react";
import "./ProfileInfoCard.css";
import "./../../../../../App.css";

class ProfileInfoCard extends Component {
  render() {
    return (
      <div className="col-xs-12 col-sm-6 col-md-12" align="left">
        <div className="card" id="liststyling">
          <div className="card-body" id="generalStyle">
            <h4 className="card-title"></h4>
            <ul>
              <li><b>Name:</b> {this.props.firstName} {this.props.lastName}</li>
              <li><b>Email address:</b> {this.props.email}</li>
              <li><b>password:</b> {this.props.password}</li>
              <li><b>Registered:</b> {this.props.createdAt}</li>
              <li><b>Account info last updated:</b> {this.props.updatedAt}</li>
              <li><b>Is account active? </b>{this.props.isActive}</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileInfoCard;
