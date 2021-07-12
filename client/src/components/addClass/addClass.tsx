import React from 'react'
import { Formik , Field} from 'formik';
import { validationSchemaStepOne } from '../../utils/validations';
import { Form, Row, Col, Container, Button } from 'react-bootstrap';
import { newClass } from '../../Actions/Actions';
import { connect } from 'react-redux';


const materias = [
    "Física",
    "Biología",
    "Anatomía y fisiología",
    "Matemáticas",
    "Química",
    "Ecología",
    "Metodología de la investigación",
    "Ciencias sociales",
    "Geografía",
    "Economía",
    "Medio ambiente",
    "Biografías",
    "Arte",
    "Historia del arte",
    "Filosofía",
    "Historia",
    "Ética y valores",
    "Literatura",
    "Lengua española",
    "Inglés",
    "Informática",
    "Psicología",
    "Educación física",
    "Tecnología",
    "Política",
    "Religión",
    "Salud",
    "Educación",
]

const niveles = [
    "Primaria", "Secundaria", "Terciaria", "Universitaria"
]

const grados = [
    "Primer grado", "Segundo grado", "Tercer grado", "Cuarto grado", "Quinto grado", "Sexto grado"
]


const AddClass = ( newClass ) => {
    return (
        <Container className='shadow p-3 mb-5 bg-white rounded flex'>
        <h1>Agrega tu propia Clase!</h1>
        <Formik
				validationSchema={validationSchemaStepOne}
				initialValues={{
                    nombre: "",
                    Profesor_mail: "",
                    descripcion: "",
                    materia: "",
                    grado: "",
                    nivel: ""
				}}
				onSubmit={(values) => {
                    console.log(values)
                    newClass(values)
				}}			
        >
          {({ handleSubmit, handleChange, values, errors }) => (
					<Form className='mt-5' onSubmit={handleSubmit}>
						<Form.Group>
							<Row className='mb-3'>
								<Col sm={12} md={8}>
									<Form.Label className='text-uppercase'>Nombre de la clase</Form.Label>
									<Field
										name='nombre'
										type='text'
										onChange={handleChange}
										value={values.nombre}
										className={`form-control ${
											errors.nombre ? 'is-invalid' : ''
										}`}
									/>
									{errors.nombre  ? (
										<div className='invalid-feedback'>{errors.nombre}</div>
									) : null}
								</Col>
								<Col sm={12} md={8}>
									<Form.Label className='text-uppercase'>Mail del Profesor</Form.Label>
									<Field
										name='Profesor_mail'
										type='text'
										onChange={handleChange}
										value={values.Profesor_mail}
										className={`form-control ${
											errors.Profesor_mail ? 'is-invalid' : ''
										}`}
									/>
									{errors.Profesor_mail ? (
										<div className='invalid-feedback'>{errors.Profesor_mail}</div>
									) : null}
								</Col>
							</Row>
							<Row>
								<Col sm={12} md={10}>
									<Form.Label className='text-uppercase'>Descripcion</Form.Label>
									<Field
                                        as='textarea'
                                        aria-label='With textarea'
										name='descripcion'
										type='textarea'
                                        rows='4'
										onChange={handleChange}
										value={values.descripcion}
										className={`form-control ${
											errors.descripcion  ? 'is-invalid' : ''
										}`}
									/>
									{errors.descripcion ? (
										<div className='invalid-feedback'>{errors.descripcion}</div>
									) : null}
								</Col>
								<Col sm={12} md={4} className='p-4 mt-3'>
									<Form.Label className='text-uppercase'>Materia</Form.Label>
									<Form.Control
										as='select'
										name='materia'
										onChange={handleChange}
										value={values.materia}
                                        className={`form-control ${
											errors.materia  ? 'is-invalid' : ''
										}`}
									>
										<option value='' >Seleccione una materia</option>                                     
										{ materias.map( (materia,i) => {
                                            return <option key={i+10} value={materia}>{materia}</option>
                                            }
                                        ) }
									</Form.Control>
                                    {errors.materia ? (
										<div className='invalid-feedback'>{errors.materia}</div>
									) : null}
								</Col>

								<Col sm={12} md={4} className='p-4 mt-3'>
								<Form.Label className='text-uppercase'>Grado</Form.Label>
									<Form.Control
										as='select'
										name='grado'
										onChange={handleChange}
										value={values.grado}      
                                        className={`form-control ${
											errors.grado  ? 'is-invalid' : ''
										}`}                                  
									>	
                                        <option  value='' >Seleccione un nivel</option>										                                     
										{ grados.map( (grado,i) => {
                                            return <option key={i+20} value={grado}>{grado}</option>
                                            }
                                        ) }
									</Form.Control>
                                    {errors.grado ? (
										<div className='invalid-feedback'>{errors.grado}</div>
									) : null}
								</Col>
                                <Col sm={12} md={4} className='p-4 mt-3'>
								<Form.Label className='text-uppercase'>Nivel</Form.Label>
									<Form.Control
										as='select'
										name='nivel'
										onChange={handleChange}
										value={values.nivel}
                                        className={`form-control ${
											errors.nivel  ? 'is-invalid' : ''
										}`}
									>
                                        <option  value='' >Seleccione un nivel</option>
                                        { niveles.map( (nivel,i) => {
                                            return <option key={i+30} value={nivel}>{nivel}</option>
                                            }
                                        ) }
									</Form.Control>
                                    {errors.nivel ? (
										<div className='invalid-feedback'>{errors.nivel}</div>
									) : null}
								</Col>
							</Row>
                            <Row>
								<Col className='d-flex justify-content-center'>
									<Button type='submit' className='text-uppercase'>
										Enviar
									</Button>
								</Col>
							</Row>
						</Form.Group>
					</Form>
				)}
			</Formik>
		</Container>
    )
}

const mapStateToProps = (state) => {
    return {
        class: state.class
    }
}

const mapDispachToProps = (dispatch) => {
    return {
        newClass: (data) => dispatch(newClass(data))
    }
}

export default connect(mapStateToProps, mapDispachToProps)(AddClass)
