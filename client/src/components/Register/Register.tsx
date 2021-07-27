// import { createUser, loginWithGoogle } from '../../firebase';
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { IUser } from '../../../../interfaces'
import { Formik } from 'formik';
import { validationSchemaRegister } from '../../utils/validations';
import imageParser from '../../utils/imageParser';
import { Button, Modal, Row, Col, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import getCookieValue from '../../cookieParser';

enum ErrorType { INCOMPLETE_INPUTS, ALREADY_EXISTS }
enum Role { USER, PROFESSOR, ADMIN }

type Props = {
  handleClose: (e: any) => any,
  show: boolean,
}
const paises = [{ name: 'Argentina', unicodeFlag: '🇧🇩' }]
const estados = [{ name: 'Provincia de Buenos Aires' }]
const ciudades = ['campana']

const Register: React.FC<Props> = ({ show, handleClose }) => {

  // const [mail, setMail] = React.useState('')
  // const [password, setPass] = React.useState('')
  // const [name, setName] = React.useState('')
  // const [lastName, setlastName] = React.useState('')
  // const [city, setCity] = React.useState('')
  // const [state, setState] = React.useState('')
  // const [role, setRole] = React.useState(0)
  const [alreadyCreated, /* setAlreadyCreated */] = React.useState(false)
  const [countries, setCountries] = React.useState([])
  const [states, setStates] = React.useState([])
  const [cities, setCities] = React.useState([])

  const [chosenCountry, setChosenCountry] = React.useState({})
  const [isWrongPassword, setWrongPassword] = React.useState(false)

  const history = useHistory()

  async function handleSubmitRegister(values) {

    let user: IUser = {
      lastName: values.lastName,
      User_mail: values.mail,
      name: values.name,
      role: values.role,
      city: values.city,
      country: values.country,
      state: values.state
    }
    let userWithPassword = {
      ...user,
      password: values.password
    }
    if (values.mail === 'braiansilva@gmail.com') user.role = Role.ADMIN;
    try {
      const registro = await axios.post('http://localhost:3001/api/usuarios/register', userWithPassword, { withCredentials: true })

      if (registro.status === 200) {
        Swal.fire(
          'Exito!',
          'Se registro correctamente!',
          'success'
        )
        try {
          const login = await axios.post(`http://localhost:3001/api/login`, {
            mail: userWithPassword.User_mail,
            password: userWithPassword.password
          }, { withCredentials: true })
          document.cookie = `token=${JSON.stringify(login.data.token)}`
          localStorage.setItem('login', 'true')
          const user = await axios.post(`http://localhost:3001/api/verify`, {}, { headers: { Authorization: getCookieValue('token').replaceAll("\"", '') } })
          history.push('/')
          window.location.reload();
        } catch (error) {
          console.log('LISTO')
        }
      }
    }
    catch (error) {
      if (error.response && error.response.data.type === ErrorType.ALREADY_EXISTS) {
        alert('El usuario ya existe!')
      } else if (error.response && error.response.data.type === ErrorType.INCOMPLETE_INPUTS) {
        alert('Debe ingresar mail, nombre y apellido')
      }
    }
  }

  useEffect(() => {

    const getCountries = async () => {
      const response_1 = await axios.get('http://localhost:3001/api/allCountries/countries')

      if (response_1.status === 200) {
        setCountries([ {
          "name": "Selecciona un país",
          "unicodeFlag": ""
      }
      , ...response_1.data.data])
      }

    }
    if (!countries.length) getCountries()
  }, [])

  async function handleCountryChange(e) {
    setChosenCountry(e.target.value)
    const response_2 = await axios.post('http://localhost:3001/api/allCountries/states', { country: e.target.value })
    if (response_2.status === 200) {
      setStates([ {
        "name": "Selecciona un estado / provincia",
        "state_code": ""
    }, ...response_2.data])
    }
  }

  async function handleStateChange(e) {
    console.log('country', chosenCountry)
    const response_3 = await axios.post('http://localhost:3001/api/allCountries/cities', { country: chosenCountry, state: e.target.value })
    console.log(response_3.data)
    if (response_3.status === 200) { 
        setCities([ "Selecciona una ciudad", ...response_3.data])

    }
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Llena el formulario para registrate!</Modal.Title>
          <Button variant="secondary" onClick={handleClose}>
            X
          </Button>
        </Modal.Header>
        <Modal.Body className="pb-0">
          <Formik
            validationSchema={validationSchemaRegister}
            initialValues={{
              name: "",
              lastName: "",
              mail: "",
              password: "",
              role: 0,
              country: "",
              city: "",
              state: "",
              confirmar: "",
            }}
            onSubmit={(values) => {
              console.log(values)
              if (values.password === values.confirmar) {
                handleSubmitRegister(values)
              } else {
                setWrongPassword(true)
              }

            }}
          >
            {({ handleSubmit, handleChange, values, errors, touched, handleBlur }) => (
              <form onSubmit={handleSubmit} className="mt-6 mb-4">
                <div className="form-row " >
                  <Col md={12} className="form-group mt-6" >
                    <label htmlFor="inputEmail">Email</label>
                    <input
                      name="mail"
                      value={values.mail}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text" id="inputEmail"
                      className={`form-control ${errors.mail && touched.mail ? 'is-invalid' : ''}`}
                    />
                    {errors.mail && touched.mail && <div className='invalid-feedback'>{errors.mail}</div>}

                  </Col>
                  <Col md={12} className="form-group mt-2">
                    <label htmlFor="inputPassword4">Contraseña</label>
                    <input
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="password"
                      id="inputPassword4"
                      className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`}
                    />
                    {errors.password && touched.password && <div className='invalid-feedback'>{errors.password}</div>}
                  </Col>

                  <Col md={12} className="form-group mt-2">
                    <label htmlFor="inputPassword4">Confirmar Contraseña</label>
                    <input
                      name="confirmar"
                      value={values.confirmar}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="password"
                      id="inputPassword4"
                      className={`form-control ${errors.confirmar && touched.confirmar ? 'is-invalid' : ''}`}
                    />
                    {errors.confirmar && touched.confirmar && <div className='invalid-feedback'>{errors.confirmar}</div>}
                  </Col>
                </div>
                <Col md={12} className="form-group mt-2">
                  <label htmlFor="inputAddress">Nombre</label>
                  <input
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    className={`form-control ${errors.name && touched.name ? 'is-invalid' : ''}`}
                    id="inputAddress"
                  />
                  {errors.name && touched.name && <div className='invalid-feedback'>{errors.name}</div>}
                </Col>
                <Col md={12} className="form-group mt-2">
                  <label htmlFor="inputAddress2">Apellido</label>
                  <input
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    className={`form-control ${errors.lastName && touched.lastName ? 'is-invalid' : ''}`}
                    id="inputAddress2"
                  />
                  {errors.lastName && touched.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                </Col>
                <Col md={12} className="form-group mt-2">
                  {/* {
            "name": "Bangladesh",
            "
        } */}
                  <label >País</label>
                  <select
                    name="country"
                    onChange={(e) => { handleChange(e); handleCountryChange(e) }}
                    className="form-control"
                  >
                    {countries.length && countries.map(c => {

                      return <option value={c.name}>{c.name} {c.unicodeFlag}</option>
                    }
                    )}

                  </select>
                </Col>
{ Object.keys(chosenCountry).length ?
  <Col md={12} className="form-group mt-2">
  <label >Estado/Provincia</label>
  <select
    name="state"
    onChange={(e) => { handleChange(e); handleStateChange(e) }}
    disabled={!countries.length}
    className="form-control"
  >
    {states.length && states.map(c => <option value={c.name} >{c.name}</option>)}
  </select>
</Col>
: null

}
                
               {
                 cities.length > 1 ? 
                 <Col md={12} className="form-group mt-2">
                  <label >Ciudad</label>
                  <select
                    onChange={handleChange}
                    name="city"
                    disabled={!states.length}
                    className="form-control"
                    value={values.city}
                  >
                    {cities.length && cities.map(c => <option value={c}>{c}</option>)}
                  </select>
                </Col>
                 :
                 null
               }
                

                <Col md={12} className="form-group mt-2">
                  <Form.Group as={Row} className="mb-3 mt-2">
                    <Form.Label as="legend" column sm={2}>
                      Rol
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Check
                        type="radio"
                        label="Usuario"
                        name="role"
                        onChange={handleChange}
                        value={Role.USER}
                        defaultChecked
                      />
                      <Form.Check
                        type="radio"
                        label="Profesor"
                        name="role"
                        value={Role.PROFESSOR}
                        onChange={handleChange}
                      />
                    </Col>
                  </Form.Group>
                </Col>


                <Row md={12} className=" mt-3 ">
                  <Col className="d-flex justify-content-center">
                    <button type="submit" id="local" className="btn btn-primary w-100">Regístrate</button>
                  </Col>

                </Row>
                {alreadyCreated ?
                  <Row md={12} className=" mt-3 ">
                    <Col className="d-flex justify-content-center" >
                      <span style={{ color: 'red' }}>El usuario ya está siendo usado</span>
                    </Col>
                  </Row>
                  :
                  ''
                }
              </form >
            )}
          </Formik>

        </Modal.Body>
      </Modal>
    </>
  )
}



export default Register