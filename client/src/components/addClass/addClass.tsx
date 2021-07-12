import React from 'react'
import { Formik , Field} from 'formik';
import { validationSchemaStepOne } from '../../utils/validations';
import { Form, Row, Col, Container, Button } from 'react-bootstrap';
import { newClass } from '../../Actions/Actions';
import { connect } from 'react-redux';



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
          {({ handleSubmit, handleChange, values, errors, touched }) => (
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
									>
										<option value=''>Seleccione una materia</option>
										<option value='Ingles'>Ingles</option>
									</Form.Control>
								</Col>

								<Col sm={12} md={4} className='p-4 mt-3'>
								<Form.Label className='text-uppercase'>Grado</Form.Label>
									<Form.Control
										as='select'
										name='grado'
										onChange={handleChange}
										value={values.grado}                                        
									>	
                                        <option  value=''>Seleccione un nivel</option>
										<option value='Primer Grado'>Primer Grado</option>

									</Form.Control>
								</Col>
                                <Col sm={12} md={4} className='p-4 mt-3'>
								<Form.Label className='text-uppercase'>Nivel</Form.Label>
									<Form.Control
										as='select'
										name='nivel'
										onChange={handleChange}
										value={values.nivel}
									>
                                        <option  value=''>Seleccione un nivel</option>
										<option value='Secundario'>Secundario</option>
									</Form.Control>
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
    console.log(state)
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
