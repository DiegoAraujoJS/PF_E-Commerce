import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import style from './AddClaim.module.css';
import Swal from 'sweetalert2'
import { Claim } from "../../../../interfaces";
import getCookieValue from "../../cookieParser";

function AddClaim() {

    const [professor, setProfessor] = useState('');
    const [professorData, setProfessorData] = useState({
        User_mail: "",
        name: "",
        lastName: "",
        city: "",
        foto: "",
    })
    const [admin, setAdmin] = useState("")
    const [claim, setClaim] = useState({
        nombre: "",
        detalle: "",
    })
    const [class_id, setClass_id] = useState(0)
    let [user, setUser] = useState<{ name: string, lastName: string, role: number, mail: string } | undefined>({ name: '', lastName: '', role: null, mail: '' })

    useEffect(() => {
        const getUser = async () => {
            const token = getCookieValue('token').replaceAll("\"", '')
            const response = await axios.post(`http://localhost:3001/api/verify`, {}, { withCredentials: true, headers: { Authorization: token } })
            if (response.status === 200) {
                setUser(response.data)
            }
        }
        getUser()
    }, [])

    const handleChange = (e) => {
        if (e.target.name === "class_id") {
            return setClass_id(e.target.value)
        }
        else if (e.target.name === "admin") {
            setAdmin(e.target.value)
        }
        setClaim({
            ...claim,
            [e.target.name]: e.target.value,
        })
    }

    const getProfessor = async () => {
        if (professor) {
            const response = await axios.get('http://localhost:3001/api/profesores/' + professor)
            if (response.status === 200) {
                setProfessorData({
                    User_mail: response.data.User_mail,
                    name: response.data.name,
                    lastName: response.data.lastName,
                    city: response.data.city,
                    foto: response.data.foto,
                })
            } else {
                Swal.fire(
                    "Error!",
                    "El profesor no existe.",
                    "error"
                )
            }
        }
    }

    const [adminsArray, setAdminsArray] = useState([])
    const [classData, setClassData] = useState({
        nombre: "",
        grado: "",
        nivel: "",
        materia: "",
        descripcion: "",
        esPresencial: "",
        Profesor_mail: "",
    })

    const getClass = async () => {
        if (class_id) {
            const response = await axios.get(`http://localhost:3001/api/clases/${class_id}`)
            if (response.status === 200) {
                setClassData({
                    nombre: response.data.nombre,
                    grado: response.data.grado,
                    nivel: response.data.nivel,
                    materia: response.data.materia,
                    descripcion: response.data.descripcion,
                    esPresencial: response.data.esPresencial,
                    Profesor_mail: response.data.Profesor_mail,
                })
            } else {
                Swal.fire(
                    "Error!",
                    "No existe clase con ese id.",
                    "error"
                )
            }
        }
    }

    const getProfessorFn = (e) => {
        e.preventDefault()
        getProfessor()
    }
    const getClassFn = (e) => {
        e.preventDefault()
        getClass()
    }

    useEffect(() => {
        const getAdmin = async () => {
            const response = await axios.get(`http://localhost:3001/api/usuarios/admin`)
            if (response.status === 200) {
                setAdminsArray(response.data)
            }
        }
        getAdmin()
    }, [])


    let handleSubmit = async (e) => {
        e.preventDefault();

        if (claim) {
            if (user) {
                if (!professorData) {
                    return Swal.fire(
                        "Error!",
                        "Debe ingresar el mail del denunciado.",
                        "error"
                    )
                }

                if (classData.Profesor_mail === professorData.User_mail) {
                    let newClaim = {
                        denunciante: user.mail,
                        denunciado: professorData.User_mail,
                        admin: admin,
                        nombre: claim.nombre,
                        reclamo: claim.detalle,
                        clase: class_id,
                    }

                    const responseClaim = await axios.post('http://localhost:3001/api/reclamos', newClaim)
                    if (responseClaim.status === 200) {
                        console.log(responseClaim.data)
                        Swal.fire(
                            "Exito!",
                            "El reclamo fue creado correctamente.",
                            "success"
                        )
                    }
                    else {
                        Swal.fire(
                            "Error!",
                            "Debe iniciar sesión para crear un reclamo.",
                            "error"
                        )
                    }
                }
                else {
                    Swal.fire(
                        "Error!",
                        "La clase no pertenece al denunciado.",
                        "error"
                    )
                }
            }

        }
    };

    console.log(adminsArray)
    console.log(user)
    return (
        <Container>
            <Row>
                <Form>
                    <h4 className="mt-3">Crear un Reclamo:</h4>
                    <Form.Group className="mb-3" >
                        <Form.Label>Nombre Reclamo</Form.Label>
                        <Form.Control
                            type='text'
                            name='nombre'
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Detalla el Reclamo:</Form.Label>
                        <Form.Control
                            as="textarea"
                            name='detalle'
                            rows={3}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Row sm={12} md={12}>
                        <Form.Label>Profesor:</Form.Label>
                        <Form.Group className="mb-3 d-flex align-items-center" >
                            <Col sm={10} md={10}>
                                <Form.Control
                                    type='text'
                                    name='professor'
                                    onChange={(e) => { setProfessor(e.target.value) }}
                                />
                            </Col>
                            <Col sm={2} md={2}>
                                <Button
                                    onClick={(e) => getProfessorFn(e)}
                                >
                                    Show Professor
                                </Button>
                            </Col>
                        </Form.Group>
                    </Row>
                    {
                        professorData.name ?
                            <Row className="d-flex justify-content-center mt-3">
                                <Col sm={6} md={6}>
                                    <Card style={{ width: "450px", height: "250" }}>
                                        <Card.Body className="d-flex flex-row">
                                            <Card.Img src={professorData.foto} width="200" height="200" alt="foto de profesor" />
                                            <div className="d-flex flex-column align-items-center justify-content-center w-100">
                                                <Card.Title>{professorData.name}{professorData.lastName}</Card.Title>
                                                <Card.Text>{professorData.User_mail}</Card.Text>
                                                <Card.Text>{professorData.city}</Card.Text>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                            : null
                    }
                    <Row className="mt-3">
                        <Form.Label>Id de la clase:</Form.Label>
                        <Form.Group className="mb-3 d-flex align-items-center" >
                            <Col sm={10} md={10} >
                                <Form.Control
                                    type='number'
                                    name='professor'
                                    onChange={(e) => { setClass_id(Number(e.target.value)) }}
                                />
                            </Col>
                            <Col sm={2} md={2}>
                                <Button
                                    onClick={(e) => getClassFn(e)}
                                >
                                    Show Class
                                </Button>
                            </Col>
                        </Form.Group>
                    </Row>
                    <Row>
                        {
                            classData.nombre ?
                                <Row className="d-flex justify-content-center mt-3">
                                    <Col sm={8} md={8}>
                                        <Card>
                                            <Card.Header>
                                                <Card.Title>{classData.nombre}</Card.Title>
                                                <Card.Text><strong>Profesor mail:</strong> {classData.Profesor_mail}</Card.Text>
                                            </Card.Header>
                                            <Card.Body >
                                                <Card.Text className="d-flex justify-content-evenly">
                                                    <span><strong>Grado:</strong> {classData.grado}</span>
                                                    <span><strong>Nivel:</strong> {classData.nivel}</span>
                                                    <span><strong>Materia:</strong> {classData.materia}</span>
                                                </Card.Text>
                                                <Card.Text><strong>Descripción:</strong> {classData.descripcion}</Card.Text>
                                                <Card.Text><strong>Tipo:</strong> {classData.esPresencial}</Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                                : null
                        }
                    </Row>
                    <Row className="mt-3">
                        <Form.Label>Elije un admin:</Form.Label>
                        <Form.Control
                            as="select"
                            name="admin"
                            onChange={handleChange}
                        >
                            <option>{"..."}</option>
                            {/* {adminsArray && adminsArray.length ? adminsArray?.map(a => {
                                return <option>{a.mail}</option>
                            }) : <h3>No hay admins</h3>} */}
                        </Form.Control>
                    </Row>
                    <Row className="d-flex justify-content-center mt-4">
                        <Col sm={4} md={4} className="d-flex justify-content-center">
                            <Button
                                className={style.submit}
                                value='Add Claim'
                                onClick={handleSubmit}>
                                Subir Reclamo
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Row >
        </Container>
    )
};

export default AddClaim;