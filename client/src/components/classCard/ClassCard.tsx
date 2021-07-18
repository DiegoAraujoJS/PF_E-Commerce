import CSS from 'csstype';
import { Class } from '../../interfaces';
import { Button, Card, Col, ListGroup, Modal, Row, } from 'react-bootstrap'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt, faClock, faEnvelope, faStar } from '@fortawesome/free-regular-svg-icons';
import { faMapMarkerAlt, faStar as starComplete, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const starEmpty = <FontAwesomeIcon icon={faStar} style={{ color: "#ffe516" }} />
const starCompleta = <FontAwesomeIcon icon={starComplete} style={{ color: "#ffe516" }} />
const starHalf = <FontAwesomeIcon icon={faStarHalfAlt} style={{ color: "#ffe516" }} />
const mark = <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: "#ff3f3f" }} />
const clock = <FontAwesomeIcon icon={faClock} className="mt-1" style={{ color: "#0067ff" }} />
const calendar = <FontAwesomeIcon icon={faCalendarAlt} className="mt-1" style={{ color: "#0067ff" }} />
const email = <FontAwesomeIcon icon={faEnvelope} className="mt-1" style={{ color: "#0067ff" }} />

const ClassCard: React.FC<Class> = (props) => {
    const profileImg: CSS.Properties = {
        height: '160px',
        width: '160px',
        borderRadius: '50%',
    };
    const descLimit: CSS.Properties = {
    };
    const cityPos: CSS.Properties = {
        height: 'fit-content',
        width: 'fit-content',
    };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    
    console.log(props)
    return (
        <div>
            <Row className='d-flex justify-content-center'>
                <Col sm={11} md={11}>
                    <ListGroup className="mb-3">
                        <ListGroup.Item className="p-0 shadow " style={{ borderRadius: '40px' }} action onClick={handleShow}>
                            <Card className="shadow p-0" style={{ borderRadius: '30px' }} >
                                <Card.Header
                                    style={{ fontSize: "20px", borderTopRightRadius: "30px", borderTopLeftRadius: "30px" }}
                                    className='d-flex justify-content-center font-weight-bold '>{props.nombre}</Card.Header>
                                <Card.Body  style={{ backgroundColor: '#c8c8c8', borderBottomRightRadius: "30px", borderBottomLeftRadius: "30px" }} className="d-lg-flex d-md-flex flex-row align-items-center card-body">
                                    <Col sm={12} md={8} lg={4} className="d-flex justify-content-center">
                                        <Card.Img style={profileImg} src={props.profesor && props.profesor.foto} />
                                    </Col>
                                    <Col sm={12} md={4} lg={8} className="d-flex flex-column align-items-start ml-2 ">
                                        <Card.Title className="d-sm-flex justify-content-center m-0">{puntuacion(props.puntuacion)}</Card.Title>
                                        <Card.Text className="m-0"> <strong> Tipo: </strong>{props && props.esPresencial} </Card.Text>
                                        <Card.Text className="m-0"> {mark} &nbsp; {props.profesor && props.profesor.city} </Card.Text>
                                        <Card.Text className="m-0"> <strong> Materia: </strong> {props && props.materia} </Card.Text>
                                        <Card.Text style={descLimit} className="fst-italic">
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
                                <Card.Title className="d-flex justify-content-center mt-3 mb-0"><span className="m-0">{puntuacion(props.puntuacion)}</span></Card.Title>
                                <Card.Text className="">
                                    Clase de  &nbsp;<strong>{props && props.materia}</strong>&nbsp; para &nbsp;<strong>{props && props.grado}</strong>&nbsp; de nivel &nbsp;<strong>{props && props.nivel}</strong>
                                </Card.Text>
                                <Card.Text className="d-flex "><strong>Tipo:&nbsp;</strong> {props && props.esPresencial}   </Card.Text>
                                <Card.Text className="d-flex "><strong>Descripción:&nbsp;</strong> {props.descripcion}</Card.Text>
                                <Card.Text className="d-flex ">{calendar}&nbsp;<strong>Fecha:&nbsp;</strong> {props.date.day + "/"}{props.date.month + "/2021"} </Card.Text>
                                <Card.Text className="d-flex  mb-3">{clock}&nbsp;<strong>Horario de inicio:&nbsp;</strong> {props.date.time[0].substring(0, 5)} {(props.date.time[0].substring(0, 2) > "12") ? "P.M" : "A.M"}</Card.Text>
                                <Card.Text className="d-flex  mb-3">{clock}&nbsp;<strong>Horario de finalización:&nbsp;</strong> {props.date.time[1].substring(0, 5)} {(props.date.time[1].substring(0, 2) > "12") ? "P.M" : "A.M"}</Card.Text>
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
                <Card.Title className="d-flex justify-content-center"> Precio de la clase: &nbsp;<span className="text-success ml-3">$2000</span> </Card.Title>
                <Modal.Footer className="justify-content-center">
                    <Link target="_blank" to="./cesta">
                        <Button variant="primary" >
                            Comprar Clase
                        </Button>
                    </Link>
                </Modal.Footer>
            </Modal>
        </div >
    )
}



const puntuacion = (num) => {
    return (<>{
        //     num === 5 ? <div><span className="fas fa-star">🌟</span> <span className="fas fa-star">🌟</span> <span className="fas fa-star">🌟</span> <span className="fas fa-star">🌟</span> <span className="fas fa-star">🌟</span></div>
        //         : num === 4 ? <div> <span className="fas fa-star">🌟</span> <span className="fas fa-star">🌟</span> <span className="fas fa-star">🌟</span> <span className="fas fa-star">🌟</span> </div>
        //             : num === 3 ? <div> <span className="fas fa-star">🌟</span> <span className="fas fa-star">🌟</span> <span className="fas fa-star">🌟</span> </div>
        //                 : num === 2 ? <div> <span className="fas fa-star">🌟</span> <span className="fas fa-star">🌟</span> </div>
        //                     : num === 1 ? <span className="fas fa-star">🌟</span>
        //                         : <h4>No tiene puntuacion</h4>

        num === 5 ? <div><p>{starCompleta}{starCompleta}{starCompleta}{starCompleta}{starCompleta}</p></div>
            : (num < 5 && num >= 4.5) ? <div><p>{starCompleta}{starCompleta}{starCompleta}{starCompleta}{starHalf}</p></div>
                : num === 4 || (num < 4.5 && num >= 4) ? <div><p>{starCompleta}{starCompleta}{starCompleta}{starCompleta}{starEmpty}</p></div>
                    : (num < 4 && num >= 3.5) ? <div><p>{starCompleta}{starCompleta}{starCompleta}{starHalf}{starEmpty}</p></div>
                        : num === 3 || (num < 3.5 && num >= 3) ? <div><p>{starCompleta}{starCompleta}{starCompleta}{starEmpty}{starEmpty}</p></div>
                            : (num < 3 && num >= 2.5) ? <div><p>{starCompleta}{starCompleta}{starHalf}{starEmpty}{starEmpty}</p></div>
                                : num === 2 || (num < 2.5 && num >= 2) ? <div><p>{starCompleta}{starCompleta}{starEmpty}{starEmpty}{starEmpty}</p></div>
                                    : (num < 2 && num >= 1.5) ? <div><p>{starCompleta}{starHalf}{starEmpty}{starEmpty}{starEmpty}</p></div>
                                        : num === 1 || (num < 1.5 && num >= 1) ? <div><p>{starCompleta}{starEmpty}{starEmpty}{starEmpty}{starEmpty}</p></div>
                                            : <h4>No tiene puntuacion</h4>
    }
    </>
    )
}



export default ClassCard