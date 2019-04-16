import React, { Component } from "react";
import "./Dashboard.css";
import "./../../../../App.css";

import ActiveOrder from "./../ActiveOrder/ActiveOrder";
import AddAddressForm from "./../AddAddressForm/AddAddressForm";
import Address from "./../Address/Address";
import Order from "./../Order/Order";
import ProfileInfo from "./../ProfileInfo/ProfileInfo";
import Settings from "./../Settings/Settings"
import Tabs from "../../../../components/Tabs/Tabs";

class Dashboard extends Component {
  render() {
    return (
      <div id="generalStyle">
        <Tabs>
          <div label="Profile">
            <h5>Profile Dashboard Home</h5>
            <div class="splitInTwo">
              <div class="profileLeftColumn">
                <ProfileInfo />
              </div>
              <div class="profileRightColumn">
                <ActiveOrder />
              </div>
            </div>
          </div>
          <div label="Orders History">
            <Order />
          </div>
          <div label="Address">
            <div class="splitInTwo">
              <div class="addressLeftColumn">
                <AddAddressForm />
              </div>
              <div class="addressRightColumn">
                <Address />
              </div>
            </div>
          </div>
          <div label="Settings">
            <Settings />
          </div>
        </Tabs>
      </div>
    );
  }
}

export default Dashboard;
