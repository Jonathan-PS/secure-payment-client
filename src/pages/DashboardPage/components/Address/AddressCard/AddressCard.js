import React, { Component } from "react";
import "./AddressCard.css";
import "./../../../../../App.css";

class AddressCard extends Component {
  render() {
    return (
      <div className="col-xs-12 col-sm-6 col-md-12" align="left">
        <br/><br/>
        <div className="card" id="liststyling">
          <div className="card-body" id="generalStyle">
            <h4 className="card-title">REGISTERED ADDRESS</h4>
            <ul>
              <li><b>Street</b> {this.props.streetName} {this.props.streetNumber}, {this.props.housingCode}</li>
              <li><b>City:</b> {this.props.postalCode} {this.props.city}</li>
              <li><b>Country:</b> {this.props.country}</li>
              <li><b>Is the address active?</b> {this.props.isActive}</li>
              <li><b>Address ID:</b> {this.props.address_id}</li>
              <li><b>Registered to: </b>{this.props.registeredUserId}</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default AddressCard;
