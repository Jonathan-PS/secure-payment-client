import React from "react";
import axios from "axios";
import "./NavigationBar.css";
import "./../../App.css";
import Bootstrap from "bootstrap/dist/css/bootstrap.css";
import CartButton from "./../CartButton/CartButton";
import {
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
      <Navbar color="dark">
        <NavLink to="/products" className="nav-link" activeClassName="active">
          <Navbar.Brand>Secure Payment Client</Navbar.Brand>
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
                to="/stripePayment"
                className="nav-link"
                activeClassName="active"
              >
                Stripe
              </NavLink>
            </NavItem>
            <NavItem>
              <CartButton cartProducts={props.cartProducts} />
            </NavItem>

            {/*
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="/action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="/action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="/action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          */}
          </Nav>
          {/* --search --
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>*/}
        </Navbar.Collapse>
      </Navbar>
      </div>
  );
};

export default NavigationBar;
