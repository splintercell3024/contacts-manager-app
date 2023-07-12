import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Search from "../Search/Search";
import { Link,NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function NavbarHeader() {
  const location = useLocation()
  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark" >
      <Container>
        <Link to="/"><Navbar.Brand>وب اپلیکیشن مدیریت مخاطبین</Navbar.Brand></Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto mx-2 mt-2 align-items-center">
            <Nav.Item></Nav.Item><NavLink to="/contacts">مخاطبین</NavLink>
          </Nav>
          {location.pathname == "/contacts" && <Search/> }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
