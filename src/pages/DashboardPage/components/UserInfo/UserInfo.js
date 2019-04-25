import React, { Component } from "react";
import "./UserInfo.css";
import Card from "./components/Card/Card";

class UserInfo extends Component {
  state = {
    allUsers: []
  };

  componentDidMount() {
    fetch(
      "https://secure-payment-api.herokuapp.com/users/" +
        localStorage.getItem("user_id")
    )
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        this.setState({
          allUsers: this.state.allUsers.concat(data)
        });
      })
      .catch(err => {});
  }

  render() {
    const cards = this.state.allUsers.map(users => (
      <Card
        key={users.registeredUserId}
        registeredUserId={users.registeredUserId}
        firstName={users.firstName}
        lastName={users.lastName}
        email={users.email}
        password={users.password}
        createdAt={users.createdAt}
        updatedAt={users.updatedAt}
        activeAddressId={users.activeAddressId}
        isActive={users.isActive}
      />
    ));

    return (
      <div id="generalStyle">
        <div className="row" id="margins">
          {cards}
        </div>
      </div>
    );
  }
}

export default UserInfo;
