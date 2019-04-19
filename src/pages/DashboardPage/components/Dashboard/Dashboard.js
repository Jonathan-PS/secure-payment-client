import React, { Component } from "react";
import "./Dashboard.css";
import "./../../../../App.css";

import AddAddressForm from "./../AddAddressForm/AddAddressForm";
import Address from "./../Address/Address";
import Order from "./../Order/Order";
import OrderPage from './../Order/OrderPage';
import ProfileInfo from "./../ProfileInfo/ProfileInfo";
import Settings from "./../Settings/Settings"
import Tabs from "../../../../components/Tabs/Tabs";

class Dashboard extends Component {
  render() {
    return (
      <div>
        <Tabs>
          <div label="Profile">
            <h5>Profile Dashboard Home</h5>
            <ProfileInfo />
          </div>
          <div label="Orders History">
            <Order />
          </div>
          <div label="Address">
            <div className="splitInTwo">
              <div className="addressLeftColumn">
                <AddAddressForm />
              </div>
              <div className="addressRightColumn">
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
