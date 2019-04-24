import React from "react";
import axios from "axios";
import "./NavigationBar.css";
import Bootstrap from "bootstrap/dist/css/bootstrap.css";
import CartButton from "./CartButton/CartButton";
import {
  Col,
  Nav,
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
  NavItem
} from "react-bootstrap";

import { NavLink } from "react-router-dom";

const NavigationBar = props => {
  return (
      <div id="generalStyle">
        <Navbar
            collapseOnSelect
            expand="lg"
            variant="light"
            bg="light"
            fixed="top"
        >
          <NavLink to="/" className="nav-link" activeClassName="active">
            <Navbar.Brand><h4 className="logoText">Secure Payment Webshop</h4></Navbar.Brand>
          </NavLink>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <NavItem>
                <NavLink
                    to="/products"
                    className="nav-link"
                    activeClassName="active"
                >
                  Products
                </NavLink>
              </NavItem>
              {sessionStorage.getItem("user_id") > 0 ? (
                  <NavItem>
                    <NavLink
                        to="/dashboard"
                        className="nav-link"
                        activeClassName="active"
                    >
                      Dashboard
                    </NavLink>
                  </NavItem>
              ) : (
                  <NavItem>
                    <NavLink
                        to="/login"
                        className="nav-link"
                        activeClassName="active"
                    >
                      Login
                    </NavLink>
                  </NavItem>
              )}
              {sessionStorage.getItem("user_id") > 0 ? (
                  <NavItem>
                    <NavLink
                        to="/logout"
                        className="nav-link"
                        activeClassName="active"
                    >
                      Logout
                    </NavLink>
                  </NavItem>
              ) : (
                  <NavItem>
                    <NavLink
                        to="/signup"
                        className="nav-link"
                        activeClassName="active"
                    >
                      SignUp
                    </NavLink>
                  </NavItem>
              )}
              <NavItem>
                <NavLink
                    to="/checkout"
                    className="nav-link"
                    activeClassName="active"
                >
                  Checkout
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                    to="/stripePayment"
                    className="nav-link"
                    activeClassName="active"
                >
                  Stripe
                </NavLink>
              </NavItem>
            </Nav>
            <Nav />
            <Nav>
              <NavItem>
                <CartButton cartProducts={props.cartProducts} />
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
  );
};

export default NavigationBar;