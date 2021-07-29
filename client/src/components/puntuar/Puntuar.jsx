// import { createUser, loginWithGoogle } from '../../firebase';
import React, { useState,  useEffect } from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom";

import { Formik } from 'formik';
import { validationSchemaRegister } from '../../utils/validations';
import imageParser from '../../utils/imageParser';
import { Button, Modal, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { Rating } from 'react-simple-star-rating'
import { reduceEachTrailingCommentRange } from 'typescript';

const Puntuar = ({ show, handleClose, clase, alum, index }) => {

 var id=clase.id
 console.log("CLASE", clase.id)
 console.log("ID",id)
  // const [mail, setMail] = React.useState('')
  // const [password, setPass] = React.useState('')
  // const [name, setName] = React.useState('')
  // const [lastName, setlastName] = React.useState('')
  // const [city, setCity] = React.useState('')
  // const [state, setState] = React.useState('')
  // const [role, setRole] = React.useState(0
  const [rating, setRating] = useState(0)
  const [clas, setClas]=useState(clase)
  let rate= rating
  let coment=""
  switch (rate) {
    case 1:
      coment="Muy malo"
      break
    case 2:
      coment="Malo"
      break
    case 3:
      coment="Normal"
      break
    case 4:
      coment="Bueno"
      break
    case 5:
      coment="Excelente"
      break
    default:
      coment=""
  }
  const handleRating = (rate) => {
    setRating(rate)
  }
  
  
  async function handleSubmitRegister(values) {
    
    try {
      console.log(index)
      const clases= await axios.get('http://localhost:3001/api/clases/all')
      console.log(clases)
      let user={
      comentario: values.comentario,
      id: id,
      puntuacion: rating,
      alumno: alum
    }
      const registro = await axios.post('http://localhost:3001/api/puntuacion/', user, { withCredentials: true })
      console.log("Registro", registro.data)
      if(registro.data===`${user.alumno} ya comentó esta clase si desea actualice su puntuacion`){
        Swal.fire(
          'Error!',
          'Ya enviaste tu opinion!',
          'error'
          )
      } else if (registro.status === 200)  {    
       Swal.fire(
        'Exito!',
        'Se envio tu opinion correctamente!',
        'success'
        )
      }
    }
    catch (error) {
      if (error.response) {
        alert('El usuario ya existe!')
      } else if (error.response) {
        alert('Debe ingresar mail, nombre y apellido')
      }
    }
  }
  console.log("Clase e", clas)
 
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Llena el formulario para dejar tu opinion de la clase!</Modal.Title>
          <Button variant="secondary" onClick={handleClose}>
            X
          </Button>
        </Modal.Header>
        <Modal.Body className="pb-0">
          <Formik
            
            initialValues={{
              comentario:"",
              id: clase.id
 
            }}
  
            onSubmit={(values) => {
              console.log(values)
              handleSubmitRegister(values)

            }}
          >
            {({ handleSubmit, handleChange, values, errors, touched, handleBlur }) => (
              
              <form onSubmit={handleSubmit} className="mt-6 mb-4">
                <h2 >Clase de {clase.materia}</h2>
                <h3>Profesor: {clase.profesor.name} {clase.profesor.lastName}</h3>
                <div style={{ display: 'flex', position: 'relative', height: 'fit-content', alignContent: 'space-between', width: '560px', alignItems: 'center' }}>
										<div style={{ width: '250px', fontSize: '25px' }}>
                     <label htmlFor="inputEmail">Puntuacion</label>
										</div>
										
									</div>
                      <div style={{ fontSize: '25px', fontWeight: 'bold', width: '350px', height: 'fit-content', position: 'relative',}}>
											<Rating onClick={handleRating} ratingValue={rating} /* Rating Props */ />
										{coment}
										</div>
                <div className="form-row " >
                  <Col md={12} className="form-group mt-2">
                    <label htmlFor="inputPassword4">Contanos mas sobre la clase</label>
                    <textarea
                      name="comentario"
                      value={values.comentario}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      id="inputcomentario4"
                      className={`form-control ${errors.comentario && touched.comentario ? 'is-invalid' : ''}`}
                    />
                    {errors.comentario && touched.comentario && <div className='invalid-feedback'>{errors.comentario}</div>}
                  </Col>
                </div>
                <Row  md={12} className=" mt-3 ">
                  <Col  className="d-flex justify-content-center">
                    <button type="submit" id="local" className="btn btn-primary">Enviar opinion</button>
                  </Col>
                </Row>
              </form >
            )}
          </Formik>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary"  onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}



export default Puntuar