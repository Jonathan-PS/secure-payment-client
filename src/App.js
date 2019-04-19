import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

/* Components */
import NavigationBar from "./components/NavigationBar/NavigationBar";

/* Routes */
import Routes from "./Routes";
import ProductList from "./pages/ProductListPage/components/ProductList/ProductList";

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
    // 1. First check if product already exist:
    let index = -1;
    for (let i = 0; i < this.state.cartProducts.length; i++) {
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
      let newSelectedQuantity = {
        ...this.state.cartProducts
      };
      newSelectedQuantity[index].selectedQuantity =
        this.state.cartProducts[index].selectedQuantity + 1;
      this.setState(newSelectedQuantity);
    }
  };

  render() {
    return (
      <div id="margins">
        <div id="navigationBar">
          <NavigationBar cartProducts={this.state.cartProducts} />
        </div>

        <div id="body">
          <Routes
            cartProducts={this.state.cartProducts}
            triggerAddCartProduct={this.addCartProduct}
          />
        </div>
      </div>
    );
  }
}
export default App;
