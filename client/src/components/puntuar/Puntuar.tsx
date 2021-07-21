// import { createUser, loginWithGoogle } from '../../firebase';
import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { UserProps } from '../../../../interfaces'
import { Formik } from 'formik';
import { validationSchemaRegister } from '../../utils/validations';
import imageParser from '../../utils/imageParser';
import { Button, Modal, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { Rating } from 'react-simple-star-rating'
import { reduceEachTrailingCommentRange } from 'typescript';
enum ErrorType { INCOMPLETE_INPUTS, ALREADY_EXISTS }
enum Role { USER, PROFESSOR, ADMIN }

type Props = {
  handleClose: (e: any) => any,
  show: boolean,
}

const Puntuar = () => {

  // const [mail, setMail] = React.useState('')
  // const [password, setPass] = React.useState('')
  // const [name, setName] = React.useState('')
  // const [lastName, setlastName] = React.useState('')
  // const [city, setCity] = React.useState('')
  // const [state, setState] = React.useState('')
  // const [role, setRole] = React.useState(0
  const [rating, setRating] = useState(0)
  let rate= rating
  let coment=""
  switch (rate) {
    case 1:
      coment="Horrible"
      break
    // Do something for summer
    case 2:
      coment="Malo"
      break
    //Do something for winter
    case 3:
      coment="Normal"
      break
    //Do something for spring
    case 4:
      coment="Bueno"
      break
    //Do something for autumn
    case 5:
      coment="Excelente"
      break
    default:
      coment=""
  }
  const handleRating = (rate) => {
    setRating(rate)
    // Some logic
  }
  async function handleSubmitRegister(values) {
    console.log(values)
    let user={
      comentario: values.comentario,
      id: 1,
      puntuacion: rating,
      alumno: "mauroleonel@gmail.com"
    }
    try {
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
      if (error.response && error.response.data.type === ErrorType.ALREADY_EXISTS) {
        alert('El usuario ya existe!')
      } else if (error.response && error.response.data.type === ErrorType.INCOMPLETE_INPUTS) {
        alert('Debe ingresar mail, nombre y apellido')
      }
    }
  }
  console.log(rating)
  return (
    <>
      <Modal show={true}>
        <Modal.Header>
          <Modal.Title>Llena el formulario para dejar tu opinion de la clase!</Modal.Title>
          <Button variant="secondary">
            X
          </Button>
        </Modal.Header>
        <Modal.Body className="pb-0">
          <Formik
            
            initialValues={{
              comentario:"",
 
            }}
  
            onSubmit={(values) => {
              console.log(values)
              handleSubmitRegister(values)

            }}
          >
            {({ handleSubmit, handleChange, values, errors, touched, handleBlur }) => (
              
              <form onSubmit={handleSubmit} className="mt-6 mb-4">
                <h2 >Clase de matematica</h2>
                <h3>Profesor: Nose</h3>
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
          <Button variant="secondary">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}



export default Puntuar