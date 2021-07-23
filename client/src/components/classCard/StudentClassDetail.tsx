import { Modal, Card, Row, Col,  } from "react-bootstrap"
import { Button } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Swal from "sweetalert2"
import axios from 'axios'
import getCookieValue from '../../cookieParser'
import { Link } from 'react-router-dom';
import { faCalendarAlt, faClock, faEnvelope, faStar } from '@fortawesome/free-regular-svg-icons';
import { Class } from '../../../../interfaces';
import CalendarApp from "../calendar/addClassCalendar/Calendar"
const calendar = <FontAwesomeIcon icon={faCalendarAlt} className="mt-1" style={{ color: "#0067ff" }} />
const clock = <FontAwesomeIcon icon={faClock} className="mt-1" style={{ color: "#0067ff" }} />

function StudentClassDetail(props) {
    console.log(props)
    function redirect_blank(url) {
        var a = document.createElement('a');
        a.target="_blank";
        a.href=url;
        a.click();
      }
    const {show, handleClose, email, mark, puntuacion } = props.hijo
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
                                <Card.Text className="">
                                    Clase de  &nbsp;<strong>{props && props.materia}</strong>&nbsp; para &nbsp;<strong>{props && props.grado}</strong>&nbsp; de nivel &nbsp;<strong>{props && props.nivel}</strong>
                                </Card.Text>
                                <Card.Text className="d-flex "><strong>Tipo:&nbsp;</strong> {props && props.esPresencial}   </Card.Text>
                                <Card.Text className="d-flex "><strong>Descripción:&nbsp;</strong> {props.descripcion}</Card.Text>
                                
                            </Col>
                        </Row>
                    </Card>
                    <hr className="m-0"></hr>
                    <Card border="light">
                        <Card.Header className='d-flex justify-content-center '>
                            <Card.Title >Horario:</Card.Title>

                        </Card.Header>
                        <div style={{height:'400px'}}>

                            <CalendarApp > {'diegoaraujo@gmail.com'} </CalendarApp>
                        </div>
                        <Card.Header className='d-flex justify-content-center '>
                            <Card.Title >Alumno:</Card.Title>

                        </Card.Header>
                        <Card.Body className='d-flex flex-column pt-0 align-items-center '>                            
                            <Card.Title className="mt-3">{email} Mail: {props.student && props.student.mail}</Card.Title>
                            <Card.Text>{mark} <strong> Ciudad:</strong> {props.student && props.student.city} </Card.Text>
                            
                        </Card.Body>
                    </Card>
                </Modal.Body>
                <Card.Title className="d-flex justify-content-center"> Precio de la clase: &nbsp;<span className="text-success ml-3">{props.precio}</span> </Card.Title>
                <Modal.Footer className="justify-content-center">

                        <Button variant="primary" onClick={async () => {

                            const payload: Class = {
                                ...props
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

export default StudentClassDetail