import React, { Component } from "react";
import "./Card.css";

class Card extends Component {
  render() {
    return (
      <div className="col-xs-12 col-sm-12 col-md-12" align="left">
        <div className="card" id="border">
          <div className="card-body">
            <h4 className="card-title"></h4>
            <ul>
              <li><b>Name:</b> {this.props.firstName} {this.props.lastName}</li>
              <li><b>Email address:</b> {this.props.email}</li>
              <li><b>password:</b> {this.props.password}</li>
              <li><b>Registered:</b> {this.props.createdAt}</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
