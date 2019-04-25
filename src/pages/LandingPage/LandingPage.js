import React, { Component } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import './LandingPage.css';

class LandingPage extends React.Component {
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
                    {sessionStorage.getItem("user_id") > 0 ? (
                        <p></p> ) : (
                        <div><h5> Sign up or Log in to our page! </h5>
                        <Button href="/login" variant="primary">Login</Button> &nbsp;
                        <Button href="/signup" variant="primary">Sign up here</Button>
                        </div>
                    )}
                    <br /><br />
                    <h5>Feel free to browse our goods.</h5>
                    <Button href="/products" variant="primary">Go to Products</Button>
                </Jumbotron>
            </div>
        );
    }
}

export default LandingPage;