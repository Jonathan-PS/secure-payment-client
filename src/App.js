import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

/* Components */
import NavigationBar from "./components/NavigationBar/NavigationBar";

/* Routes */
import Routes from "./Routes";

class App extends Component {
  state = {
    cartProducts: [] /* Saves products by their productId */
  };

  addCartProduct = event => {
    this.setState({
      cartProducts: this.state.cartProducts.concat([event.newProduct])
    });
  };

  render() {
    return (
      <div id="App">
        <NavigationBar />
        <h1>Cart Products:</h1>
        {this.state.cartProducts.length}
        <Routes triggerAddCartProduct={this.addCartProduct} />
      </div>
    );
  }
}
export default App;
