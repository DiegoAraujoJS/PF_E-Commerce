import React, { useState, useEffect } from 'react'
import { Row, Col, ListGroup, Form, Tab, Tabs, Button } from 'react-bootstrap'
import ClassCards from '../classCards/ClassCards'
import "./ClassConteiner.css"
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import getCookieValue from '../../cookieParser';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { connect } from 'react-redux'
import StudentClassCards from '../classCards/StudentClassCards'
import { filterByCity, filterByGrade, filterByLevel, filterByScore, filterByTime, intersection } from './FiltersFunctions'
import { IClase } from '../../../../interfaces'


const star = <FontAwesomeIcon icon={faStar} style={{ color: "#ffc107" }} />

type Props = {
    searchInput: IClase[],
    dispatchInput: (data) => any,
}

const ClassContainer: React.FC<Props> = ({ searchInput, dispatchInput }) => {
    const [classFilter, setClassFilter] = useState([])
    const [nivel, setNivel] = useState("")
    const [grado, setGrado] = useState("")
    const [puntuacion, setPuntuacion] = useState({ value: "", check: false })
    const [horario, setHorario] = useState({ desde: "", hasta: "" })
    const grados = ["Primer grado", "Segundo grado", "Tercer grado", "Cuarto grado", "Quinto grado", "Sexto grado"]
    const [city, setCity] = useState({ name: "", show: false })
    let [user, setUser] = useState<{ name: string, lastName: string, role: number, mail: string } | undefined>({ name: '', lastName: '', role: null, mail: '' })

    const [classProfessor, setClassProfessor] = useState<IClase[]>([])
    const [classProfessorFilter, setClassProfessorFilter] = useState([])
    const [classUser, setClassUser] = useState<IClase[]>([])
    const [classUserFilter, setClassUserFilter] = useState([])

    const [classList, setClassList] = useState([])



    useEffect(() => {

        const filterCesta = async () => {
            if (user && user.mail && Array.isArray(searchInput)) {
                let cesta = await axios.get(`http://localhost:3001/api/carrito/all/${user.mail}`)
                console.log(searchInput)
                console.log( cesta.data)
                if (cesta.status === 200 && cesta.data.length) {
                    let result = intersection(searchInput, cesta.data)
                    setClassProfessor(result)
                }
                else {
                    setClassProfessor(searchInput)
                }
            }
        }
        filterCesta()
    }, [searchInput])


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

    useEffect(() => {
        if (horario) {
            if (searchInput && horario.desde && horario.hasta) {
                searchInput && setClassFilter(filterByTime(searchInput, horario));
                classProfessor && setClassProfessorFilter(filterByTime(classProfessor, horario));
                classUser && setClassUserFilter(filterByTime(classUser, horario));

                setNivel(""); setGrado(""); setPuntuacion({ value: "", check: false }); setCity({ ...city, show: false, });
            }
        }
        else if (horario.desde === "" && horario.hasta === "") {
            setClassFilter(searchInput)
        }
    }, [horario])

    useEffect(() => {
        if (searchInput && nivel && typeof nivel === 'string') {
            searchInput && setClassFilter(filterByLevel(searchInput, nivel));
            classProfessor && setClassProfessorFilter(filterByLevel(classProfessor, nivel));
            classUser && setClassUserFilter(filterByLevel(classUser, nivel));

            setGrado(""); setPuntuacion({ value: "", check: false }); setHorario({ desde: "", hasta: "" }); setCity({ ...city, show: false, });
        }
        else if (nivel === "") {
            setPuntuacion({ value: "", check: false })
            setClassFilter(searchInput)
        }
    }, [nivel])


    useEffect(() => {
        if (searchInput && grado && typeof grado === 'string') {
            searchInput && setClassFilter(filterByGrade(searchInput, grado));
            classProfessor && setClassProfessorFilter(filterByGrade(classProfessor, grado));
            classUser && setClassUserFilter(filterByGrade(classUser, grado));

            setNivel(""); setPuntuacion({ value: "", check: false }); setHorario({ desde: "", hasta: "" }); setCity({ ...city, show: false, });
        }
        else if (grado === "") {
            setClassFilter(searchInput)
        }
    }, [grado])


    const handlePuntuacion = async (e) => {
        if (e.target.name === "puntuacion") {
            let puntuacion = e.target.value
            if (e.target.checked === false) {
                setPuntuacion({ value: "", check: false })
                setClassFilter(searchInput)
            }
            else {
                setPuntuacion({ value: puntuacion, check: true })

                searchInput && setClassFilter(filterByScore(e, searchInput));
                classProfessor && setClassProfessorFilter(filterByScore(e, classProfessor));
                classUser && setClassUserFilter(filterByScore(e, classUser));

                setNivel(""); setGrado(""); setHorario({ desde: "", hasta: "" }); setCity({ ...city, show: false, });
            }
        }
    };

    useEffect(() => {
        async function fetchData() {
            if (user.mail) {
                const response = await axios.get("http://localhost:3001/api/usuarios/" + user.mail)
                if (response.status === 200) { setCity({ name: response.data.city, show: false }) }
            }
        }
        fetchData()
    }, [user])


    const handleCity = () => {
        if (user.mail && city.name) {
            if (city.show === false) {
                searchInput && setClassFilter(filterByCity(searchInput, city));
                classProfessor && setClassProfessorFilter(filterByCity(classProfessor, city));
                classUser && setClassUserFilter(filterByCity(classUser, city));

                setCity({ ...city, show: true })
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

    async function vaYBuscaUser() {
        const response: any = await axios.get(`http://localhost:3001/api/clases/student?busqueda=${search}`)
        if (response.status === 200) {
            if (user && user.mail && Array.isArray(searchInput)) {
                let cesta = await axios.get(`http://localhost:3001/api/carrito/all/${user.mail}`)

                if (cesta.status === 200 && cesta.data.length) {
                    console.log(response.data)
                    console.log( cesta.data)
                    let result = intersection(response.data, cesta.data)
                    console.log(result)
                    setClassUser(result)
                }
                else {
                    setClassUser(response.data)
                }
            }
        }
    }
    
    const searchIcon = <FontAwesomeIcon icon={faSearch} className="ml-2 ml-2" />

 
    return (
        <div className="container-fluid pt-5" style={{ backgroundColor: '#ededed', height: "100%" }}>
            <Row>
                <Col sm={12} md={5} lg={3}>
                    <h5 className="font-weight-bold">Categorias</h5>
                    <h6 className="font-weight-bold  mt-3">Nivel:</h6>
                    <ListGroup>
                        <ListGroup.Item action style={{ backgroundColor: (nivel === "Primario" ? "#bababa" : "white") }} onClick={() => nivel !== "Primario" ? setNivel("Primario") : setNivel("")} className="d-flex justify-content-between align-items-center category"> Primario
                            <div className="d-flex justify-content-evenly" style={{ width: "50px" }} ><span style={{ backgroundColor: "lightgreen", color: "green" }} className="badge badge-primary badge-pill">{nivel === "Primario" && classProfessorFilter.length}</span>
                                <span style={{ backgroundColor: "lightblue", color: "blue" }} className="badge badge-primary badge-pill">{nivel === "Primario" && classUserFilter.length}</span> </div>
                        </ListGroup.Item>
                        <ListGroup.Item action style={{ backgroundColor: (nivel === "Secundario" ? "#bababa" : "white") }} onClick={() => nivel !== "Secundario" ? setNivel("Secundario") : setNivel("")} className="d-flex justify-content-between align-items-center category"> Secundario
                            <div className="d-flex justify-content-evenly" style={{ width: "50px" }} ><span style={{ backgroundColor: "lightgreen", color: "green" }} className="badge badge-primary badge-pill">{nivel === "Secundario" && classProfessorFilter.length}</span>
                                <span style={{ backgroundColor: "lightblue", color: "blue" }} className="badge badge-primary badge-pill">{nivel === "Secundario" && classUserFilter.length}</span> </div>
                        </ListGroup.Item>
                        <ListGroup.Item action style={{ backgroundColor: (nivel === "Terciario" ? "#bababa" : "white") }} onClick={() => nivel !== "Terciario" ? setNivel("Terciario") : setNivel("")} className="d-flex justify-content-between align-items-center category"> Terciario
                            <div className="d-flex justify-content-evenly" style={{ width: "50px" }} > <span style={{ backgroundColor: "lightgreen", color: "green" }} className="badge badge-primary badge-pill">{nivel === "Terciario" && classProfessorFilter.length}</span>
                                <span style={{ backgroundColor: "lightblue", color: "blue" }} className="badge badge-primary badge-pill">{nivel === "Terciario" && classUserFilter.length}</span> </div>
                        </ListGroup.Item>
                        <ListGroup.Item action style={{ backgroundColor: (nivel === "Universitario" ? "#bababa" : "white") }} onClick={() => nivel !== "Universitario" ? setNivel("Universitario") : setNivel("")} className="d-flex justify-content-between align-items-center category"> Universitario
                            <div className="d-flex justify-content-evenly" style={{ width: "50px" }} > <span style={{ backgroundColor: "lightgreen", color: "green" }} className="badge badge-primary badge-pill">{nivel === "Universitario" && classProfessorFilter.length}</span>
                                <span style={{ backgroundColor: "lightblue", color: "blue" }} className="badge badge-primary badge-pill">{nivel === "Universitario" && classUserFilter.length}</span> </div>
                        </ListGroup.Item>
                    </ListGroup>
                    <Form>
                        <h6 className="font-weight-bold mt-3">Grado:</h6>
                        <Form.Group className="mb-3">
                            <Row>
                                <Col sm={9} md={9} lg={9}>
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
                                <Col sm={3} md={3} lg={3} className="d-flex align-items-center mt-2">
                                    <div className="d-flex justify-content-evenly" style={{ width: "50px" }} >
                                        <span style={{ backgroundColor: "lightgreen", color: "green" }} className="badge badge-primary badge-pill">{grado && classProfessorFilter.length}</span>
                                        <span style={{ backgroundColor: "lightblue", color: "blue", marginLeft: "5px" }} className="badge badge-primary badge-pill">{grado && classUserFilter.length}</span>
                                    </div>
                                </Col>
                            </Row>
                        </Form.Group>
                    </Form>

                    {user.mail && city ?
                        <>
                            <ListGroup className="ml-3" >
                                <h5 className="font-weight-bold w-100 mt-2">Encuentra las clases de tu ciudad:</h5>
                                <ListGroup.Item action style={{ backgroundColor: (city.show ? "#bababa" : "white") }} onClick={handleCity} className="d-flex justify-content-between align-items-center category">  {city.name}
                                    <div className="d-flex justify-content-evenly" style={{ width: "50px" }} >
                                        <span style={{ backgroundColor: "lightgreen", color: "green" }} className="badge badge-primary badge-pill">{city.show && classProfessorFilter.length}</span>
                                        <span style={{ backgroundColor: "lightblue", color: "blue" }} className="badge badge-primary badge-pill">{city.show && classUserFilter.length}</span>
                                    </div>
                                </ListGroup.Item>

                            </ListGroup>
                        </>
                        : null}

                    <ListGroup className="py-3 ">
                        <Row>
                            <h5 className="font-weight-bold">Horarios</h5>

                            <Form className="brand d-flex justify-content-evenly p-0">
                                <Col sm={5} md={5} style={{ width: "40%" }}>
                                    <Form.Group className="mb-3">
                                        <h6 className="font-weight-bold">Desde:</h6>
                                        <Form.Control name="desde" value={horario.desde} type="time" onChange={handleChange} />
                                    </Form.Group>
                                </Col>
                                <Col sm={5} md={5} style={{ width: "40%" }}>
                                    <Form.Group className="">
                                        <h6 className="font-weight-bold">Hasta:</h6>
                                        <Form.Control name="hasta" value={horario.hasta} type="time" onChange={handleChange} />
                                    </Form.Group>
                                </Col>
                            </Form>
                            <div className="d-flex justify-content-evenly" style={{ width: "100px" }} >
                                <span style={{ backgroundColor: "lightgreen", color: "green" }} className="badge badge-primary badge-pill">{horario.desde && horario.hasta && classProfessorFilter.length}</span>
                                <span style={{ backgroundColor: "lightblue", color: "blue" }} className="badge badge-primary badge-pill">{horario.desde && horario.hasta && classUserFilter.length}</span>
                            </div>
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
                                <div className="d-flex justify-content-evenly" style={{ width: "50px" }} >
                                    <span style={{ backgroundColor: "lightgreen", color: "green" }} className="badge badge-primary badge-pill">{puntuacion.value === "5" && classProfessorFilter.length}</span>
                                    <span style={{ backgroundColor: "lightblue", color: "blue" }} className="badge badge-primary badge-pill">{puntuacion.value === "5" && classUserFilter.length}</span>
                                </div>
                            </ListGroup.Item >
                            <ListGroup.Item className="form-inline d-flex align-items-center justify-content-between py-2">
                                <Form.Label className="tick">
                                    <span>{star}{star}{star}{star}</span>
                                    <input onChange={handlePuntuacion} type="checkbox" name="puntuacion" value="4" checked={puntuacion.value === "4" && puntuacion.check ? true : false} /> <span className="check"></span>
                                </Form.Label>
                                <div className="d-flex justify-content-evenly" style={{ width: "50px" }} >
                                    <span style={{ backgroundColor: "lightgreen", color: "green" }} className="badge badge-primary badge-pill">{puntuacion.value === "4" && classProfessorFilter.length}</span>
                                    <span style={{ backgroundColor: "lightblue", color: "blue" }} className="badge badge-primary badge-pill">{puntuacion.value === "4" && classUserFilter.length}</span>
                                </div>
                            </ListGroup.Item >
                            <ListGroup.Item className="form-inline d-flex align-items-center justify-content-between py-2">
                                <Form.Label className="tick">
                                    <span>{star}{star}{star}</span>
                                    <input onChange={handlePuntuacion} type="checkbox" name="puntuacion" value="3" checked={puntuacion.value === "3" && puntuacion.check ? true : false} /> <span className="check"></span>
                                </Form.Label>
                                <div className="d-flex justify-content-evenly" style={{ width: "50px" }} >
                                    <span style={{ backgroundColor: "lightgreen", color: "green" }} className="badge badge-primary badge-pill">{puntuacion.value === "3" && classProfessorFilter.length}</span>
                                    <span style={{ backgroundColor: "lightblue", color: "blue" }} className="badge badge-primary badge-pill">{puntuacion.value === "3" && classUserFilter.length}</span>
                                </div>
                            </ListGroup.Item >
                            <ListGroup.Item className="form-inline d-flex align-items-center justify-content-between py-2">
                                <Form.Label className="tick">
                                    <span>{star}{star}</span>
                                    <input onChange={handlePuntuacion} type="checkbox" name="puntuacion" value="2" checked={puntuacion.value === "2" && puntuacion.check ? true : false} /> <span className="check"></span>
                                </Form.Label>
                                <div className="d-flex justify-content-evenly" style={{ width: "50px" }} >
                                    <span style={{ backgroundColor: "lightgreen", color: "green" }} className="badge badge-primary badge-pill">{puntuacion.value === "2" && classProfessorFilter.length}</span>
                                    <span style={{ backgroundColor: "lightblue", color: "blue" }} className="badge badge-primary badge-pill">{puntuacion.value === "2" && classUserFilter.length}</span>
                                </div>
                            </ListGroup.Item >
                            <ListGroup.Item className="form-inline d-flex align-items-center justify-content-between py-2">
                                <Form.Label className="tick">
                                    <span>{star}</span>
                                    <span className="far fa-star px-1 text-muted"></span>
                                    <input onChange={handlePuntuacion} type="checkbox" name="puntuacion" value="1" checked={puntuacion.value === "1" && puntuacion.check ? true : false} />
                                    <span className="check"></span>
                                </Form.Label>
                                <div className="d-flex justify-content-evenly" style={{ width: "50px" }} >
                                    <span style={{ backgroundColor: "lightgreen", color: "green" }} className="badge badge-primary badge-pill">{puntuacion.value === "1" && classProfessorFilter.length}</span>
                                    <span style={{ backgroundColor: "lightblue", color: "blue" }} className="badge badge-primary badge-pill">{puntuacion.value === "1" && classUserFilter.length}</span>
                                </div>
                            </ListGroup.Item >
                            <div className="d-flex justify-content-evenly mt-3" style={{ fontSize: "14px" }} >
                                <span style={{ backgroundColor: "lightgreen", color: "green" }} className="badge badge-primary badge-pill">* Professor</span>
                                <span style={{ backgroundColor: "lightblue", color: "blue" }} className="badge badge-primary badge-pill">* Student</span>
                            </div>
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
                        <Tab eventKey="classProfessor" title="Busca clases">
                            <ClassCards clasesFiltradas={classProfessorFilter && (nivel || grado || puntuacion.value || (horario.desde && horario.hasta) || city.show) ? classProfessorFilter : classProfessor} />
                        </Tab>
                        {user.role === 1 || user.role === 2 ? <Tab eventKey="classUser"
                            title="Buscar solicitudes de clases">

                            <Row className="d-flex justify-content-center mb-3">
                                <Col className="p-0" sm={5} md={5} >
                                    <Form.Control type="text" placeholder="Buscar clase..." value={search} onChange={handleChangeSearch} />
                                </Col >
                                <Col className="p-0" sm={1} md={1}>
                                    <Button variant='primary' onClick={() => vaYBuscaUser()}>{searchIcon}</Button>
                                </Col>
                            </Row>
                            <div style={{ overflowX: 'hidden', height: '100vh', width: '90%' }}>
                                <StudentClassCards clasesFiltradas={classUserFilter && (nivel || grado || puntuacion.value || (horario.desde && horario.hasta) || city.show) ? classUserFilter : classUser} />
                            </div>
                        </Tab> : null}
                    </Tabs>
                </Col>
            </Row>
        </div >
    )
}

const mapStateToProps = (state) => {
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