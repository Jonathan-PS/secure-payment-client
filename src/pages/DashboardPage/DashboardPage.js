import React, { Component } from "react";
import "./DashboardPage.css";

import Dashboard from "./components/Dashboard/Dashboard";

class DashboardPage extends Component {
  render() {
    return (
      <div id="generalStyle">
        <h4>Dashboard</h4>
        <hr />
        {localStorage.getItem("user_id") > 0 ? (
          <Dashboard />
        ) : (
          (window.location = "/")
        )}
      </div>
    );
  }
}

export default DashboardPage;
