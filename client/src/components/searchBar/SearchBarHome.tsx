import React, { useEffect, useState } from "react";
import { Container, Navbar } from "react-bootstrap";
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
import logo from '../../images/logotipo.png'
import s from './SearchBar.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, } from "@fortawesome/free-regular-svg-icons";
import Register from '../Register/Register';
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";


export default function SearchBar() {
  enum Role { USER, PROFESSOR, ADMIN }
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [wrongPassword, setWrongPassword] = useState(false)
  const [errors, setErrors] = useState({ email: null, password: null })
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

  function validateErrors() {
    if (!email) {
      setErrors({ ...errors, email: 'Se necesita un E-mail' })
    } else if (!/\S+@{1}[a-zA-Z]+\.{1}[a-z]{3}\.?[a-z]*/gm.test(email)) {
      setErrors({ ...errors, email: 'E-mail inválido' })
    } else {
      setErrors({ ...errors, email: null })
    }
    if (!/[\S]/.test(password)) {
      setErrors({ ...errors, password: 'No puede contener espacio blanco' })
    } else if (password.length < 4 || password.length > 20) {
      setErrors({ ...errors, password: 'La contraseña debe tener de 4 a 20 caracteres' })
    } else {
      setErrors({ ...errors, password: null })
    }
  }

  function handleChange(e) {
    validateErrors()
    switch (e.target.name) {
      case 'emailValue':
        setEmail(e.target[0].value)
        break;
      case 'passValue':
        setPassword(e.target[1].value)
        break;
      default:
        break;
    }

  }

  async function handleSubmit(e) {
    e.preventDefault()
    console.log(e)
    try {
      const login = await axios.post(`http://localhost:3001/api/login`, {
        mail: e.target[0].value,
        password: e.target[1].value
      }, { withCredentials: true })
      document.cookie = `token=${JSON.stringify(login.data.token)}`
      localStorage.setItem('login', 'true')
      const user = await axios.post(`http://localhost:3001/api/verify`, {}, { headers: { Authorization: getCookieValue('token').replaceAll("\"", '') } })
      window.location.reload();

    } catch (error) {
      setWrongPassword(true)
    }
  }

  function loggedOrNot() {
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
    width: '300px'
  }
  const inputSizeLim: CSS.Properties = {
    position: 'relative',
    width: '200px'
  }

  const [showPassword, setShowPassword] = useState("password")

  const eyeTest: CSS.Properties = {
    position: 'relative',
    left: '80px',
    bottom: '30px',
  }
  const eye = <FontAwesomeIcon style={eyeTest} icon={faEye} className="mt-1" onClick={() => setShowPassword("text")} />
  const eyeSlash = <FontAwesomeIcon style={eyeTest} icon={faEyeSlash} className="mt-1" onClick={() => setShowPassword("password")} />

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const carrito = <FontAwesomeIcon icon={faShoppingCart} style={{fontSize:"30px", marginLeft:"25px"}} className=""/>

  return (
    // <Navbar expand="lg" className={s.navbar}>
      <Navbar bg="light"  expand="lg">
      <Container className="container-fluid p-0">
        <Navbar.Brand className={'ms-3'} href="#home"><Link to={"/home"}><img src={logo} alt='U CLASES Logo' style={{ height: '56px' }}></img></Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link className={'nav-link ms-4 text-decoration-none'} to={"/home"}>Home</Link>
            <Link className={'nav-link ms-4 text-decoration-none'} to={"/calendar"}>Calendar</Link>
            <Link className={'nav-link ms-4 text-decoration-none'} to={"/perfil"}>Profile</Link>
            <Link className={'nav-link ms-4 text-decoration-none'} to={"/chat"}>Chat</Link>
            <Link className={'nav-link ms-4 text-decoration-none'} to={"/clases"}>Class</Link>

            {loggedOrNot() ?
              <NavDropdown className={'ms-4 text-decoration-none justify-content-end'} title="Sesión" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => signOut()}>
                  Desconectarse
                </NavDropdown.Item>
              </NavDropdown>
              :
              <NavDropdown className={'ms-4 text-decoration-none'} title="Cuenta" id="basic-nav-dropdown">
                <Form className={'d-flex flex-column align-items-center'} style={dropBox} onSubmit={handleSubmit}>
                  <Form.Control style={inputSizeLim} className={'d-flex justify-content-center'} type="email" placeholder="Email" onChange={handleChange} />
                  <Form.Control style={inputSizeLim} type={showPassword} placeholder="Contraseña" onChange={handleChange} />
                  {showPassword === "password" ? eye : eyeSlash}

                  <Button style={inputSizeLim} name='loginSubmit' variant="primary" type="submit">
                    Entrar
                  </Button>
                  <Navbar.Text>
                    ¿No tienes cuenta? <Button onClick={() => handleShow()}> Registrarse </Button>
                    <Register show={show} handleClose={handleClose} />
                  </Navbar.Text>
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
        <Link to={"/cesta"}>{carrito}</Link>
      </Container>
    </Navbar>
  );
}

