import React, { useEffect, useState } from "react";
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Form } from 'react-bootstrap'
// import { FormControl } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import CSS from 'csstype';
import axios from 'axios';
import { NavDropdown } from "react-bootstrap";
import { Link } from 'react-router-dom';
import deleteAllCookies from "../../cookieClearer";
import getCookieValue from "../../cookieParser";

export default function SearchBar() {
  enum Role { USER, PROFESSOR, ADMIN }
  let [user, setUser] = useState<{ name: string, lastName: string, role: number, mail: string } | undefined>({ name: '', lastName: '', role: null, mail: '' })

  useEffect(() => {
    async function setRoleOfUser() {
      if (localStorage.getItem('login')) {
        if (!document.cookie) {
          localStorage.removeItem('login')
          console.log('local storage removed')
        }
        const token = getCookieValue('token').replaceAll("\"", '')
        const thisUser = await axios.post(`http://localhost:3001/api/verify`, {}, { withCredentials: true, headers: { Authorization: token } })

        if (thisUser.status === 200) {
          console.log('status 200')
          setUser(thisUser.data)
        } else {
          console.log('else')
          setUser(undefined)
        }
      }
    }
    setRoleOfUser()
  }, [])

  function loggedOrNot() {
    let logged = localStorage.getItem('login')
    if (localStorage.getItem('login') === 'true') {
      return true;
    } else {
      return false;
    }
  }
  async function signOut() {
    // auth.signOut();
    try {
      const logout = await axios.post(`http://localhost:3001/api/login/logout`, {}, { withCredentials: true })
      deleteAllCookies()
      localStorage.removeItem('login')
      alert("Se cerro sesión correctamente")
      // window.location.reload();
    } catch (err) {
      alert("Fallo al cerrar sesión")
    }
  }

  const dropBox: CSS.Properties = {
    width: '350px'
  }
  const inputSizeLim: CSS.Properties = {
    position: 'relative',
    width: '200px'
  }

  return (
    <Navbar bg="light" expand="lg">
    <Navbar.Brand className={'ms-3'} href="#home">Tus Clases</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Link className={'nav-link ms-4 text-decoration-none'} to={"/home"}>Home</Link>
        <Link className={'nav-link ms-4 text-decoration-none'} to={"/calendar"}>Calendar</Link>
        <Link className={'nav-link ms-4 text-decoration-none'} to={"/perfil"}>Profile</Link>
        <Link className={'nav-link ms-4 text-decoration-none'} to={"/chat"}>Chat</Link>
        <Link className={'nav-link ms-4 text-decoration-none'} to={"/clases"}>Class</Link>
        {loggedOrNot() ?
            <NavDropdown className={'ms-4 text-decoration-none justify-content-end'} title="Logeado" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => signOut()}>
                Desconectarse
              </NavDropdown.Item>
            </NavDropdown>
            :
            <NavDropdown className={'ms-4 text-decoration-none'} title="Cuenta" id="basic-nav-dropdown">
              <Form className={'d-flex flex-column align-items-center'} style={dropBox}>
                <Form.Control style={inputSizeLim} className={'d-flex justify-content-center'} type="email" placeholder="Email" />
                <Form.Control style={inputSizeLim} type="password" placeholder="Contraseña" />
                <Form.Check type="checkbox" label="Mostrar contraseña" />
                <Button style={inputSizeLim} variant="primary" type="submit">
                  Entrar
                </Button>
              </Form>
            </NavDropdown>
        }
        {loggedOrNot() && user.role === Role.PROFESSOR ?
          <Link className={'nav-link ms-4 text-decoration-none'} to={"/clases/add"}>Agrega tu Propia Clase!</Link>
          :
          null
        }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  );
}

