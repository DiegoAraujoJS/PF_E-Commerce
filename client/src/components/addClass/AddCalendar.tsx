import { Formik, Field } from 'formik';
import { Form, Row, Col, Container, Button } from 'react-bootstrap';
import axios from 'axios'
import getCookieValue from '../../cookieParser';
import Swal from 'sweetalert2'
import { store } from '../../Store/store';
import CalendarApp from '../calendar/addClassCalendar/Calendar'
import { useState, useEffect } from 'react'
import {useHistory} from 'react-router-dom'

const AddCalendar = () => {
	const history = useHistory()
	const [calendarChoice, setCalendarChoice] = useState(false)
	let [user, setUser] = useState<{ name: string, lastName: string, role: number, mail: string } | undefined>({ name: '', lastName: '', role: null, mail: '' })

		useEffect(() => {
		async function fetchUser() {
			const token = getCookieValue('token').replaceAll("\"", '')
			const user = await axios.post('http://localhost:3001/api/verify', {}, { headers: { Authorization: token } })
			setUser(user.data)
		}
		fetchUser()
	}, [])
	/* if(values.dias==="Lunes")i=1
	if(values.dias==="Martes")i=2
	if(values.dias==="Miercoles")i=3
	if(values.dias==="Jueves")i=4
	if(values.dias==="Viernes")i=5
	if(values.dias==="Sabado")i=6
	if(values.dias==="Domingo")i=7
	console.log(fechaa.setDate(fechaa.getDate() + (i + 7 - fechaa.getDay()) % 7)) */
	return (
		<Container className='shadow p-3 mb-5 bg-white rounded flex'>
			<h1>Agrega tu propia Clase!</h1>
			<Formik

				
				initialValues={{
					
					week: 0,
					
				}}

				onSubmit={async (values, { resetForm }) => {
					console.log('entre')
					const token = getCookieValue('token').replaceAll("\"", '')

					const user = await axios.post('http://localhost:3001/api/verify', {}, { headers: { Authorization: token } })

					const redux_state = store.getState()['calendar_to_addClassStudent']
					console.log(redux_state)

										
						const publication = {
							Profesor_mail: user.data.mail,
							
						}
						let sunday = new Date()
						sunday.setDate(sunday.getDate() - sunday.getDay() % 7)
						// {clase: IClase, agenda: {week: Week[], sundayStartsOn: IDate, forHowLong: number}}
						const [sundayYear, sundayMonth, sundayDay] = [sunday.getFullYear(), sunday.getMonth() + 1, sunday.getDate()]
						const body = {
							User_mail: user.data.mail,
							agenda: {
								week: redux_state,
								sundayStartsOn: {
									year: Number(sundayYear),
									month: Number(sundayMonth),
									day: Number(sundayDay)
								},
								forHowLong: Number(values.week)
							}
						}
						console.log(body)
						let response = await axios.post('http://localhost:3001/api/calendario/calendarAdd', body, { headers: { Authorization: token } })

						console.log(response)

						if (response.status === 200) {
							Swal.fire(
								'Exito!',
								'Tu clase se creo correctamente!',
								'success'
							)
							history.push(`/historial`)	
						}
						else{
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
								
								
								{!calendarChoice ?
									<div>

										<Button type='button' className='text-uppercase' style={{ width: '500px' }} onClick={(e => setCalendarChoice(true))}>
											Elegir disponibilidad horaria
										</Button>
										{console.log(store.getState()['calendar_to_addClassStudent'])}
									</div> :
									<div>

										<div style={{ border: '1px solid red', height: '500px' }}>
											{console.log('le manda el store?', store.getState()['calendar_to_addClassStudent'])}
											<CalendarApp calendar_to_addClassStudent={store.getState()['calendar_to_addClassStudent']} email={user.mail}>{user.mail}</CalendarApp>
										</div>
										
									</div>
								}
							</Row>

							<Row>
								<Col sm={12} md={4}>
									<Form.Label className='text-uppercase'>Duración por semanas</Form.Label>
									<Field
										name='week'
										type='number'
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.week}
										min="0"
										
										className={`form-control ${errors.week && touched.week ? 'is-invalid' : ''
											}`}
									/>
									{errors.week && touched.week ? (
										<div className='invalid-feedback'>{errors.week}</div>
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


export default AddCalendar


// dia ==> lunes
// hora desde ==> 08
// hora hasta ==> 12
// durante ==> n semanas



