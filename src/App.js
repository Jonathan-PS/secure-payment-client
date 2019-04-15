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
  };

  constructor(props) {
    super(props);
    this.addCartProduct = this.addCartProduct.bind(this);
  }

  // Adds a product to the cart
  addCartProduct = event => {
    // First check if product already exist:
    var index = -1;
    for (var i = 0; i < this.state.cartProducts.length; i++) {
      if (this.state.cartProducts[i].productId == event.productId) {
        index = i;
      }
    }
    // Either put product in cart,
    if (index < 0) {
      this.setState({
        cartProducts: this.state.cartProducts.concat([event])
      });
    } else {
      // or increment the number of selected products
      var newSelectedQuantity = {
        ...this.state.cartProducts
      };
      newSelectedQuantity[index].selectedQuantity =
        this.state.cartProducts[index].selectedQuantity + 1;
      this.setState(newSelectedQuantity); //
    }
  };

  render() {
    return (
      <div id="App">
        <NavigationBar />
        <br />

        <CartButton cartProducts={this.state.cartProducts} />

        <Routes
          cartProducts={this.state.cartProducts}
          triggerAddCartProduct={this.addCartProduct}
        />
      </div>
    );
  }
}
export default App;
