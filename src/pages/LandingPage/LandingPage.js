import React, { Component } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import { NavLink } from "react-router-dom";
import './LandingPage.css';

class LandingPage extends Component {
    constructor(props, context) {
        super(props, context);

        this.onSelect = this.onSelect.bind(this);

        this.state = {
            index: 0,
            direction: null,
        };
    }

    onSelect(selectedIndex, e) {
        this.setState({
            index: selectedIndex,
            direction: e.direction,
        });
    }

    render() {
        const { index, direction } = this.state;

        return (
            <div>
                <Jumbotron>
                    <h1>Welcome!</h1>
                    <p> Welcome to Secure Payment Webshop!  </p>
                    {localStorage.getItem("user_id") > 0 ? (
                        <p /> ) : (
                        <div>
                            <h5> Sign up or Log in to our page! </h5>
                        <NavLink
                            to="/login"
                            className="nav-link"
                            activeClassName="active"
                            >
                            <Button variant="primary">Login</Button> &nbsp;
                        </NavLink>
                        <NavLink
                            to="/signup"
                            className="nav-link"
                            activeClassName="active"
                            >
                            <Button variant="primary"> Sign up here</Button> &nbsp;
                        </NavLink>
                        </div>
                    )}
                    <br /><br />
                    <h5>Feel free to browse our goods.</h5>
                    <NavLink to="/products" className="nav-link" activeClassName="active">
                        <Button variant="primary"> Go to Products</Button> &nbsp;
                    </NavLink>
                </Jumbotron>
            </div>
        );
    }
}

export default LandingPage;