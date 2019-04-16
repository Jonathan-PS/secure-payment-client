import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

/* Components */
import NavigationBar from "./components/NavigationBar/NavigationBar";

/* Routes */
import Routes from "./Routes";
import ProductList from "./pages/ProductListPage/components/ProductList/ProductList";
import CartButton from "./components/CartButton/CartButton";

class App extends Component {
  state = {
    cartProducts: [] /* Saves products by their productId */
    //myCart: []
  };

  addCartProduct = event => {
    this.setState({
      cartProducts: this.state.cartProducts.concat([event])
    }); /*
    this.setState({
      myCart: [sessionStorage.getItem("cart")]
    });*/
  };

  render() {
    /*if (sessionStorage.getItem("cart") == "") {
      sessionStorage.clear("cart");
      sessionStorage.setItem("cart", []);
    }*/

    return (
      <div id="App">
        <NavigationBar />
        <CartButton cartProducts={this.state.cartProducts}/>
        <Routes cartProducts={this.state.cartProducts} triggerAddCartProduct={this.addCartProduct}/>
      </div>
    );
  }
}
export default App;
