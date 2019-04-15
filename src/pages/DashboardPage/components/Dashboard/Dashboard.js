import React, { Component } from "react";
import "./Dashboard.css";

import ActiveOrder from "./../ActiveOrder/ActiveOrder";
import AddAddressForm from "./../AddAddressForm/AddAddressForm";
import Address from "./../Address/Address";
import Order from "./../Order/Order";
import ProfileInfo from "./../ProfileInfo/ProfileInfo";
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
            <ProfileInfo />
            <br />
            <ActiveOrder />
          </div>
          <div label="Orders">
            <Order />
          </div>
            {/* new tab */}

          <div label="Address">
            {/* new tab */}
            <div class="splitInTwo">
              <div class="leftColumn">
                <AddAddressForm />
              </div>
              <div class="rightColumn">
                <Address />
              </div>
            </div>
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
