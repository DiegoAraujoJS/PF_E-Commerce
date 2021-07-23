import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import style from './AddClaim.module.css';
import Swal from 'sweetalert2'
import { Claim } from "../../../../interfaces";
import getCookieValue from "../../cookieParser";

function AddClaim() {

    let [professor, setProfessor] = useState('');
    // let [claim, setClaim] = useState({professors:[], name: '', description: '', detail:""});
    let [professorData, setProfessorData] = useState({
        User_mail: "",
        name: "",
        lastName: "",
        city: "",
        foto: "",
    })
    // const professorsList = useSelector(state => state['professors']);
    const [claim, setClaim] = useState({
        nombre: "",
        detalle: "",
    })

    // const handleChange = (e) => {
    //     e.preventDefault();
    //     let nam = e.target.name;
    //     let val = e.target.value;
    //     setClaim({...claim,[nam]:val});
    // };

    // let professorChange = (e) => {
    //     let cn = e.target.value
    //     setProfessor(cn);
    // };

    // let addProfessor = (e) => {
    //     e.preventDefault();
    //     if(validateProfessor(professor)) {
    //         setClaim({...claim, professors: [...claim.professors, professor]})
    //         setProfessor('')
    //         let p = document.getElementById('p');
    //         p['value'] = '';
    //     } else {
    //         let p = document.getElementById('p');
    //         p['value'] = '';
    //         alert ('No existe ese Profesor')
    //     }
    // };

    // let validateProfessor = (a) => {
    //     return professorsList.some(c => c['name'] === a)
    // };

    // let delProfessor = (e) => {
    //     e.preventDefault();
    //     setClaim({...claim, professors:[...claim.professors.filter(c => c !== e.target.name)]})
    // };
    let [user, setUser] = useState<{ name: string, lastName: string, role: number, mail: string } | undefined>({ name: '', lastName: '', role: null, mail: '' })

    useEffect( () => {
        const getUser = async () => {
            const token = getCookieValue('token').replaceAll("\"", '')
            const response = await axios.post(`http://localhost:3001/api/verify`, {}, { withCredentials: true, headers: { Authorization: token } })
            if(response.status === 200){
                setUser(response.data)
            }
        }
        getUser()
    }, [])

    const handleChange = (e) => {
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

    const getProfessorFn = (e) => {
        e.preventDefault()
        getProfessor()
    }

    let handleSubmit = async (e) => {
        e.preventDefault();

        // let { name, description, detail } = claim;

        // claim.professors.map(professor => 
        //     axios.post('http://localhost:3001/api/claim/professor', { name, description, detail })
        // )
        if (claim) {
            if(user){
            let newClaim: Claim = {
                Denunciante_email: user.mail,
                Denunciado_email: professorData.User_mail,
                reclamo: claim
            }
            const response = await axios.post('http://localhost:3001/api/reclamos', newClaim)
            if (response.status === 200) {
                Swal.fire(
                    "Exito!",
                    "El reclamo fue creado correctamente.",
                    "success"
                )
            }
        }
        else {
            Swal.fire(
                "Error!",
                "Debe iniciar sesión para crear un reclamo.",
                "error"
            )
        }

        }
    };

    console.log(professorData)
    console.log(user)
    return (
        <div className={style.container}>
            <Row>
                <form className={style.form}>
                    <Row>
                        <div className={style.question}>
                            <h4 className="mt-3">Crear un Reclamo</h4>
                            <div className={style.claim}>
                                <label>Nombre Reclamo</label>
                                <input
                                    className={style.input}
                                    type='text'
                                    name='nombre'
                                    onChange={handleChange}
                                />
                            </div>

                            {/* <div className = {style.claim}>
                        <label>Descripcion</label>
                        <input
                            className = {style.input}
                            type = 'text'
                            name = 'description'
                            onChange = {handleChange}
                        />
                    </div> */}

                            <div className={style.claim}>
                                <label>Detalla el Reclamo</label>
                                <textarea
                                    className={style.input}
                                    name='detalle'
                                    rows={4}
                                    cols={60}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </Row>
                    <Row>
                        <div className={style.profe}>
                            <label>Profesor:</label>
                            <input
                                className={style.input}
                                id='p'
                                type='text'
                                name='professor'
                                // onChange={professorChange}
                                onChange={(e) => { setProfessor(e.target.value) }}
                            />
                            <button
                                className={style.sum}
                                // onClick={addProfessor}
                                onClick={(e) => getProfessorFn(e)}
                            >
                                +
                            </button>
                        </div>
                    </Row>
                    {professorData.name ?
                        <Row className="d-flex justify-content-center mt-3">
                            <Col sm={8} md={8}>
                                <Card>
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

                        : null}
                    {/* <div className = {style.claim}>
                    {Array.isArray(claim.professors) && claim.professors.map((c,i) => 
                    <label key={i}> {c} 
                        <button 
                            className = {style.del}
                            name={c} 
                            onClick={delProfessor}>
                                x
                        </button>
                    </label>)} 
                </div>*/}
                    <Row className="d-flex justify-content-center mt-4">
                        <Col sm={4} md={4} className="d-flex justify-content-center">
                            <button
                                className={style.submit}
                                value='Add Claim'
                                onClick={handleSubmit}>
                                Subir Reclamo
                            </button>
                        </Col>
                    </Row>
                </form>
            </Row>
        </div>
    )
};

export default AddClaim;