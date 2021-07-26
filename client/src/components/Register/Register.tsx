// import { createUser, loginWithGoogle } from '../../firebase';
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { IUser } from '../../../../interfaces'
import { Formik } from 'formik';
import { validationSchemaRegister } from '../../utils/validations';
import imageParser from '../../utils/imageParser';
import { Button, Modal, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';

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
      }
    }
    catch (error) {
      if (error.response && error.response.data.type === ErrorType.ALREADY_EXISTS) {
        Swal.fire(
          'Error!',
          'El usuario ya existe!',
          'error'
        )
      } else if (error.response && error.response.data.type === ErrorType.INCOMPLETE_INPUTS) {
        Swal.fire(
          'Error!',
          'Debe ingresar mail, nombre y apellido',
          'error'
        )
      }
    }
  }
  async function googleSubmit() {

  }

  useEffect(() => {

    const getCountries = async () => {
      const response_1 = await axios.get('http://localhost:3001/api/allCountries/countries')

      if (response_1.status === 200) {
        setCountries(response_1.data.data)
      }

    }
    if (!countries.length) getCountries()
  }, [])


  async function handleCountryChange(e) {
    setChosenCountry(e.target.value)
    const response_2 = await axios.post('http://localhost:3001/api/allCountries/states', { country: e.target.value })
    if (response_2.status === 200) {
      setStates(response_2.data)
    }
  }

  async function handleStateChange(e) {
    console.log('country', chosenCountry)
    const response_3 = await axios.post('http://localhost:3001/api/allCountries/cities', { country: chosenCountry, state: e.target.value })
    console.log(response_3.data)
    if (response_3.status === 200) {
      setCities(response_3.data)

    }
  }

  const [checkPassword, setCheckPassword] = useState({
    password: "",
    confirmar: "",
  })
  const handlePassword = (e) =>{
    if(e.target.name === "password"){
      setCheckPassword({
        ...checkPassword,
        [e.target.name] : e.target.value
      })
    }
    else{
      setCheckPassword({
        ...checkPassword,
        [e.target.name] : e.target.value
      })
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
            onSubmit={(values, { resetForm }) => {
              if (values.password === values.confirmar) {
                handleSubmitRegister(values)
                resetForm()
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
                    <label >Contraseña</label>
                    <input
                      name="password"
                      value={values.password}
                      onChange={(e) => { handleChange(e); handlePassword(e) }}
                      onBlur={handleBlur}
                      type="password"
                      id="inputPassword4"
                      className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`}
                    />
                    {errors.password && touched.password && <div className='invalid-feedback'>{errors.password}</div>}
                  </Col>
                  <Col md={12} className="form-group mt-2">
                    <label >Confirmar Contraseña</label>
                    <input
                      name="confirmar"
                      value={values.confirmar}
                      onChange={(e) => { handleChange(e); handlePassword(e) }}
                      onBlur={handleBlur}
                      type="password"
                      id="inputPassword4"
                      className={`form-control ${(errors.confirmar && touched.confirmar) || ((checkPassword.password !== checkPassword.confirmar) &&
                        touched.confirmar )? 'is-invalid' : ''}`}
                    />
                    {errors.confirmar && touched.confirmar && <div className='invalid-feedback'>{errors.confirmar}</div>}
                    {(checkPassword.password !== checkPassword.confirmar) && touched.confirmar && <div 
                    style={{color:"#dc3545", fontSize:"0.875em", marginTop:"0.25rem"}}> 
                    <p>Las contraseñas deben ser las mismas</p> 
                    </div>}
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

                  <label >Pais</label>
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
                {chosenCountry ?
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
                  : null}

                {states ? <Col md={12} className="form-group mt-2">
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
                </Col> : null}

                <div className="form-row mt-2">
                  <Row className=" mt-2" >
                    <label className="form-check-label" htmlFor="gridCheck">Rol</label><br></br>
                    <Col md={5} className="d-flex justify-content-start align-items-center p-0 ms-3">
                      <input
                        name="role"
                        type="radio" id="gridCheck"
                        onChange={handleChange}
                        value={Role.USER}
                        defaultChecked
                      />
                      <label className="form-check-label ms-3" htmlFor="gridCheck">User</label><br></br>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={5} className="d-flex justify-content-start align-items-center p-0 ms-3">
                      <input type="radio"
                        name="role"
                        value={Role.PROFESSOR}
                        onChange={handleChange}
                      ></input>
                      <label className="form-check-label ms-3 " htmlFor="gridCheck">Profesor</label><br></br>
                    </Col>
                  </Row>
                </div>
                <Row md={12} className=" mt-3 ">
                  <Col sm={6} md={6} lg={6} className="d-flex justify-content-center">
                    <button type="submit" id="local" className="btn btn-primary">Regístrate</button>
                  </Col>
                  <Col sm={6} md={6} lg={6}>
                    <button onClick={googleSubmit} id="google" className="btn btn-primary " >Regístrate con Google</button>
                    {alreadyCreated ? <span style={{ color: 'red' }}>El usuario ya está siendo usado</span> : ''}
                  </Col>
                </Row>
              </form >
            )}
          </Formik>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}



export default Register