import React from "react";
import "./NavigationBar.css";
import CartButton from "./CartButton/CartButton";
import { Nav, Navbar, NavItem } from "react-bootstrap";

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
          <Navbar.Brand>
            <h4 className="logoText">Secure Payment Webshop</h4>
          </Navbar.Brand>
        </NavLink>

        <Navbar.Toggle aria-controls="responsive-navbar-navac" />
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
            <NavItem>
              <NavLink
                to="/checkout"
                className="nav-link"
                activeClassName="active"
              >
                Checkout
              </NavLink>
            </NavItem>
            {localStorage.getItem("user_id") > 0 ? (
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
            {localStorage.getItem("user_id") > 0 ? (
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
            
          </Nav>
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
