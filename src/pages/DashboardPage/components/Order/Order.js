import React, { Component } from 'react';
import './OrderPage';
import OrderList from './OrderList/OrderList';

class OrderPage extends Component {
  render() {
    return (
      <div id="generalStyle">
        <br />
        <h4>Orders</h4>
        <hr />
        <OrderList allOrders={this.props.allOrders} />
      </div>
    );
  }
}

export default OrderPage;
