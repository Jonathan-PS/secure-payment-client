import React, { Component } from "react";
import Carousel from "react-bootstrap/Carousel";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import "./LandingPage.css";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";
import { NavLink } from "react-router-dom";

class LandingPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.onSelect = this.onSelect.bind(this);

    this.state = {
      index: 0,
      direction: null
    };
  }

  onSelect(selectedIndex, e) {
    this.setState({
      index: selectedIndex,
      direction: e.direction
    });
  }

  render() {
    const { index, direction } = this.state;

    return (
      <div>
        <Jumbotron>
          <h1>Welcome!</h1>
          <p> Welcome to Secure Payment Webshop! </p>
          {localStorage.getItem("user_id") > 0 ? (
            <p />
          ) : (
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
          <br />
          <br />
          <h5>Feel free to browse our goods.</h5>
          <NavLink to="/products" className="nav-link" activeClassName="active">
            <Button variant="primary"> Go to Products</Button> &nbsp;
          </NavLink>
        </Jumbotron>

        {/* 
                <Carousel
                    id="carousel"
                    activeIndex={index}
                    direction={direction}
                    onSelect={this.onSelect}
                >
                    <Carousel.Item>
                        <h1>NOW IN STOCK!</h1>
                        <img id="test"
                            className="d-block w-100"
                            src="http://sweetclipart.com/multisite/sweetclipart/files/baby_boy_socks_blue.png"
                            alt="Blue Baby Socks"
                        />
                        <Carousel.Caption>
                            <h2>Blue Baby Socks</h2>
                            <p>Nice pair of blue socks for baby boy</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <h1>NOW IN STOCK!</h1>
                        <img
                            className="d-block w-100"
                            src="http://sweetclipart.com/multisite/sweetclipart/files/baby_girl_socks_pink.png"
                            alt="Pink Baby Socks"
                        />

                        <Carousel.Caption>
                            <h2>Pink Baby Socks</h2>
                            <p>Nice pair of pink socks for baby girl</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <h1>NOW IN STOCK!</h1>
                        <img
                            className="d-block w-100"
                            src="http://sweetclipart.com/multisite/sweetclipart/files/baby_socks_yellow.png"
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                            <h2>Yellow Baby Socks</h2>
                            <p>Nice pair of yellow socks</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                */}
      </div>
    );
  }
}

export default LandingPage;
