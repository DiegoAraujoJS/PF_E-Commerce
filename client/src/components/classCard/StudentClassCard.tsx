import CSS from 'csstype';
import { Class } from '../../../../interfaces';
import { Button, Card, Col, ListGroup, Modal, Row, } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt, faClock, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faMapMarkerAlt,} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios'
import getCookieValue from "../../cookieParser";
import { string } from 'yup/lib/locale';
import Swal from 'sweetalert2';
import s from './ClassCard.module.css'

const mark = <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: "#ff3f3f" }} />
const clock = <FontAwesomeIcon icon={faClock} className="mt-1" style={{ color: "#0067ff" }} />
const calendar = <FontAwesomeIcon icon={faCalendarAlt} className="mt-1" style={{ color: "#0067ff" }} />
const email = <FontAwesomeIcon icon={faEnvelope} className="mt-1" style={{ color: "#0067ff" }} />

const StudentClassCard: React.FC<Class> = (props) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function redirect_blank(url) {
        var a = document.createElement('a');
        a.target="_blank";
        a.href=url;
        a.click();
      }

    return (
        <div>
            <Row className='d-flex justify-content-center'>
                <Col sm={11} md={11}>
                <ListGroup className={"mb-3 "+ s.contenedor}>
                        <ListGroup.Item className="p-0 shadow " style={{ borderRadius: '40px' }} action onClick={handleShow}>
                            <Card className="shadow p-0" style={{ borderRadius: '30px' }} >
                                <Card.Header
                                    style={{ fontSize: "20px", borderTopRightRadius: "30px", borderTopLeftRadius: "30px" }}
                                    className='d-flex justify-content-center font-weight-bold '>{props.nombre}</Card.Header>
                                <Card.Body style={{ backgroundColor: '#c8c8c8', borderBottomRightRadius: "30px", borderBottomLeftRadius: "30px" }} className="d-lg-flex d-md-flex flex-row align-items-center card-body">
                                    <Col sm={12} md={4} lg={8} className="d-flex flex-column align-items-start ml-2 ">
                                        
                                        <Card.Text className="m-0"> <strong> Tipo: </strong>{props && props.esPresencial} </Card.Text>
                                        <Card.Text className="m-0"> {mark} &nbsp; {props.profesor && props.profesor.city} </Card.Text>
                                        <Card.Text className="m-0"> <strong> Materia: </strong> {props && props.materia} </Card.Text>
                                        <Card.Text className="fst-italic">
                                            {props && props.descripcion}
                                        </Card.Text>
                                    </Col>
                                </Card.Body>
                            </Card>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
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
                                <Card.Text className="d-flex ">{calendar}&nbsp;<strong>Fecha:&nbsp;</strong> {props.date.day + "/"}{props.date.month + "/2021"} </Card.Text>
                                <Card.Text className="d-flex  mb-3">{clock}&nbsp;<strong>Horario de inicio:&nbsp;</strong> {props.date?.time[0].substring(0, 5)} {(props.date?.time[0].substring(0, 2) > "12") ? "P.M" : "A.M"}</Card.Text>
                                <Card.Text className="d-flex  mb-3">{clock}&nbsp;<strong>Horario de finalización:&nbsp;</strong> {props.date?.time[1].substring(0, 5)} {(props.date?.time[1].substring(0, 2) > "12") ? "P.M" : "A.M"}</Card.Text>
                            </Col>
                        </Row>
                    </Card>
                    <hr className="m-0"></hr>
                    <Card border="light">
                        <Card.Header className='d-flex justify-content-center '>
                            <Card.Title >Pofesor:</Card.Title>
                        </Card.Header>
                        <Card.Title className='d-flex flex-column align-items-center mt-3'>  {props.profesor && props.profesor.name + " "}{props.profesor && props.profesor.lastName}</Card.Title>
                        <Card.Body className='d-flex flex-column pt-0 align-items-center '>                            
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
        </div >
    )
}


export default StudentClassCard