import React from "react";
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
// import { Form } from 'react-bootstrap'
// import { FormControl } from 'react-bootstrap'
// import { Button } from 'react-bootstrap'
import axios from 'axios';
import { NavDropdown } from "react-bootstrap";
import { Link } from 'react-router-dom';
import deleteAllCookies from "../../cookieClearer";


export default function SearchBar() {

  function loggedOrNot() {
    if(localStorage.getItem('login') === 'true') {
      return true;
    } else {
      return false;
    }
  }
  async function signOut() {
    // auth.signOut();
    try {
        const logout = await axios.post(`http://localhost:3001/api/login/logout`, {}, {withCredentials: true})
        deleteAllCookies()
        localStorage.removeItem('login')
        alert("Se cerro sesión correctamente")
        // window.location.reload();
    } catch (err) {
        alert("Fallo al cerrar sesión")
    }   
}

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand className={'ms-3'} href="#home">Tus Clases</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link className={'nav-link ms-4 text-decoration-none'} to={"/home"}>Home</Link>
          <Link className={'nav-link ms-4 text-decoration-none'} to={"/calendar"}>calendar</Link>
          <Link className={'nav-link ms-4 text-decoration-none'} to={"/perfil"}>perfil</Link>
          <Link className={'nav-link ms-4 text-decoration-none'} to={"/chat"}>chat</Link>
          {loggedOrNot() ? 
            <NavDropdown className={'ms-4 text-decoration-none justify-content-end'} title="Logeado" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => signOut()}>
                Desconectarse
              </NavDropdown.Item>
            </NavDropdown>
            :
            <Navbar.Text className={'justify-content-end'}>
              <Link to='login'>Iniciar sesión</Link> ¿No tienes cuenta? <Link to='/registro'>Regístrate!</Link>
            </Navbar.Text>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

