import React, { useEffect, useState } from "react";
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
// import { Form } from 'react-bootstrap'
// import { FormControl } from 'react-bootstrap'
// import { Button } from 'react-bootstrap'
import axios from 'axios';
import { NavDropdown } from "react-bootstrap";
import { Link } from 'react-router-dom';
import deleteAllCookies from "../../cookieClearer";
import getCookieValue from "../../cookieParser";
import logo from '../../images/logotipo.png'
import s from './SearchBar.module.css'

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

  return (
    <Navbar  expand="lg" className={s.navbar}>
      <Navbar.Brand className={'ms-3'} href="#home"><img src={logo} alt='U CLASES Logo' style={{height: '56px'}}></img></Navbar.Brand>
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
            <Navbar.Text className={'justify-content-end'}>
              <Link to='login'>Iniciar sesión</Link> ¿No tienes cuenta? <Link to='/registro'>Regístrate!</Link>
            </Navbar.Text>
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

