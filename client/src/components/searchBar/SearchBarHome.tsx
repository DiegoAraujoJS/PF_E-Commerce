import React, { useEffect, useState } from "react";
import { Container, Navbar, Col, Alert } from "react-bootstrap";
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
import { faBook, faShoppingCart, faUserTie, faUser } from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2'

export default function SearchBar() {
  enum Role { USER, PROFESSOR, ADMIN }
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [wrongPassword, setWrongPassword] = useState(false)
  const [errors, setErrors] = useState({ email: null, password: null })
  let [user, setUser] = useState<{ name: string, lastName: string, role: number, mail: string } | undefined>({ name: '', lastName: '', role: null, mail: '' })
  const [cestaLength, setCestaLength] = useState(0)

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
          const clases = await axios.get(`http://localhost:3001/api/carrito/all/${thisUser.data.mail}`)
          setCestaLength(clases.data.length)
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
    if (e.target.name === "emailValue") {
      setEmail(e.target[0].value)
    }
    if (e.target.name === "passValue") {
      setPassword(e.target[1].value)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      const login = await axios.post(`http://localhost:3001/api/login`, {
        mail: e.target[0].value,
        password: e.target[1].value
      }, { withCredentials: true })

      if (login.status === 200) {
        const reponse = await axios.get('http://localhost:3001/api/usuarios/' + e.target[0].value)

        if (reponse.data.suspendido) {
          const logout = await axios.post(`http://localhost:3001/api/login/logout`, {}, { withCredentials: true })

          return Swal.fire({
            title: 'Error!',
            text: 'Su cuenta esta suspendida!',
            icon: 'error',
            willClose: () => window.location.reload()
          })
        }
        else {

          document.cookie = `token=${JSON.stringify(login.data.token)}`
          localStorage.setItem('login', 'true')

          const user = await axios.post(`http://localhost:3001/api/verify`, {}, { headers: { Authorization: getCookieValue('token').replaceAll("\"", '') } })
          if (user.status === 200) {
            Swal.fire({
              title: 'Exito!',
              text: 'Se Inició sesión correctamente!',
              icon: 'success',
              willClose: () => window.location.reload()
            })

          }
        }
      }

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
      Swal.fire({
        title: 'Exito!',
        text: 'Se cerro sesión correctamente!',
        icon: 'success',
        willClose: () => window.location.reload()
      })

    } catch (err) {
      Swal.fire({
        title: 'Error!',
        text: 'Fallo al cerrar sesión!',
        icon: 'error',
        willClose: () => window.location.reload()
      })
    }
  }

  const dropBox: CSS.Properties = {
    width: '300px',
    height: '300px'
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

  const book = <FontAwesomeIcon icon={faBook} style={{ fontSize: "30px", marginLeft: "25px" }} className="" />

  const bookCSS: CSS.Properties = {
    color: "white",
    fontWeight: 500,
    backgroundColor: "red",
    borderRadius: "9999px",
    paddingTop: "5px",
    paddingBottom: "5px",
    paddingLeft: "10px",
    paddingRight: "10px",
    width: "60%",
    height: "60%",
    position: 'relative',
    right: "10px",
    top: "11px",
  }

  const admin = <FontAwesomeIcon icon={faUserTie} style={{ fontSize: "40px" }} className="" />
  const userIcon = <FontAwesomeIcon icon={faUser} style={{ fontSize: "25px" }} className="mt-1" />

  return (
    // <Navbar expand="lg" className={s.navbar}>
    <Navbar bg="light" expand="lg">
      <div className="container-fluid form">
        <Navbar.Brand className={'ms-3'} href="#home"><Link to={"/"}><img src={logo} alt='U CLASES Logo' style={{ height: '56px' }}></img></Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link className={'nav-link ms-4 text-decoration-none'} to={"/"}>Home</Link>
            <Link className={'nav-link ms-4 text-decoration-none'} to={"/calendar"}>Calendar</Link>
            <Link className={'nav-link ms-4 text-decoration-none'} to={"/clases"}>Class</Link>

            {loggedOrNot() ?
              <div className="ms-4 d-flex">
                <span className="ml-4">{userIcon}</span><NavDropdown className={'text-decoration-none justify-content-end ms-1'} title="Sesión" id="basic-nav-dropdown">
                  <NavDropdown.Item>
                    <Link className={'nav-link ms-4 text-decoration-none'} to={"/perfil"}>Profile</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link className={'nav-link ms-4 text-decoration-none'} to={"/historial"}>History</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link className={'nav-link ms-4 text-decoration-none'} to={"/chat"}>Chat</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                  <Link className={'nav-link ms-4 text-decoration-none'} to={"/addclaim"}>New Claim</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item className="d-flex justify-content-center" onClick={() => signOut()}>
                    Desconectarse
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
              :
              <NavDropdown className={'ms-4 text-decoration-none'} title="Cuenta" id="basic-nav-dropdown">
                <Form className={'d-flex flex-column align-items-center justify-content-center'} style={dropBox} onSubmit={handleSubmit}>
                  <Form.Control style={inputSizeLim} className={'d-flex justify-content-center'} type="email" placeholder="Email" onChange={handleChange} />
                  <Form.Control className="mt-2" style={inputSizeLim} type={showPassword} placeholder="Contraseña" onChange={handleChange} />
                  {showPassword === "password" ? eye : eyeSlash}

                  <Button style={inputSizeLim} name='loginSubmit' variant="primary" type="submit">
                    Entrar
                  </Button>
                  <Navbar.Text className="mt-5">
                    ¿No tienes cuenta? <Button onClick={() => handleShow()}> Registrarse </Button>
                    <Register show={show} handleClose={handleClose} />
                  </Navbar.Text>
                  {wrongPassword ? <div className="badge bg-danger" >
                    El usuario o la contraseña son incorrectos</div> : null}
                </Form>
              </NavDropdown>
            }
            {loggedOrNot() && user.role === Role.PROFESSOR ?
              <Link className={'nav-link ms-4 text-decoration-none'} to={"/clases/add"}>
                <Alert variant="info" className="p-1 m-0 d-flex justify-content-center" style={{width:"200px"}}>
                Agrega tu Propia Clase!
                </Alert>
                </Link>
              :
              null
            }
          </Nav>
        </Navbar.Collapse>
        {loggedOrNot() && user.role === Role.ADMIN ? <div className="d-flex">
          <Link className={'nav-link ms-4 text-decoration-none'} to={"/claim"}>Reclamos</Link>
          {admin}
          <h5 className="m-0">Admin</h5>
        </div>
          :
          < div >
            <Link to={"/cesta"}> {book} </Link>
            {cestaLength > 0 ? <Link style={{ textDecoration: "none", }} to={"/cesta"}><span style={bookCSS}> {cestaLength}</span> </Link> : null}
          </div>
        }
      </div>
    </Navbar >
  );
}

