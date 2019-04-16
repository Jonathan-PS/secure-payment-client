import React, { Component } from "react";
import "./ProfileInfo.css";
import ProfileInfoCard from "./ProfileInfoCard/ProfileInfoCard";

class ProfileInfo extends Component {
  state = {
    allUsers: []
  };

  componentDidMount() {
    fetch("http://localhost:9090/users")
    .then(resp => resp.json())
    .then(data => {
      console.log(data);
      this.setState({
        allUsers: data
      });
    })
    .catch(err => {});
  }

  render() {
    const cards = this.state.allUsers.map(users => (
      <ProfileInfoCard
        key={users.registeredUserId}
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
