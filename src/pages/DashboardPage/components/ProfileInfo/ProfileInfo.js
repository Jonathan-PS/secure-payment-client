import React, { Component } from "react";
import "./ProfileInfo.css";
import ProfileInfoCard from "./ProfileInfoCard/ProfileInfoCard";

class ProfileInfo extends Component {
  state = {
    allUsers: [],
    registeredUserId: 7
  };

  componentDidMount() {
    fetch("http://localhost:9090/users/" + this.state.registeredUserId)
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
      <ProfileInfoCard
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
      <div>
        <div className="row" id="margins">{cards}</div>
      </div>
    );
  }
}

export default ProfileInfo;
