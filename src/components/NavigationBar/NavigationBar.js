import React from "react";
import axios from 'axios';
import "./NavigationBar.css";
import "./../../App.css";
import Bootstrap from "bootstrap/dist/css/bootstrap.css";


import { Nav, Navbar, NavDropdown, Form, FormControl, Button, NavItem } from "react-bootstrap";

import { NavLink } from "react-router-dom";

const NavigationBar = () => {
  return (
    <div id="generalStyle">
      <Navbar color="dark" light>
        <Navbar.Brand href="/">Secure Payment Client</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" >
            <NavItem>
              <NavLink to="/" className="nav-link" activeClassName="active">
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/products" className="nav-link" activeClassName="active">
                Products
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/dashboard" className="nav-link" activeClassName="active">
                Dashboard
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/login" className="nav-link" activeClassName="active">
                Login
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/signup" className="nav-link" activeClassName="active">
                SignUp
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/stripePayment" className="nav-link" activeClassName="active">
                Stripe
              </NavLink>
            </NavItem>
            {" "}
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
