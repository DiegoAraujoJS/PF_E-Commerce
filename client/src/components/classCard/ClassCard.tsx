import CSS from 'csstype';
import { Class } from '../../../../interfaces';
import { Button, Card, Col, ListGroup, Modal, Row, } from 'react-bootstrap'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt, faClock, faEnvelope, faStar } from '@fortawesome/free-regular-svg-icons';
import { faMapMarkerAlt, faStar as starComplete, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import s from './ClassCard.module.css'
import ClassDetail from './ClassDetail';
 
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


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <Row className='d-flex justify-content-center'>
                <Col sm={11} md={11} >
                    <ListGroup className={"mb-3 "+ s.contenedor}>
                        <ListGroup.Item className={"p-0 shadow "} style={{ borderRadius: '40px' , outline:"none"}} action onClick={handleShow}>
                            <Card className={"shadow p-0"} style={{ borderRadius: '30px' }} >
                                <Card.Header
                                    style={{ fontSize: "20px", borderTopRightRadius: "30px", borderTopLeftRadius: "30px" }}
                                    className='d-flex justify-content-center font-weight-bold '>{props.nombre}</Card.Header>
                                <Card.Body className={"d-lg-flex d-md-flex flex-row align-items-center card-body " } style={{ backgroundColor: '#c8c8c8', borderBottomRightRadius: "30px", borderBottomLeftRadius: "30px" }} >
                                    <Col sm={12} md={8} lg={4} className="d-flex justify-content-center">
                                        <Card.Img style={profileImg} src={props.profesor && props.profesor.foto} />
                                    </Col>
                                    <Col sm={12} md={4} lg={8} className="d-flex flex-column align-items-start ml-2 ">
                                        <Card.Title className="d-sm-flex justify-content-center m-0">{puntuacion(props.puntuacion)}</Card.Title>
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
            <ClassDetail hijo = {{show, handleClose, email, mark, puntuacion}} puntuacion={props.puntuacion} {...props} />
            
        </div >
    )
}



const puntuacion = (num) => {
    return (<>{
        num === 5 ? <p>{starCompleta}{starCompleta}{starCompleta}{starCompleta}{starCompleta}</p>
            : (num < 5 && num >= 4.5) ? <p>{starCompleta}{starCompleta}{starCompleta}{starCompleta}{starHalf}</p>
                : num === 4 || (num < 4.5 && num >= 4) ? <p>{starCompleta}{starCompleta}{starCompleta}{starCompleta}{starEmpty}</p>
                    : (num < 4 && num >= 3.5) ? <p>{starCompleta}{starCompleta}{starCompleta}{starHalf}{starEmpty}</p>
                        : num === 3 || (num < 3.5 && num >= 3) ? <p>{starCompleta}{starCompleta}{starCompleta}{starEmpty}{starEmpty}</p>
                            : (num < 3 && num >= 2.5) ? <p>{starCompleta}{starCompleta}{starHalf}{starEmpty}{starEmpty}</p>
                                : num === 2 || (num < 2.5 && num >= 2) ? <p>{starCompleta}{starCompleta}{starEmpty}{starEmpty}{starEmpty}</p>
                                    : (num < 2 && num >= 1.5) ? <p>{starCompleta}{starHalf}{starEmpty}{starEmpty}{starEmpty}</p>
                                        : num === 1 || (num < 1.5 && num >= 1) ? <p>{starCompleta}{starEmpty}{starEmpty}{starEmpty}{starEmpty}</p>
                                            : <h4>No tiene puntuacion</h4>
    }
    </>
    )
}



export default ClassCard