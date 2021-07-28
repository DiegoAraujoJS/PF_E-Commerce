import { Modal, Card, Row, Col, Container } from "react-bootstrap"
import { Button, Form} from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Swal from "sweetalert2"
import axios from 'axios'
import getCookieValue from '../../cookieParser'
import { Link } from 'react-router-dom';
import { faCalendarAlt, faClock, faEnvelope, faStar } from '@fortawesome/free-regular-svg-icons';
import { Disponible, IClase } from '../../../../interfaces';
import CalendarApp from "../calendar/addClassCalendar/Calendar"
import RangeSlider from 'react-bootstrap-range-slider';
import { useState, useEffect } from "react"
import { Formik } from "formik"
import { connect } from "react-redux"
import { set_calendar_data } from "../../Actions/Actions"
import { useDispatch } from "react-redux"
import { actionsType } from "../../constants/constants"
import DetalleCompra from "./DetalleCompra"
const calendar = <FontAwesomeIcon icon={faCalendarAlt} className="mt-1" style={{ color: "#0067ff" }} />
const clock = <FontAwesomeIcon icon={faClock} className="mt-1" style={{ color: "#0067ff" }} />
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
const week = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado' ]
const year = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
function ClassDetail (props) {

    const {show, handleClose, email, mark, puntuacion } = props.hijo
    
    
    let [hours, setHours] = useState(1)
    let [day, setDay] = useState('')
    let [from, setFrom] = useState('0')
    let [days, setDays] = useState([])
    const dispatch = useDispatch();
    
    function redirect_blank(url) {
        var a = document.createElement('a');
        a.target="_blank";
        a.href=url;
        a.click();
      }

    useEffect(() => {
        async function fetchDays() {
            console.log('profesor', props.profesor)
            const fetchCalendar = await axios.get(`http://localhost:3001/api/calendario/${props.profesor.User_mail}`)
            
            const today = new Date()

            const profDays = fetchCalendar.data.map((date: Disponible) => {
                today.setDate(date.fecha.dia); 
                const oneDate = {
                    disponible: date,
                    day: week[today.getDay()],
                    number: today.getDate(),
                    month: year[today.getMonth()],
                    year: today.getFullYear()

                }
                return oneDate
            })
            
            props.dispatchData(profDays)
            setDays(profDays)
    
        }
        fetchDays()
        
    }, [])

    

    

return (

<Modal
                show={show}
                onHide={handleClose}
                size='lg'
                keyboard={false}
                dialogClassName="modal-80w"
                centered
            >
                <Modal.Header>
                    <Modal.Title className="ml-4">{props.nombre}</Modal.Title>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Header>
                <Modal.Body className="p-0">
                    <Card border="light" className="d-flex justify-content-center p-0 ">
                        <Row className='d-flex justify-content-center '>
                            <Card.Header className='d-flex justify-content-center '>
                                <Card.Title >Clase:</Card.Title>
                            </Card.Header>
                            <Col sm={12} md={8} lg={8} className="">
                                <Card.Title className="d-flex justify-content-center mt-3 mb-0"><span className="m-0">{puntuacion(props.puntuacion)}</span></Card.Title>
                                <Card.Text className="">
                                    Clase de  &nbsp;<strong>{props && props.materia}</strong>&nbsp; para &nbsp;<strong>{props && props.grado}</strong>&nbsp; de nivel &nbsp;<strong>{props && props.nivel}</strong>
                                </Card.Text>
                                <Card.Text className="d-flex "><strong>Tipo:&nbsp;</strong> {props && props.esPresencial}   </Card.Text>
                                <Card.Text className="d-flex "><strong>Descripción:&nbsp;</strong> {props.descripcion}</Card.Text>


                                {/* <Card.Text className="d-flex ">{calendar}&nbsp;<strong>Fecha:&nbsp;</strong> {props.date?.day + "/"}{props.date?.month + "/2021"} </Card.Text>
                                <Card.Text className="d-flex  mb-3">{clock}&nbsp;<strong>Horario de inicio:&nbsp;</strong> {props.date?.time[0].substring(0, 5)} {(props.date?.time[0].substring(0, 2) > "12") ? "P.M" : "A.M"}</Card.Text>
                                <Card.Text className="d-flex  mb-3">{clock}&nbsp;<strong>Horario de finalización:&nbsp;</strong> {props.date?.time[1].substring(0, 5)} {(props.date?.time[1].substring(0, 2) > "12") ? "P.M" : "A.M"}</Card.Text> */}
                            </Col>
                        </Row>
                    </Card>
                    <hr className="m-0"></hr>
                    <Card border="light">
                    <Card.Header className='d-flex justify-content-center '>
                        {/* AQUÍ SE MONTARÁ EL CALENDARIO */}
                            <Card.Title >Horario:</Card.Title>

                        </Card.Header>
                        <div style={{height:'400px'}}>

                           {props.profesor ? <CalendarApp email={props.profesor.User_mail}> {props.profesor.User_mail} </CalendarApp>:null}
                        </div>
                        
                        <Card.Title>Selecciona el horario de tu clase</Card.Title>
                        
                                    <div style={{display:'flex'}}>

                                    <Form.Label className='text-uppercase'>Día</Form.Label>

                                        <Form.Control
                                            as='select'
                                            
                                            onChange={e => {console.log(e.target.value);setDay(e.target.value)}}

                                            // onBlur={handleBlur}
                                            
                                            className={`form-control`}
                                            
                                        >
                                            {/* <option value='' >Seleccioná un día para tu clase</option>
                                            {days.map((fullDate, i) => {
                                                return <option key={i + 10} value={`${fullDate.day} ${fullDate.number} de ${fullDate.month} del ${fullDate.year}`}>{`${fullDate.day} ${fullDate.number} de ${fullDate.month} del ${fullDate.year}`}</option>
                                            }
                                            )} */}
                                            <DetalleCompra profesor={props.profesor.User_mail}/>
                                        </Form.Control>
                                        
								
                                        <Form.Control
										name='hasta'
										type='time'
										value={from}
                                        onChange={e => setFrom(e.target.value)}
										
									/>
                                        
                                <Form.Label>Horas:</Form.Label>
                                    <RangeSlider
                                        
                                        value={hours}
                                        onChange={(e)=>{setHours(e.target.value)}}
                                        step={1}
                                        max={8}
                                    />
                                        
                                    
                                    </div>
                                    
									
						
                        
                        <Card.Header className='d-flex justify-content-center '>
                            <Card.Title >Profesor:</Card.Title>
                        </Card.Header>
                        <Card.Title className='d-flex flex-column align-items-center mt-3'>  {props.profesor && props.profesor.name + " "}{props.profesor && props.profesor.lastName}</Card.Title>
                        <Card.Body className='d-flex flex-column pt-0 align-items-center '>
                            <Card.Text className="mt-2 mb-0"> <span className="m-0"> {puntuacion(props.profesor && props.profesor.score)} </span> </Card.Text>
                            <Card.Img style={{ width: "200px", height: "200px", borderRadius: "50px" }} src={props.profesor && props.profesor.foto} />
                            <Card.Title className="mt-3">{email} Mail: {props.profesor && props.profesor.User_mail}</Card.Title>
                            <Card.Text>{mark} <strong> Ciudad:</strong> {props.profesor && props.profesor.city} </Card.Text>
                            <Card.Text> ¿Quieres saber mas sobre el profesor?<br></br>
                                Visita su perfil: <Link target="_blank" to={`./perfil/${props.profesor && props.profesor.User_mail}`} >
                                    <Button variant="info" >
                                        Ir al perfil
                                    </Button></Link>
                            </Card.Text>
                            
                        </Card.Body>
                    </Card>
                </Modal.Body>
                <Card.Title className="d-flex justify-content-center"> Precio de la clase: &nbsp;<span className="text-success ml-3">{`$${Number(props.precio) * hours}`}</span> </Card.Title>
                
                <Modal.Footer className="justify-content-center">

                        <Button variant="primary" onClick={async () => {
//  id?: number;
//  nombre: string;
//  grado: string;
//  nivel: string;
//  materia: string;
//  descripcion: string;
//  status?: 'pending' | 'complete' | 'cancelled'
//  date?: {year: number, month: number, day: number, time: Time}
//  profesor?: IProfesor
//  student?: IUser;
//  precio: number|string;
//  Profesor_mail?: string;
//  User_mail?: string;
//  esPresencial: string;
                            const thisDate = day.split(' ')
                            
                            
                            const fromPlusHours = Number(from[0]) * 10 + Number(from[1]) + Number(hours)
                            const stringified = `${fromPlusHours}`.length < 2 ? `0${fromPlusHours}`+':'+from[3] + from[4] : `${fromPlusHours}`+':' +from[3] + from[4]
                            
                            const payload: IClase = {
                                ...props,
                                date: {year: Number(thisDate[thisDate.length - 1]), month: year.indexOf(thisDate[3]), day: Number(thisDate[1]), time: [`${from}`, stringified]},
                                precio: `${hours * props.precio}`
                            }
                            
                            try{
                            const token = getCookieValue('token').replaceAll("\"", '')
                            const getUser = await axios.post(`http://localhost:3001/api/verify`, {}, { headers: { Authorization: token } })

                            if (getUser.status) {
                                const addToCart = await axios.post(`http://localhost:3001/api/carrito/${getUser.data.mail}`, payload)
                                if(addToCart.status === 200) redirect_blank("./cesta")
                                }
                            }
                            catch(error) {
                                console.log(error)
                                Swal.fire(
                                    'Error!',
                                    'Debe iniciar seción para agregar una clase!',
                                    'error'
                                    )
                            }
                        }}>
                           Agregar clase a mi lista
                        </Button>
           
                </Modal.Footer>
            </Modal>
)
}

const mapStateToProps = (state) => {
    return {
        set_fetch_calendar: state.set_fetch_calendar,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchData: function (payload) {
            dispatch({ type: actionsType.SET_FETCH_CALENDAR, payload })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassDetail)