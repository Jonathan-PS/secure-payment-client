import React, { Component } from "react";
import "./Dashboard.css";

import AddAddressForm from "./../AddAddressForm/AddAddressForm";
import Tabs from "../../../../components/Tabs/Tabs";

class Dashboard extends Component {
  render() {
    return (
      <div id="Dashboard">
        <Tabs>
          <div label="Profile">
            {/* new tab */}
            <h5 align="center">Profile Dashboard Home</h5>
            <br />
            Profile Information here
            <br />
            Active order here
          </div>
          <div label="Orders">Order History for this user here</div>
          {/* new tab */}
          <div label="Address">
            {/* new tab */}
            Addresses
            <AddAddressForm />
          </div>
          <div label="Profile Settings">
            {/* new tab */}
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
