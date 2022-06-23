import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Link
              to="/"
              style={{ textDecoration: "none", color: "whiteSmoke" }}>
              Home
            </Link>
            <Link
              to="/register"
              style={{
                textDecoration: "none",
                color: "whiteSmoke",
                marginLeft: "10px",
                marginRight: "10px",
              }}>
              Register
            </Link>
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "whiteSmoke" }}>
              Login
            </Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
