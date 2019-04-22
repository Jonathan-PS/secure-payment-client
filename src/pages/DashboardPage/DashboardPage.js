import React, { Component } from "react";
import "./DashboardPage.css";
import "./../../App.css";

import Tabs from "../../components/Tabs/Tabs";
import Dashboard from "./components/Dashboard/Dashboard";

class DashboardPage extends Component {
  render() {
    return (
      <div id="generalStyle">
        <h4>Dashboard</h4>
        <hr />
        {sessionStorage.getItem("user_id") > 0 ? (
          <Dashboard />
        ) : (
          (window.location = "/")
        )}
      </div>
    );
  }
}

export default DashboardPage;
