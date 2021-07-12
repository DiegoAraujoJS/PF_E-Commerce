import React from "react";
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
// import { Form } from 'react-bootstrap'
// import { FormControl } from 'react-bootstrap'
// import { Button } from 'react-bootstrap'
import { NavDropdown } from "react-bootstrap";
import { Link } from 'react-router-dom';

export default function SearchBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand className={'ms-3'} href="#home">Tus Clases</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link><Link className={'ms-4 text-decoration-none link-dark'} to={"/home"}>Home</Link></Nav.Link>
          <Nav.Link><Link className={'ms-4 text-decoration-none link-dark'} to={"/registro"}>registro</Link></Nav.Link>
          <Nav.Link><Link className={'ms-4 text-decoration-none link-dark'} to={"/login"}>login</Link></Nav.Link>
          <Nav.Link><Link className={'ms-4 text-decoration-none link-dark'} to={"/calendar"}>calendar</Link></Nav.Link>
          <Nav.Link><Link className={'ms-4 text-decoration-none link-dark'} to={"/perfil"}>perfil</Link></Nav.Link>
          <Nav.Link><Link className={'ms-4 text-decoration-none link-dark'} to={"/chat"}>chat</Link></Nav.Link>
          <NavDropdown className={'ms-4 text-decoration-none'} title="Dropdown" id="basic-nav-dropdown" disabled>
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
