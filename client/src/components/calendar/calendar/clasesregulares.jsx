import axios from 'axios';
import React from 'react'
import { Formik, Field } from 'formik';
import { Form, Row, Col, Container, Button } from 'react-bootstrap';
import getCookieValue from '../../../cookieParser';
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
export const Clasesregulares = (props) => {
    const [startDate, setStartDate] = React.useState(new Date());
    let horasminmax =startDate.toISOString()
    let date3 = new Date(horasminmax);
    let horainicial=date3.getHours().toString()
    var minTime = new Date();
        minTime.setMinutes(0);
        minTime.setHours(8);
    var maxTime = new Date();
        maxTime.setMinutes(0);
        maxTime.setHours(23);
    const dias = [
        "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"
    ]
    return (
        <Container className='shadow p-1 mb-1 bg-white rounded flex'>
        <h4>Agregar horarios</h4>
        <Formik
            initialValues={{
                nombre: "",
                dias:"",
                horario:"",
                fecha:""  
            }}
            onSubmit={async (values, { resetForm }) => {
                try {
                    var j=0
                    if(values.dias==="Lunes")j=1
                    if(values.dias==="Martes")j=2
                    if(values.dias==="Miercoles")j=3
                    if(values.dias==="Jueves")j=4
                    if(values.dias==="Viernes")j=5
                    if(values.dias==="Sabado")j=6
                    if(values.dias==="Domingo")j=7
                    const fechaa=startDate
                    fechaa.setDate(fechaa.getDate() + (j + 7 - fechaa.getDay()) % 7)
                    
                    const jsonDate =fechaa.toISOString();
                    const date2 = new Date(jsonDate);
                    var minutes=date2.getMinutes().toString()
                    var horas=date2.getHours().toString()
                    var horasfinal=parseInt(horas) + values.horario
                    horasfinal=horasfinal.toString()
                    if(minutes.length<2){
                        minutes= 0 + minutes
                    }
                    if(horas.length<2){
                        horas=0+horas
                    }
                    if(horasfinal.length<2){
                        horasfinal=0+horasfinal
                    }
                    const token = getCookieValue('token').replaceAll("\"", '')
                    const userT= await axios.post(`http://localhost:3001/api/verify`, {},{ withCredentials: true, headers: {Authorization: token}})
                    var query1=(horas) + ":" + minutes + ":00"
                    var query2=horasfinal + ":" + minutes + ":00"
                    for(var i=0;i<values.nombre;i++){
                        const horario= {
                            email: props.email, //Arreglar lo de los mails
                            fecha: {
                                anio: date2.getFullYear(),
                                mes: date2.getMonth() + 1,
                                dia: date2.getDate()
                            },
                            disponible: [[query1, query2]]
                        }
                        const clase= await axios.post('http://localhost:3001/api/calendario/add', horario, {headers: {Authorization: token}})
                        if (clase) {
                            console.log("Clase", clase)
                            if(clase.data!=="El horario disponible es incorrecto"){
                                date2.setDate(date2.getDate() + 7)
                                
                            }else{
                                alert("Se ha producido un error al añadir los horarios")
                            }
                        }
                        else {
                            alert("Se ha producido un error al añadir los horarios")
                        }
                    }
                    
                }
                catch (err) {
                    alert("Se ha producido un error al añadir los horarios")
                }
            }}
        >
            {({ handleSubmit, handleChange, values, errors, handleBlur, touched }) => (
                <Form className='mt-7' onSubmit={handleSubmit}>
                    <Form.Group>
                    <Row>
                         <Col sm={12} md={8}>
									
									<Form.Control
										as='select'
										name='dias'
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.dias}
										className={`form-control ${errors.dias && touched.dias ? 'is-invalid' : ''
											}`}
									>
										<option value='' >Seleccione un dia</option>
										{dias.map((nivel, i) => {
											return <option key={i + 30} value={nivel}>{nivel}</option>
										}
										)}
									</Form.Control>
									{errors.nivel && touched.nivel ? (
										<div className='invalid-feedback'>{errors.nivel}</div>
									) : null}
						</Col>
                    </Row>
                    <Row className='mb-1'>
                            <Col sm={12} md={8}>
                                <Form.Label className='text'>Cuantas semanas dura:</Form.Label>
                                <Field
                                    name='nombre'
                                    type='number'
                                    min="1"
                                    max="30"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.nombre}
                                    className={`form-control ${errors.nombre && touched.nombre ? 'is-invalid' : ''
                                        }`}
                                />
                                {errors.nombre && touched.nombre ? (
                                    <div className='invalid-feedback'>{errors.nombre}</div>
                                ) : null}
                            </Col>
                    </Row>
                    <Col sm={12} md={8}>
                                <Form.Label className='text'>Fecha inicial</Form.Label>
                    <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    timeFormat="HH:mm"
                                    timeIntervals={30}
                                    timeCaption="time"
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                    showTimeSelect
                                    minDate={(new Date())}
                                    minTime={minTime}
                                    maxTime={maxTime}
                            />
                            </Col>
                    <Row className='mb-1'>
                            <Col sm={12} md={8}>
                                <Form.Label className='text'>Cuantas horas dura:</Form.Label>
                                <Field
                                    name='horario'
                                    type='number'
                                    min="1"
                                    max={23-horainicial}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.horario}
                                    className={`form-control ${errors.horario && touched.horario ? 'is-invalid' : ''
                                        }`}
                                />
                                {errors.horario && touched.horario ? (
                                    <div className='invalid-feedback'>{errors.horario}</div>
                                ) : null}
                            </Col>
                    </Row>
                            
                            <Col className='d-flex justify-content-center'>
									<Button type='submit' className='text-uppercase'>
										Enviar
									</Button>
							</Col>
                    </Form.Group>
                </Form>
            )}
        </Formik>
    </Container>
    )
}
