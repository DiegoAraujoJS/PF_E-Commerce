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
import { faBook, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2'
import { bookOutline, cogSharp } from "ionicons/icons";
import { IonIcon } from '@ionic/react';
import { useDispatch } from 'react-redux';
import { auth, signOut } from "../../firebase";
import { verificacionLogueo } from '../../functions'
import { useSelector } from "react-redux";

import firebase from 'firebase/app';
import 'firebase/auth';
import { setRoleOfUser } from '../../functions';
import { modificarEstadoLogueado, modificarUsuarioLogueado, modificarCantidadClasesPorComprar} from '../../Actions/Actions';


export default function SearchBar() {
  enum Role { USER, PROFESSOR, ADMIN }
  const [user, setUser] = useState({ mail: "", role: null, name: "", lastName: "", iat: null })
  const [userEmail, setUserEmail] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [wrongPassword, setWrongPassword] = useState(false)
  const [errors, setErrors] = useState({ email: null, password: null })

  const [cestaLength, setCestaLength] = useState(0)


  const [showRegister, setShowRegister] = useState(false)
  const handleCloseRegister = () => setShowRegister(false);;
    const handleShowRegister = () => setShowRegister(true);
  

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: `${s.botonswal}`
    },
    buttonsStyling: false
  })
  
  const dispatch = useDispatch();

  /**
   * 
const dispatch = useDispatch();
    dispatch(modificarClasesPorComprar(clasesPorComprar));

   */
  // Esto nos permite conseguir el usuario logueado
  useEffect(() => {
    async function obtenerUsuarioLogueado() {
      // Si hay alguien logueado
      if (localStorage.getItem('login')) {
        // Pero no hay cookies, anulamos el logueado
        if (!document.cookie) {
          localStorage.removeItem('login');
        }
        // Obtenemos el token de la cookie del navegador
        const token = getCookieValue('token').replaceAll("\"", '');
        // Si no hay errores
        try {
          // Verificamos el usuario en el servidor
          const thisUser = await axios.post(`http://localhost:3001/api/verify`, {}, { withCredentials: true, headers: { Authorization: token } })
          // Si existe el usuario
          if (thisUser) {
            // Seteamos el usuario como logueado
            setUser(thisUser.data)
            // Buscamos la cesta del usuario
            const clases = await axios.get(`http://localhost:3001/api/carrito/all/${thisUser.data.mail}`)
            if (clases) {
              // Seteamos la cesta del usuario
              setCestaLength(clases.data.length)
            }
            // Si no existe el usuario
          } else {
            setUser({ mail: "", role: null, name: "", lastName: "", iat: null })
            setCestaLength(0)
          }
          // Si hay errores
        } catch {
          setUser({ mail: "", role: null, name: "", lastName: "", iat: null })
          setCestaLength(0)
          console.log('Se produjo un error')
        }
      }
    }
    obtenerUsuarioLogueado()
  }, [])

  // const dispatch = useDispatch();
  // dispatch(modificarEstadoLogueado(verificacionLogueo()));

  const logueado = useSelector(state => state['logueado']);
  const usuario = useSelector(state => state['user']);
  console.log('USUARIOOOOOOO', usuario)

  useEffect(() => {
    console.log('', logueado)
    verificacionLogueo()
    console.log('DISCO', auth.currentUser)
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


  const cantidadClasesPorComprar = useSelector(state => state['cantidadClasesPorComprar'])
  
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
      if (user.status === 200) {
        Swal.fire(
          'Exito!',
          'Se Inició sesión correctamente!',
          'success'
        )
        //  window.location.reload();
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

  async function localsignOut() {
    // auth.signOut();
    try {
      if (usuario[0] === 'google') {
        await firebase.auth().signOut();
      } else {
        await axios.post(`http://localhost:3001/api/login/logout`, {}, { withCredentials: true })
        deleteAllCookies()
        localStorage.removeItem('login')
      }
      await firebase.auth().signOut();
      dispatch(modificarUsuarioLogueado(''))
      dispatch(modificarCantidadClasesPorComprar(0))

      swalWithBootstrapButtons.fire(
        'Exito!',
        'Se cerro sesión correctamente!',
        'success'
      )
      // window.location.reload();
    } catch (err) {
      Swal.fire(
        'Error!',
        'Fallo al cerrar sesión!',
        'error'
      )
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

  const book = <FontAwesomeIcon icon={faBook} style={{ fontSize: "30px", marginLeft: "25px" }} className="" />


  return (
    <Navbar expand="lg" className={s.navbar}>
      <Container className={s.padding}>
        <Navbar.Brand className={'ms-3'} href="#home"><Link to={"/home"}><img src={logo} alt='U CLASES Logo' style={{ height: '40px' }}></img></Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav"  >
          <Nav className={`me-auto`}>
            <Link className={`${s.color} nav-link ms-4 text-decoration-none`} to={"/clases"}>Clases</Link>
            <Link className={`${s.color} nav-link ms-4 text-decoration-none`} to={"/chat"}>Chatea con la comunidad</Link>


            {/* {loggedOrNot() ?
              <NavDropdown className={`${s.color} ms-4 text-decoration-none justify-content-end`} title="Sesión" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => signOut()}>
                  Desconectarse
                </NavDropdown.Item>
              </NavDropdown>
              :
              <NavDropdown className={`ms-4 text-decoration-none ${s.enlace}`} title="Cuenta" id="basic-nav-dropdown">
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

            } */}
            {loggedOrNot() && user.role === Role.PROFESSOR ?
              <Link className={`${s.color} nav-link ms-4 text-decoration-none`} to={"/clases/add"}>Agrega tu Propia Clase!</Link>
              :
              null
            }

          </Nav>

          <Nav>
            <Navbar.Text className={` ${s.color} nav-link ms-4 text-decoration-none ${s.aLaDerecha}`}>
              <Link to="/cesta" className={s.enlaceCesta}>
                <IonIcon icon={bookOutline} className={s.iconDumb}></IonIcon>
                <span>{cantidadClasesPorComprar}</span>
              </Link>
            </Navbar.Text >
            {Array.isArray(usuario) ?
              <NavDropdown className={`${s.enlace} ms-4 text-decoration-none justify-content-end`} title={usuario[1].mail} id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => localsignOut()}>
                  Desconectarse
                </NavDropdown.Item>
              </NavDropdown>

              // <Navbar.Text className={` ${s.color} nav-link ms-4 text-decoration-none ${s.aLaDerecha}`}>
              //   {user.mail}
              // </Navbar.Text>


              // {/* <Link className={`${s.color} nav-link ms-4 text-decoration-none`} to={"/perfil"}>Profile</Link> */}


              :
              <>
                <Navbar.Text className={` ${s.color} nav-link ms-4 text-decoration-none`}>
                  <Link to='/login' className={s.enlaceInicio}>
                    Inicia sesión
                  </Link>
                </Navbar.Text>
                <Navbar.Text className={` ${s.color} nav-link ms-4 text-decoration-none`} onClick={() => handleShowRegister()}>
                  Regístrate
                </Navbar.Text>
                <Register show={showRegister} handleClose={handleCloseRegister} />
              </>
            }



          </Nav>
        </Navbar.Collapse>



      </Container>
    </Navbar>
  );
}

