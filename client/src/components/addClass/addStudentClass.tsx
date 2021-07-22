import { Formik, Field } from 'formik';
import { validationSchemaNewClass } from '../../utils/validations';
import { Form, Row, Col, Container, Button } from 'react-bootstrap';
import axios from 'axios'
// import MarketFlow from '../../../../api/src/MarketFlow'
import { IClase } from '../../../../interfaces';
import getCookieValue from '../../cookieParser';
import Swal from 'sweetalert2'
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';
import { useState } from 'react';
import CalendarApp from "../calendar/addClassCalendar/Calendar"
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
	"Primario", "Secundario", "Terciario", "Universitario"
]

const grados = [
	"Primer grado", "Segundo grado", "Tercer grado", "Cuarto grado", "Quinto grado", "Sexto grado"
]



enum Week { Lunes, Martes, Miercoles, Jueves, Viernes, Sabado, Domingo }

const StudentAddClass = () => {
	const [min, setMinValue] = useState(0);
	const [max, setMaxValue] = useState(0);

	return (
		<Container className='shadow p-3 mb-5 bg-white rounded flex'>
			<h1>Agrega tu propia Clase!</h1>
			<Formik

				validationSchema={validationSchemaNewClass}
				initialValues={{
					nombre: "",

					descripcion: "",
					materia: "",
					grado: "",
					nivel: "",
					precio: "",

					dia: Week.Miercoles,
					desde: "",
					hasta: "",

				}}

				onSubmit={async (values, { resetForm }) => {
					console.log('entre')
					const token = getCookieValue('token').replaceAll("\"", '')

					const user = await axios.post('http://localhost:3001/api/verify', {}, { headers: { Authorization: token } })
					try {
						const actual = new Date()
						actual.setDate(actual.getDate() + (values.dia + 7 - actual.getDay()) % 7)
						const dia = actual.getDate() // por ejemplo, es 19 si hoy es jueves 15 y values.dia es 'lunes'
						console.log([values.desde, values.hasta])
						let desde: `${number}:${number}:00` | any = values.desde + ':00'
						let hasta: `${number}:${number}:00` | any = values.hasta + ':00'

						for (let i = 0; i < 1; i++) {
							const publication: IClase = {
								User_mail: user.data.mail,
								descripcion: values.descripcion,
								ciudad: '',
								materia: values.materia,
								grado: values.grado,
								date: { day: actual.getDate(), month: actual.getMonth() + 1, year: actual.getFullYear(), time: [desde, hasta] },
								nivel: values.nivel,
								nombre: values.nombre,
								precio: values.precio
							}
							let response = await axios.post('http://localhost:3001/api/studentClass/add', publication)
							actual.setDate(actual.getDate() + 7)
							console.log(response)

							if (response.status === 200) {
								Swal.fire(
									'Exito!',
									'Tu clase se creo correctamente!',
									'success'
								)
							}
						}
					}
					catch (err) {
						Swal.fire(
							'Error!',
							'El mail no es de un profesor registrado!',
							'error'
						)
					}
				}}
			>
				{({ handleSubmit, handleChange, values, errors, handleBlur, touched }) => (
					<Form className='mt-5' onSubmit={handleSubmit}>
						<Form.Group>
							<Row className='mb-3'>
								<Col sm={12} md={8}>
									<Form.Label className='text-uppercase'>Nombre de la clase</Form.Label>
									<Field
										name='nombre'
										type='text'
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
								<Row>
									<Form.Label className='text-uppercase'>Medio de la clase</Form.Label>
									<Col sm={6} md={6}>

										<Form.Label className='text-uppercase'>Virtual</Form.Label>
										<Form.Check
											name='medio'
											type='radio'
											value="Virtual"
											onChange={handleChange}
											onBlur={handleBlur}
										/>
									</Col>
									<Col sm={6} md={6}>
										<Form.Label className='text-uppercase'>Presencial</Form.Label>
										<Form.Check
											name='medio'
											type='radio'
											value="Presencial"
											onChange={handleChange}
											onBlur={handleBlur}
										/>


									</Col>
								</Row>
							</Row>
							<Row>
								<div style={{border:'1px solid red', width: '800px', height: '500px'}}>
										<CalendarApp>{'diegoaraujo@gmail.com'}</CalendarApp>
									
								</div>
							</Row>
							<Row>
								<Col sm={6} md={6}>
									<Form.Label className='text-uppercase'>Descripcion</Form.Label>
									<Field
										as='textarea'
										aria-label='With textarea'
										name='descripcion'
										type='textarea'
										rows='4'
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.descripcion}
										className={`form-control ${errors.descripcion ? 'is-invalid' : ''
											}`}
									/>
									{errors.descripcion ? (
										<div className='invalid-feedback'>{errors.descripcion}</div>
									) : null}
								</Col>
								<Col sm={6} md={6} className='p-4 mt-3'>
									<Form.Label className='text-uppercase'>Materia</Form.Label>
									<Form.Control
										as='select'
										name='materia'
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.materia}
										className={`form-control ${errors.materia && touched.materia ? 'is-invalid' : ''
											}`}
									>
										<option value='' >Seleccione una materia</option>
										{materias.map((materia, i) => {
											return <option key={i + 10} value={materia}>{materia}</option>
										}
										)}
									</Form.Control>
									{errors.materia && touched.materia ? (
										<div className='invalid-feedback'>{errors.materia}</div>
									) : null}
								</Col>

								<Col sm={12} md={4} className='p-4 mt-3'>
									<Form.Label className='text-uppercase'>Grado</Form.Label>
									<Form.Control
										as='select'
										name='grado'
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.grado}
										className={`form-control ${errors.grado && touched.grado ? 'is-invalid' : ''
											}`}
									>
										<option value='' >Seleccione un grado</option>
										{grados.map((grado, i) => {
											return <option key={i + 20} value={grado}>{grado}</option>
										}
										)}
									</Form.Control>
									{errors.grado && touched.grado ? (
										<div className='invalid-feedback'>{errors.grado}</div>
									) : null}
								</Col>
								<Col sm={12} md={4} className='p-4 mt-3'>
									<Form.Label className='text-uppercase'>Nivel</Form.Label>
									<Form.Control
										as='select'
										name='nivel'
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.nivel}
										className={`form-control ${errors.nivel && touched.nivel ? 'is-invalid' : ''
											}`}
									>
										<option value='' >Seleccione un nivel</option>
										{niveles.map((nivel, i) => {
											return <option key={i + 30} value={nivel}>{nivel}</option>
										}
										)}
									</Form.Control>
									{errors.nivel && touched.nivel ? (
										<div className='invalid-feedback'>{errors.nivel}</div>
									) : null}
								</Col>
							</Row>
							<Row>
								<Col sm={12} md={4}>
									<Form.Label className='text-uppercase'>Precio</Form.Label>
									<div style={{ display: 'flex', position: 'relative', height: 'fit-content', alignContent: 'space-between', width: '560px', alignItems: 'center' }}>

										<div style={{ width: '325px' }}>
											<Form.Label className='text-uppercase'>MIN</Form.Label>
											<RangeSlider
												value={min}
												onChange={changeEvent => setMinValue(changeEvent.target.value)}
												step={0.5}
												max={50}
												onBlur={handleBlur}
												className={`form-control ${(Number(min) > Number(max)) ? 'is-invalid' : ''}`}
											/>
											<Form.Label className='text-uppercase'>MAX</Form.Label>
											<RangeSlider
												value={max}
												onChange={changeEvent => setMaxValue(changeEvent.target.value)}
												step={0.5}
												max={50}
												onBlur={handleBlur}
												className={`form-control ${(Number(min) > Number(max)) ? 'is-invalid' : ''}`}
											/>
										</div>
										<div style={{ fontSize: '35px', fontWeight: 'bold', width: '200px', height: 'fit-content', position: 'relative', paddingLeft: '30px' }}>
											{`$${min}-$${max}`}
										</div>
									</div>
									{(Number(min) > Number(max)) ? (
										<div className='invalid-feedback d-flex'>Coloca el rango correctamente</div>
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
				)
				}
			</Formik >
		</Container >
	)
}


export default StudentAddClass


// dia ==> lunes
// hora desde ==> 08
// hora hasta ==> 12
// durante ==> n semanas



