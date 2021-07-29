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
import { useState, useEffect, useRef } from "react"
import { Formik } from "formik"
import { connect } from "react-redux"
import { set_calendar_data } from "../../Actions/Actions"
import { useDispatch } from "react-redux"
import { actionsType } from "../../constants/constants"
import rangeToHours from "./rangeToHours"

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
    
    
    const [hours, setHours] = useState(1)
    const [selectedDay, setDay] = useState<[string, number]>(['', -1])
    const [from, setFrom] = useState<[string, number]>(['0', -1])
    const [days, setDays] = useState([])
    const [isAnotherDay, setIsAnotherDay] = useState(false)
    let selected = ''
    
    function redirect_blank(url) {
        var a = document.createElement('a');
        a.target="_blank";
        a.href=url;
        a.click();
      }
      let thisOption = useRef()

    useEffect(() => {
        async function fetchDays() {
            console.log('profesor', props.profesor)
            const fetchCalendar = props.profesor ? await axios.get(`http://localhost:3001/api/calendario/${props.profesor.User_mail}`) : {data:[]}
            
            const today = new Date()

            const profDays = fetchCalendar.data.map((date: Disponible) => {
                console.log("DIAS", date)
                today.setDate(date.fecha.dia); 
                today.setMonth(date.fecha.mes - 1);
                today.setFullYear(date.fecha.anio)

                const oneDate = {
                    
                    available: date.disponible.map(rangeToHours).flat(),
                    day: week[today.getDay()],
                    number: today.getDate(),
                    month: year[today.getMonth()],
                    year: today.getFullYear()

                }
                
                return oneDate
            })
            
            
            setDays(profDays)
            console.log('profDays', profDays)
    
        }

        if (!days.length)fetchDays()
        
    }, [props.profesor])

    

    

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

                        {props.profesor ? <CalendarApp renderiza={true} email={props.profesor.User_mail}> {props.profesor.User_mail} </CalendarApp>:null}     </div>
                        
                        <Card.Title>Selecciona el horario de tu clase</Card.Title>
                        
                                    <div style={{display:'flex'}}>

                                    <Form.Label className='text-uppercase'>Día</Form.Label>

                                        <Form.Control
                                            as='select'
                                            
                                            onChange={e => {console.log([e.target.value.slice(0, e.target.value.length - 1), Number(e.target.value[e.target.value.length-1])]); setDay([e.target.value.slice(0, e.target.value.length - 1), Number(e.target.value[e.target.value.length-1])])}}

                                            // onBlur={handleBlur}
                                            
                                            className={`form-control`}
                                            
                                        >
                                            <option value='' >Seleccioná un día para tu clase</option>
                                            {days.map((fullDate, i) => {
                                                

                                                return <option  key={i+10} value={`${fullDate.day} ${fullDate.number} de ${fullDate.month} del ${fullDate.year}${i}`}>{`${fullDate.day} ${fullDate.number} de ${fullDate.month} del ${fullDate.year}`}</option>
                                            }
                                            )}
                                        </Form.Control>
                                        
								
                                        <Form.Control
                                        as='select'
										className={`form-control`}
										
										
                                        onChange={e => setFrom([e.target.value.slice(0, e.target.value.length - 1), Number(e.target.value[e.target.value.length - 1])])}
									>
                                        {console.log('selectedday', selectedDay)}
                                        { selectedDay[0] ? days[selectedDay[1]].available.map((d, i) => <option value={`${d}${i}`}>{d}</option>) : null}
                                        {console.log(from)}
                                        </Form.Control>
                                        
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
                <Card.Title className="d-flex justify-content-center"> Precio de la clase: &nbsp;<span className="text-success ml-3">{`$${hours * props.precio}}`}</span> </Card.Title>
                
                <Modal.Footer className="justify-content-center">

                        <Button variant="primary" onClick={async () => {

                            const thisDate = days[selectedDay[1]]
                            
                            
                            const time = from[0].split(':')
                            
                            const fromPlusHours = Number(time[0][0]) * 10 + Number(time[0][1]) + Number(hours)
                            console.log(from, fromPlusHours)
                            const stringified = `${fromPlusHours}`.length===2 ? `${fromPlusHours}:${time[1][0]}0:00` : `0${fromPlusHours}:${time[1][0]}0:00`
                            
                            if (fromPlusHours > 24) return setIsAnotherDay(true);
                            
                            
                            const payload: IClase = {
                                ...props,
                                date: {year: thisDate.year, month: thisDate.month, day: thisDate.number, time: [`${from[0]}:00`, stringified]},
                                precio: `${hours * props.precio}`
                            }
                            console.log('payload', payload)
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
                        {isAnotherDay ? <span style={{color:'red'}}>No puedes pasarte del día seleccionado!</span> : null}
           
                </Modal.Footer>
            </Modal>
)
}



export default ClassDetail