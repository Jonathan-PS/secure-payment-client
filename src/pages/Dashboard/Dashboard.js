import React, { Component } from "react";
import "./Dashboard.css";

import AddAddressForm from "./components/AddAddressForm/AddAddressForm";
import Tabs from "./components/Tabs/Tabs";

class Dashboard extends Component {
  render() {
    return (
      <div id="Dashboard">
        <br />
        <h4>Dashboard</h4>
        <hr />

        <Tabs>
          <div label="Profile">
            <h5 align="center">Profile Dashboard Home</h5>
            <br />
            Profile Information here
            <br />
            Active order here
          </div>
          <div label="Orders">Order History for this user here</div>
          <div label="Address">
            Addresses
            <AddAddressForm />
          </div>
          <div label="Profile Settings">
            Profile Settings
            <br />
            Add address, change active_address, change password, etc...
          </div>
        </Tabs>
      </div>
    );
  }
}

export default Dashboard;
