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
import StudentClassDetail from './StudentClassDetail';
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
            <StudentClassDetail hijo = {{show, handleClose, email, mark}} {...props} />
        </div >
    )
}


export default StudentClassCard