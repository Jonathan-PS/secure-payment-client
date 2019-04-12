import React, { Component } from "react";
import "./DashboardPage.css";

import AddAddressForm from "./components/AddAddressForm/AddAddressForm";
import Tabs from "../../components/Tabs/Tabs";
import Dashboard from "./components/Dashboard/Dashboard";

class DashboardPage extends Component {
  render() {
    return (
      <div id="DashboardPage">
        <br />
        <h4>Dashboard</h4>
        <hr />
        <Dashboard />
      </div>
    );
  }
}

export default DashboardPage;