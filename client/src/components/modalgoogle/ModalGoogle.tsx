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

import React, { useState } from 'react'
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

  const history = useHistory()
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: `${s.botonswal}`
    },
    buttonsStyling: false
  })
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
      lastName: apellido,
      User_mail: auth.currentUser.email,
      name: nombre,
      role: values.role,
      city: values.city,
      state: '',
      country: ''
    }
    let userWithPassword = {
      ...user,
      password: 'google'
    }
    console.log('PROBANDO', user)
    if (values.mail === 'braiansilva@gmail.com') user.role = Role.ADMIN;
    try {
      const registro = await axios.post('http://localhost:3001/api/session/register', userWithPassword, { withCredentials: true })

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
      history.push('/home')
      window.location.reload();
    } catch (error) {
      console.log('LISTO')
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
              </Col>
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