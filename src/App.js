import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

/* Components */
import NavigationBar from "./components/NavigationBar/NavigationBar";

/* Routes */
import Routes from "./Routes";

class App extends Component {
  render() {
    return (
      <div id="App">
        <NavigationBar />
        <Routes />
      </div>
    );
  }
}
export default App;
