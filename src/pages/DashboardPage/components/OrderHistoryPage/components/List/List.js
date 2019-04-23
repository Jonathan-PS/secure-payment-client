import React, { Component} from 'react';
import './List.css';
import "./../../../../../App.css";

class List extends Component {
  state = {
    allOrders: []
  };

  componentDidMount() {
    fetch("https://secure-payment-api.herokuapp.com/orders/users/" + sessionStorage.getItem("user_id"))
    .then(resp => resp.json())
    .then(data => {
      console.log(data);
      this.setState({
        allOrders: data
      });
    })
    .catch(err => {});
  }

  render() {
    let listKey = 1;
    const listItems = this.state.allOrders.map(orders => (
      <tr key={listKey++}>
        <th scope="row"></th>
        <td>{orders.userOrderId}</td>
        <td>{orders.createdAt}</td>
        <td>{orders.updatedAt}</td>
        <td>{orders.shippingAddress}</td>
        <td>{orders.status}</td>
      </tr>
    ));

    return (
      <div className="container" id="generalStyle">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col" />
              <th scope="col">Order #</th>
              <th scope="col">Order placed</th>
              <th scope="col">Order changed</th>
              <th scope="col">Shipped to</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>{listItems}</tbody>
        </table>
      </div>
    );
  }
}

export default List;
