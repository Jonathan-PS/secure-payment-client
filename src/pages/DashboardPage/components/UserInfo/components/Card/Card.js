import React, { Component } from "react";
import "./Card.css";

class Card extends Component {
  render() {
    return (
      <div className="col-xs-12 col-sm-12 col-md-12">
        <div className="userCard">
          <div className="userCard-body">
            <ul>
              <li>
                <b>Name:</b> {this.props.firstName} {this.props.lastName}
              </li>
              <li>
                <b>Email address:</b> {this.props.email}
              </li>
              <li>
                <b>Registered: </b>
                {new Date(this.props.createdAt).toUTCString()}
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
