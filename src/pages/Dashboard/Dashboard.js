import React, { Component } from "react";
import AddAddressForm from "./components/AddAddressForm";

class Dashboard extends Component {
  render() {
    return (
      <div>
        <br />
        <h4>Dashboard</h4>
        <hr />
        <AddAddressForm />
      </div>
    );
  }
}

export default Dashboard;
