import React, { useState, useEffect } from 'react'
import { Row, Col, ListGroup, Form, Tab, Tabs, Button } from 'react-bootstrap'
import ClassCards from '../classCards/ClassCards'
import "./ClassConteiner.css"
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Class } from '../../../../interfaces';
import getCookieValue from '../../cookieParser';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { connect } from 'react-redux'
import StudentClassCards from '../classCards/StudentClassCards'


const star = <FontAwesomeIcon icon={faStar} style={{ color: "#ffc107" }} />

type Props = {
    searchInput: Class[],
    dispatchInput: (data) => any,
}

const ClassContainer: React.FC<Props> = ({ searchInput, dispatchInput }) => {
    const [classFilter, setClassFilter] = useState([])
    const [nivel, setNivel] = useState("")
    const [size, setSize] = useState({ name: "", length: 0 })
    const [grado, setGrado] = useState("")
    const [puntuacion, setPuntuacion] = useState({ value: "", check: false })
    const [horario, setHorario] = useState({ desde: "", hasta: "" })
    const grados = ["Primer grado", "Segundo grado", "Tercer grado", "Cuarto grado", "Quinto grado", "Sexto grado"]
    const [city, setCity] = useState({ name: "", show: false, length: 0, })
    let [user, setUser] = useState<{ name: string, lastName: string, role: number, mail: string } | undefined>({ name: '', lastName: '', role: null, mail: '' })

    const [classProfessor, setClassProfessor] = useState([])
    const [classProfessorFilter, setClassProfessorFilter] = useState([])
    const [classUser, setClassUser] = useState([])
    const [classUserFilter, setClassUserFilter] = useState([])

    useEffect(() => {
        if (Array.isArray(searchInput)) {
            let classP = searchInput?.filter(c => c.Profesor_mail !== null)
            if (classP) setClassProfessor(classP)
            let classU = searchInput?.filter(c => c.User_mail !== null)
            if (classU) setClassUser(classU)
        }
    }, [searchInput])

    console.log(classProfessor)
    console.log(classUser)

    useEffect(() => {
        async function setRoleOfUser() {
            if (localStorage.getItem('login')) {
                if (!document.cookie) {
                    localStorage.removeItem('login')
                }
                const token = getCookieValue('token').replaceAll("\"", '')
                const thisUser = await axios.post(`http://localhost:3001/api/verify`, {}, { withCredentials: true, headers: { Authorization: token } })

                if (thisUser.status === 200) {
                    setUser(thisUser.data)
                } else {
                    setUser(undefined)
                }
            }
        }
        setRoleOfUser()
    }, [])

    const handleChange = (e) => {
        if (e.target.name === "desde") {
            setHorario({ ...horario, desde: e.target.value })
        }
        else if (e.target.name === "hasta") {
            setHorario({ ...horario, hasta: e.target.value })
        }
        else if (e.target.name === "grado") { setGrado(e.target.value) }
    };

    const filterByTime = (array) =>{
        let filtrados = array.filter(clase => {
            if (clase && clase.date.time && clase.date.time.length === 2) {
                let desde = horario.desde + ":00"
                let hasta = horario.hasta + ":00"
                let time = clase.date.time

                const search_desde: string = desde.substring(0, 2) + desde.substring(3, 5) + desde.substring(6, 8)
                const search_hasta: string = hasta.substring(0, 2) + hasta.substring(3, 5) + hasta.substring(6, 8)
                const clase_desde: string = time && time[0].substring(0, 2) + time[0].substring(3, 5) + time[0].substring(6, 8)
                const clase_hasta: string = time && time[1].substring(0, 2) + time[1].substring(3, 5) + time[1].substring(6, 8)

                if (clase_desde >= search_desde && clase_desde < search_hasta && clase_hasta <= search_hasta && clase_hasta > search_desde) return clase
                else return null
            }
            else return null
        })
        return filtrados
    }
    useEffect(() => {
        if (horario) {
            if (searchInput && horario.desde && horario.hasta) {
                searchInput && setClassFilter(filterByTime(searchInput));
                classProfessor && setClassProfessorFilter(filterByTime(classProfessor));
                classUser &&  setClassUserFilter(filterByTime(classUser));

                setNivel(""); setGrado(""); setPuntuacion({ value: "", check: false }); setCity({ ...city, show: false, });
            }
        }
        else if (horario.desde === "" && horario.hasta === "") {
            setClassFilter(searchInput)
        }
    }, [horario])


    const filterByNivel = (array) => {
        let filtrados: Class[] = array.filter((clase: Class) => {
            if (clase && clase.nivel) {
                if (clase.nivel === nivel) return clase
                else return null
            }
            else return null
        })   
        setSize({ name: nivel, length: filtrados.length })
        return filtrados     
    }
    
    useEffect(() => {
        if (searchInput && nivel && typeof nivel === 'string') {
            searchInput && setClassFilter(filterByNivel(searchInput));
            classProfessor && setClassProfessorFilter(filterByNivel(classProfessor));
            classUser && setClassUserFilter(filterByNivel(classUser));
 
            setGrado(""); setPuntuacion({ value: "", check: false }); setHorario({ desde: "", hasta: "" }); setCity({ ...city, show: false, });
        }
        else if (nivel === "") {
            setPuntuacion({ value: "", check: false })
            setClassFilter(searchInput)
        }
    }, [nivel])


    const filterByGrado = (array) => {
        let filtrados: Class[] = array.filter((clase: Class) => {
            if (clase && clase.grado) {
                if (clase.grado === grado) return clase
                else return null
            }
            else return null
        })
        
        setSize({ name: "grado", length: filtrados.length });
        return filtrados
    }

    useEffect(() => {
        if (searchInput && grado && typeof grado === 'string') {
            searchInput && setClassFilter(filterByGrado(searchInput));
            classProfessor && setClassProfessorFilter(filterByGrado(classProfessor));
            classUser && setClassUserFilter(filterByGrado(classUser));
            
            setNivel(""); setPuntuacion({ value: "", check: false }); setHorario({ desde: "", hasta: "" }); setCity({ ...city, show: false, });
        }
        else if (grado === "") {
            setClassFilter(searchInput)
        }
    }, [grado])


    const filterByPuntuacion = ( e, array ) => {
        let filtrados: Class[] = array.filter((clase: Class) => {
            if (clase && clase.puntuacion) {
                if (clase.puntuacion.toString() === e.target.value || (clase.puntuacion >= Number(e.target.value) - 0.50 && clase.puntuacion <= e.target.value)) return clase
                else return null
            }
            else return null
        })
        setSize({ name: "puntuacion", length: filtrados.length })
        return filtrados.sort(function (a, b) {
            if (a.puntuacion < b.puntuacion) { return 1; }
            if (a.puntuacion > b.puntuacion) { return -1; }
            return 0;
        })
    }



    const handlePuntuacion = async (e) => {
        if (e.target.name === "puntuacion") {
            let puntuacion = e.target.value
            if (e.target.checked === false) {
                setPuntuacion({ value: "", check: false })
                setClassFilter(searchInput)
            }
            else {
                setPuntuacion({ value: puntuacion, check: true })

                searchInput && setClassFilter(filterByPuntuacion(e, searchInput));
                classProfessor && setClassProfessorFilter(filterByPuntuacion(e, classProfessor));
                classUser && setClassUserFilter(filterByPuntuacion(e, classUser));                

                setNivel(""); setGrado(""); setHorario({ desde: "", hasta: "" }); setCity({ ...city, show: false, });
            }
        }
    };

    useEffect(() => {
        async function fetchData() {
            if (user.mail) {
                const response = await axios.get("http://localhost:3001/api/usuarios/" + user.mail)
                if (response.status === 200) { setCity({ name: response.data.city, show: false, length: 0 }) }
            }
        }
        fetchData()
    }, [user])

    const filterByCity = (array) => {
        let filtrados: Class[] = array.filter((clase: Class) => {
            if (clase && clase.profesor.city) {
                if (clase.profesor.city === city.name) return clase
                else return null
            }
            else return null
        })
        setCity({ ...city, show: true, length: filtrados.length })
        return filtrados
    }

    const handleCity = () => {
        if (user.mail && city.name) {
            if (city.show === false) {
                searchInput && setClassFilter(filterByCity(searchInput));
                classProfessor && setClassProfessorFilter(filterByCity(classProfessor));
                classUser && setClassUserFilter(filterByCity(classUser));

                setNivel(""); setGrado(""); setPuntuacion({ value: "", check: false }); setHorario({ desde: "", hasta: "" });
            }
            else {
                setCity({ ...city, show: false, })
                setClassFilter(searchInput)
            }
        }
    }
    const [key, setKey] = useState('classProfessor');

    const [search, setSearch] = React.useState('')

    const handleChangeSearch = (e) => {
        setSearch(e.target.value)
    };
    
    const searchIcon = <FontAwesomeIcon icon={faSearch} className="ml-2 ml-2" />


    return (
        <div className="container-fluid pt-5" style={{ backgroundColor: '#ededed', height: "100%" }}>
            <Row>
                <Col sm={12} md={5} lg={3}>
                    <h5 className="font-weight-bold">Categorias</h5>
                    <h6 className="font-weight-bold  mt-3">Nivel:</h6>
                    <ListGroup>
                        <ListGroup.Item action style={{ backgroundColor: (nivel === "Primario" ? "#bababa" : "white") }} onClick={() => nivel !== "Primario" ? setNivel("Primario") : setNivel("")} className="d-flex justify-content-between align-items-center category"> Primario
                            <span style={{ backgroundColor: "lightgreen", color: "green" }} className="badge badge-primary badge-pill">{nivel === "Primario" && size.name === "Primario" && size.length}</span> </ListGroup.Item>
                        <ListGroup.Item action style={{ backgroundColor: (nivel === "Secundario" ? "#bababa" : "white") }} onClick={() => nivel !== "Secundario" ? setNivel("Secundario") : setNivel("")} className="d-flex justify-content-between align-items-center category"> Secundario
                            <span style={{ backgroundColor: "lightgreen", color: "green" }} className="badge badge-primary badge-pill">{nivel === "Secundario" && size.name === "Secundario" && size.length}</span> </ListGroup.Item>
                        <ListGroup.Item action style={{ backgroundColor: (nivel === "Terciario" ? "#bababa" : "white") }} onClick={() => nivel !== "Terciario" ? setNivel("Terciario") : setNivel("")} className="d-flex justify-content-between align-items-center category"> Terciario
                            <span style={{ backgroundColor: "lightgreen", color: "green" }} className="badge badge-primary badge-pill">{nivel === "Terciario" && size.name === "Terciario" && size.length}</span> </ListGroup.Item>
                        <ListGroup.Item action style={{ backgroundColor: (nivel === "Universitario" ? "#bababa" : "white") }} onClick={() => nivel !== "Universitario" ? setNivel("Universitario") : setNivel("")} className="d-flex justify-content-between align-items-center category"> Universitario
                            <span style={{ backgroundColor: "lightgreen", color: "green" }} className="badge badge-primary badge-pill">{nivel === "Universitario" && size.name === "Universitario" && size.length}</span> </ListGroup.Item>
                    </ListGroup>
                    <Form>
                        <h6 className="font-weight-bold mt-3">Grado:</h6>
                        <Form.Group className="mb-3">
                            <Row>
                                <Col sm={10} md={10} lg={10}>
                                    <Form.Control
                                        as='select'
                                        name='grado'
                                        onChange={handleChange}
                                        className="form-select"
                                    >
                                        <option key="19" value="">Elige un grado</option>
                                        {grados.map((grado, i) => {
                                            return <option key={i + 20} value={grado}>{grado}</option>
                                        }
                                        )}
                                    </Form.Control>
                                </Col>
                                <Col sm={2} md={2} lg={2} className="d-flex align-items-center">
                                    <span style={{ backgroundColor: "lightgreen", color: "green" }} className="badge badge-primary badge-pill">{(grado && size.name === "grado") && size.length}</span>
                                </Col>
                            </Row>
                        </Form.Group>
                    </Form>

                    {user.mail && city ?
                        <>
                            <ListGroup className="ml-3" >
                                <h5 className="font-weight-bold w-100 mt-2">Encuentra las clases de tu ciudad:</h5>
                                <ListGroup.Item action style={{ backgroundColor: (city.show ? "#bababa" : "white") }} onClick={handleCity} className="d-flex justify-content-between align-items-center category">  {city.name}
                                    <span style={{ backgroundColor: "lightgreen", color: "green" }} className="badge badge-primary badge-pill">{city.show && city.length}</span>
                                </ListGroup.Item>

                            </ListGroup>
                        </>
                        : null}

                    <ListGroup className="py-3 ">
                        <Row>
                            <h5 className="font-weight-bold">Horarios</h5>

                            <Form className="brand d-flex justify-content-evenly p-0">
                                <Col sm={5} md={5}>
                                    <Form.Group className="mb-3">
                                        <h6 className="font-weight-bold">Desde:</h6>
                                        <Form.Control name="desde" value={horario.desde} type="time" onChange={handleChange} />
                                    </Form.Group>
                                </Col>
                                <Col sm={5} md={5}>
                                    <Form.Group className="">
                                        <h6 className="font-weight-bold">Hasta:</h6>
                                        <Form.Control name="hasta" value={horario.hasta} type="time" onChange={handleChange} />
                                    </Form.Group>
                                </Col>
                            </Form>
                            <span style={{ backgroundColor: "lightgreen", color: "green" }} className="badge badge-primary badge-pill">{(horario.desde && horario.hasta && size.name === "horario") && size.length}</span>
                        </Row>
                    </ListGroup>

                    <ListGroup className="py-3">
                        <h5 className="font-weight-bold">Calificación</h5>
                        <Form className="rating" >
                            <ListGroup.Item className="form-inline d-flex align-items-center justify-content-between py-2">
                                <Form.Label className="tick">
                                    <span>{star}{star}{star}{star}{star}</span>
                                    <input onChange={handlePuntuacion} type="checkbox" name="puntuacion" value="5" checked={puntuacion.value === "5" && puntuacion.check ? true : false} />
                                    <span className="check"></span>
                                </Form.Label>
                                <span style={{ backgroundColor: "lightgreen", color: "green" }} className="badge badge-primary badge-pill">{(puntuacion.value === "5" && size.name === "puntuacion") && size.length}</span>
                            </ListGroup.Item >
                            <ListGroup.Item className="form-inline d-flex align-items-center justify-content-between py-2">
                                <Form.Label className="tick">
                                    <span>{star}{star}{star}{star}</span>
                                    <input onChange={handlePuntuacion} type="checkbox" name="puntuacion" value="4" checked={puntuacion.value === "4" && puntuacion.check ? true : false} /> <span className="check"></span>
                                </Form.Label>
                                <span style={{ backgroundColor: "lightgreen", color: "green" }} className="badge badge-primary badge-pill">{(puntuacion.value === "4" && size.name === "puntuacion") && size.length}</span>
                            </ListGroup.Item >
                            <ListGroup.Item className="form-inline d-flex align-items-center justify-content-between py-2">
                                <Form.Label className="tick">
                                    <span>{star}{star}{star}</span>
                                    <input onChange={handlePuntuacion} type="checkbox" name="puntuacion" value="3" checked={puntuacion.value === "3" && puntuacion.check ? true : false} /> <span className="check"></span>
                                </Form.Label>
                                <span style={{ backgroundColor: "lightgreen", color: "green" }} className="badge badge-primary badge-pill">{(puntuacion.value === "3" && size.name === "puntuacion") && size.length}</span>
                            </ListGroup.Item >
                            <ListGroup.Item className="form-inline d-flex align-items-center justify-content-between py-2">
                                <Form.Label className="tick">
                                    <span>{star}{star}</span>
                                    <input onChange={handlePuntuacion} type="checkbox" name="puntuacion" value="2" checked={puntuacion.value === "2" && puntuacion.check ? true : false} /> <span className="check"></span>
                                </Form.Label>
                                <span style={{ backgroundColor: "lightgreen", color: "green" }} className="badge badge-primary badge-pill">{(puntuacion.value === "2" && size.name === "puntuacion") && size.length}</span>
                            </ListGroup.Item >
                            <ListGroup.Item className="form-inline d-flex align-items-center justify-content-between py-2">
                                <Form.Label className="tick">
                                    <span>{star}</span>
                                    <span className="far fa-star px-1 text-muted"></span>
                                    <input onChange={handlePuntuacion} type="checkbox" name="puntuacion" value="1" checked={puntuacion.value === "1" && puntuacion.check ? true : false} />
                                    <span className="check"></span>
                                </Form.Label>
                                <span style={{ backgroundColor: "lightgreen", color: "green" }} className="badge badge-primary badge-pill">{(puntuacion.value === "1" && size.name === "puntuacion") && size.length}</span>
                            </ListGroup.Item >
                        </Form>


                    </ListGroup>

                </Col>
                <Col sm={12} md={7} lg={9}>
                    <Tabs
                        id="controlled-tab-example"
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                        className="mb-3"
                    >
                        <Tab eventKey="classProfessor" title="Class by Professor">
                            <ClassCards clasesFiltradas={classProfessor ? classProfessor : searchInput} />
                        </Tab>
                        <Tab eventKey="classUser"
                            title="Class by Student">
                                <StudentClassCards clasesFiltradas={classUser ? classUser : searchInput} />
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
        </div >
    )
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        searchInput: state.searchInput,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchInput: function (payload) {
            dispatch({ type: 'SEARCH_INPUT', payload })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassContainer)