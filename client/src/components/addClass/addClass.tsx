import { Formik, Field } from 'formik';
import { validationSchemaNewClass } from '../../utils/validations';
import { Form, Row, Col, Container, Button } from 'react-bootstrap';
import axios from 'axios'

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


const AddClass = () => {

	return (
		<Container className='shadow p-3 mb-5 bg-white rounded flex'>
			<h1>Agrega tu propia Clase!</h1>
			<Formik
				validationSchema={validationSchemaNewClass}
				initialValues={{
					nombre: "",
					Profesor_mail: "",
					descripcion: "",
					materia: "",
					grado: "",
					nivel: "",
					hasta:"",
				}}

				onSubmit={async (values, { resetForm }) => {
					try {
						const clase = await axios.post("http://localhost:3001/api/clases/add", values)
						if (clase) {
							alert("La clase se creo exitosamente")
						}
						else {
							alert("Email no esta registrado o no es profesor")
						}
					}
					catch (err) {
						alert("Email no esta registrado o no es profesor")
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
								<Col sm={12} md={8}>
									<Form.Label className='text-uppercase'>Mail del Profesor</Form.Label>
									<Field
										name='Profesor_mail'
										type='text'
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.Profesor_mail}
										className={`form-control ${errors.Profesor_mail && touched.Profesor_mail ? 'is-invalid' : ''
											}`}
									/>
									{errors.Profesor_mail && touched.Profesor_mail ? (
										<div className='invalid-feedback'>{errors.Profesor_mail}</div>
									) : null}
								</Col>
								<Col sm={12} md={8}>
									<Form.Label className='text-uppercase'>hasta:</Form.Label>
									<Field
										name='hasta'
										type='time'
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.hasta}
										className={`form-control ${errors.hasta && touched.hasta ? 'is-invalid' : ''
											}`}
									/>
									{errors.hasta && touched.hasta ? (
										<div className='invalid-feedback'>{errors.hasta}</div>
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
										onBlur={handleBlur}
										value={values.descripcion}
										className={`form-control ${errors.descripcion ? 'is-invalid' : ''
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
										<option value='' >Seleccione un nivel</option>
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


export default AddClass
