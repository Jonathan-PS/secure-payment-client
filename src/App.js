import React, { Component } from "react";
import "./App.css";

/* Components */
import NavigationBar from "./components/NavigationBar/NavigationBar";

/* Routes */
import Routes from "./Routes";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cartProducts: JSON.parse(localStorage.getItem("cartProducts")) || []
    };

    this.addCartProduct = this.addCartProduct.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
    this.clearCart = this.clearCart.bind(this);
  }

  // Adds a product to the cart
  async addCartProduct(event) {
    // 1. First check if product already exist:
    let index = -1;
    for (let i = 0; i < this.state.cartProducts.length; i++) {
      if (this.state.cartProducts[i].productId == event.productId) {
        index = i;
      }
    }

    // Either put product in cart,
    if (index < 0) {
      await this.setState({
        cartProducts: this.state.cartProducts.concat([event])
      });
    } else {
      // or increment the number of selected products
      let newSelectedQuantity = {
        ...this.state.cartProducts
      };
      newSelectedQuantity[index].selectedQuantity =
        this.state.cartProducts[index].selectedQuantity + 1;
      await this.setState(newSelectedQuantity);
    }

    localStorage.setItem(
      "cartProducts",
      JSON.stringify(this.state.cartProducts)
    );
  }

  // Decrease cartproduct
  async decreaseCartProduct(event) {
    // 1. First check if product already exist:
    let index = -1;
    for (let i = 0; i < this.state.cartProducts.length; i++) {
      if (this.state.cartProducts[i].productId == event.productId) {
        index = i;
      }
    }

    // Either put product in cart,
    if (index > -1) {
      let newSelectedQuantity = {
        ...this.state.cartProducts
      };
      let newQuantity = this.state.cartProducts[index].selectedQuantity - 1;

      if (newQuantity > 0) {
        newSelectedQuantity[index].selectedQuantity = newQuantity;
        await this.setState(newSelectedQuantity);
      } else {
        await this.removeProduct(event);
      }
    }

    localStorage.setItem(
      "cartProducts",
      JSON.stringify(this.state.cartProducts)
    );
  }

  // Removes the given product from cart
  async removeProduct(event) {
    let newProducts = [...this.state.cartProducts]; // make a separate copy of the array
    let index = newProducts.indexOf(event);
    console.log("attempting to remove cart product at index: " + index);

    if (index !== -1) {
      newProducts.splice(index, 1);
      await this.setState({ cartProducts: newProducts });
    }

    localStorage.setItem(
      "cartProducts",
      JSON.stringify(this.state.cartProducts)
    );
  }

  async clearCart() {
    await this.setState({
      cartProducts: []
    });

    localStorage.setItem(
      "cartProducts",
      JSON.stringify(this.state.cartProducts)
    );
  }

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
            triggerDecreaseCartProduct={this.decreaseCartProduct}
            triggerRemoveProduct={this.removeProduct}
            triggerClearCart={this.clearCart}
          />
        </div>
      </div>
    );
  }
}
export default App;
