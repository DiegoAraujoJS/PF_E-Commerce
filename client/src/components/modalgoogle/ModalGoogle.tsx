// import { Modal, Button } from 'react-bootstrap';

// export default function ModalGoogle(props) {
//     return (
//       <Modal
//         {...props}
//         size="lg"
//         aria-labelledby="contained-modal-title-vcenter"
//         centered
//       >
//         <Modal.Header closeButton>
//           <Modal.Title id="contained-modal-title-vcenter">
//             Complete sus datos
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           FORMULARIO
//         </Modal.Body>

//       </Modal>
//     );
//   }

import React, { useEffect,useState } from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { IUser } from '../../../../interfaces'
import { Formik } from 'formik';
import { validationSchemaGoogle, validationSchemaRegister } from '../../utils/validations';
import imageParser from '../../utils/imageParser';
import { Button, Modal, Row, Col, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import s from './ModalGoogle.module.css'
import { closeOutline, eyeOffOutline } from "ionicons/icons";
import { IonIcon } from '@ionic/react';
import { auth } from '../../firebase';
import getCookieValue from '../../cookieParser';

enum ErrorType { INCOMPLETE_INPUTS, ALREADY_EXISTS }
enum Role { USER, PROFESSOR, ADMIN }


type Props = {
  handleClose: (e: any) => any,
  show: boolean,
}

const ModalGoogle: React.FC<Props> = ({ show, handleClose }) => {

  const [alreadyCreated, /* setAlreadyCreated */] = React.useState(false)
  const [countries, setCountries] = React.useState([])
  const [states, setStates] = React.useState([])
  const [cities, setCities] = React.useState([])
  const [chosenCountry, setChosenCountry] = React.useState({})

  const history = useHistory()
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: `${s.botonswal}`
    },
    buttonsStyling: false
  })

  useEffect(() => {

    const getCountries = async () => {
      const response_1 = await axios.get('http://localhost:3001/api/allCountries/countries')

      if(response_1.status === 200){
        setCountries([ {
          "name": "Selecciona un país",
          "unicodeFlag": ""
      }
      , ...response_1.data.data])
      }

    }
    if (!countries.length) getCountries()
  }, [])

  async function handleSubmitRegister(values) {
    let nombreCompleto = auth.currentUser.displayName;
    let nombre = '';
    let apellido = '';
    if (nombreCompleto.indexOf(' ') !== -1) {
      let nombreArray = nombreCompleto.split(' ');
      nombre = nombreArray.shift()
      apellido = nombreArray.join(' ')
    } else {
      nombre = nombreCompleto.slice(0, 1);
      apellido = nombreCompleto.slice(1);
    }
    let user: IUser = {
      name: nombre,
      lastName: apellido,
      User_mail: auth.currentUser.email,
      role: values.role,
      country: values.country,
      state: values.state,
      city: values.city
    }


    // }

    // let user: IUser = {
    //   lastName: values.lastName,
    //   User_mail: values.mail,
    //   name: values.name,
    //   role: values.role,
    //   city: values.city,
    //   country: values.country,
    //   state: values.state
    // }

    let userWithPassword = {
      ...user,
      password: 'google'
    }
    if (values.mail === 'braiansilva@gmail.com') user.role = Role.ADMIN;
    try {
      console.log(userWithPassword)
      const registro = await axios.post('http://localhost:3001/api/usuarios/register', userWithPassword, { withCredentials: true })

      if (registro.status === 200) {
        console.log('LISTO')
      }
    }
    catch (error) {
      console.log('Listo')
    }
    try {
      const login = await axios.post(`http://localhost:3001/api/login`, {
        mail: auth.currentUser.email,
        password: 'google'
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

  async function handleCountryChange(e) {
    setChosenCountry(e.target.value)
    const response_2 = await axios.post('http://localhost:3001/api/allCountries/states', {country: e.target.value})
    if(response_2.status === 200){
      setStates([ {
        "name": "Selecciona un estado / provincia",
        "state_code": ""
    }, ...response_2.data])
  }
}

async function handleStateChange(e) {
    console.log('country', chosenCountry)
    const response_3 = await axios.post('http://localhost:3001/api/allCountries/cities', {country: chosenCountry, state: e.target.value})
    console.log(response_3.data)
    if(response_3.status === 200){
      setCities([ "Selecciona una ciudad", ...response_3.data])
    
  }
}

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title>Completa este formulario para continuar</Modal.Title>
          <Button variant="secondary" onClick={handleClose}>
            <IonIcon icon={closeOutline} className={s.iconDumb}></IonIcon>
          </Button>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={validationSchemaGoogle}
            initialValues={{
              role: 0,
              city: ""
            }}
            onSubmit={(values) => {
              console.log(values)
              handleSubmitRegister(values)
            }}
          >
            {({ handleSubmit, handleChange, values, errors, touched, handleBlur }) => (
              <form onSubmit={handleSubmit} className="mt-6">
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

: null}
                 {/* <Col md={12} className="form-group mt-2">
                  <label htmlFor="inputCity">Ciudad</label>
                  <input
                    name="city"
                    value={values.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    className={`form-control ${errors.city && touched.city ? 'is-invalid' : ''}`}
                    id="inputCity"
                  />
                  {errors.city && touched.city && <div className='invalid-feedback'>{errors.city}</div>}
                </Col> */}
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
                <button type="submit" id="local" className={`btn btn-primary ${s.boton}`}>Continuar</button>
              </form >
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ModalGoogle