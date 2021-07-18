import React, { useState, useEffect } from 'react'
import { Container, Row, Col, ListGroup, Form, Button } from 'react-bootstrap'
import ClassCards from '../classCards/ClassCards'
import "./ClassConteiner.css"
import { connect } from 'react-redux';
import { getAll } from '../../Actions/Actions';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Class } from '../../interfaces';
import getCookieValue from '../../cookieParser';


const star = <FontAwesomeIcon icon={faStar} style={{ color: "#ffc107" }} />

type Props = {
    clases: Class[],
    getAll: () => any
}
const ClassContainer: React.FC<Props> = ({ clases, getAll }) => {
    const [classFilter, setClassFilter] = useState([])
    const [nivel, setNivel] = useState("")
    const [size, setSize] = useState({ name: "", length: 0 })
    const [grado, setGrado] = useState("")
    const [numChexbox, setNumChexbox] = useState({ value: "", check: false })
    const [horario, setHorario] = useState({ desde: "", hasta: "" })
    const grados = [
        "Primer grado", "Segundo grado", "Tercer grado", "Cuarto grado", "Quinto grado", "Sexto grado"
    ]
    const [city, setCity] = useState({ name: "", show: false, length: 0, })

    let [user, setUser] = useState<{ name: string, lastName: string, role: number, mail: string } | undefined>({ name: '', lastName: '', role: null, mail: '' })

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

    useEffect(() => {
        getAll()
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
            if (clases && horario.desde && horario.hasta) {
                let filtrados = clases.filter(clase => {
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
                setClassFilter(filtrados)
                setNivel(""); setGrado(""); setNumChexbox({ value: "", check: false }); setCity({ ...city, show: false, });
            }
        }
        else if (horario.desde === "" && horario.hasta === "") {
            setClassFilter(clases)
        }
    }, [horario])

    useEffect(() => {
        if (clases && nivel && typeof nivel === 'string') {

            let filtrados: Class[] = clases.filter((clase: Class) => {
                if (clase && clase.nivel) {
                    if (clase.nivel === nivel) return clase
                    else return null
                }
                else return null
            })
            setClassFilter(filtrados)
            setSize({ name: nivel, length: filtrados.length })
            setGrado(""); setNumChexbox({ value: "", check: false }); setHorario({ desde: "", hasta: "" }); setCity({ ...city, show: false, });
        }
        else if (nivel === "") {
            setNumChexbox({ value: "", check: false })
            setClassFilter(clases)
        }
    }, [nivel])

    useEffect(() => {
        if (clases && grado && typeof grado === 'string') {

            let filtrados: Class[] = clases.filter((clase: Class) => {
                if (clase && clase.grado) {
                    if (clase.grado === grado) return clase
                    else return null
                }
                else return null
            })
            setClassFilter(filtrados);
            setSize({ name: "grado", length: filtrados.length });
            setNivel(""); setNumChexbox({ value: "", check: false }); setHorario({ desde: "", hasta: "" }); setCity({ ...city, show: false, });
        }
        else if (grado === ""){ 
            setClassFilter(clases) 
        }
    }, [grado])

    const handleChangeChexbox = async (e) => {
        if (e.target.name === "puntuacion") {
            let puntuacion = e.target.value
            if (e.target.checked === false) {
                setNumChexbox({ value: "", check: false })
                setClassFilter(clases)
            }
            else {
                setNumChexbox({ value: puntuacion, check: true })

                let filtrados: Class[] = clases.filter((clase: Class) => {
                    if (clase && clase.puntuacion) {
                        if (clase.puntuacion.toString() === e.target.value || (clase.puntuacion > Number(e.target.value) - 1 && clase.puntuacion <= e.target.value)) return clase
                        else return null
                    }
                    else return null
                })
                setClassFilter(filtrados.sort(function (a, b) {
                    if (a.puntuacion < b.puntuacion) { return 1; }
                    if (a.puntuacion > b.puntuacion) { return -1; }
                    return 0;
                }))
                setSize({ name: "puntuacion", length: filtrados.length })
                setNivel(""); setGrado(""); setHorario({ desde: "", hasta: "" });  setCity({ ...city, show: false, });
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

    const handleCity = () => {
        if (user.mail && city.name) {

            if (city.show === false) {
                let filtrados: Class[] = clases.filter((clase: Class) => {
                    if (clase && clase.profesor.city) {
                        if (clase.profesor.city === city.name) return clase
                        else return null
                    }
                    else return null
                })
                setCity({ ...city, show: true, length: filtrados.length })
                setClassFilter(filtrados)
                setNivel(""); setGrado(""); setNumChexbox({ value: "", check: false }); setHorario({ desde: "", hasta: "" });}
            else {
                setCity({ ...city, show: false, })
                setClassFilter(clases)
            }
        }
    }

    // const reset = (prop) => {
    //     if(prop !== "nivel") {setNivel("")}
    //     if(prop !== "grado") {setGrado("")}
    //     if(prop !== "puntuacion")  {setNumChexbox({
    //         value: "",
    //         check: false
    //     })}
    //     if(prop !== "horario"){setHorario({
    //         desde: "",
    //         hasta: ""
    //     })}
    //     if(prop !== "city") {setCity({ ...city, show: false, })}
    // }
    // useEffect(() => {
    //     let filtrados = clases.filter(clase => {
    //         if (clase) {
    //                 let desde = horario.desde + ":00"
    //                 let hasta = horario.hasta + ":00"
    //                 let time = clase.date.time

    //                 const search_desde: string = desde.substring(0, 2) + desde.substring(3, 5) + desde.substring(6, 8)
    //                 const search_hasta: string = hasta.substring(0, 2) + hasta.substring(3, 5) + hasta.substring(6, 8)
    //                 const clase_desde: string = time && time[0].substring(0, 2) + time[0].substring(3, 5) + time[0].substring(6, 8)
    //                 const clase_hasta: string = time && time[1].substring(0, 2) + time[1].substring(3, 5) + time[1].substring(6, 8)

    //                 if ((clase_desde && clase_hasta ? (clase_desde >= search_desde && clase_desde < search_hasta && clase_hasta <= search_hasta && clase_hasta > search_desde) : true) &&
    //                     (clase.nivel === (nivel ? nivel : clase.nivel)) && (clase.grado === (grado ? grado : clase.grado)) &&
    //                     (clase.puntuacion.toString() === (numChexbox.value ? numChexbox.value : clase.puntuacion)) &&
    //                     (clase.profesor.city === (city.show && city.name ? city.name : clase.profesor.city))){ return clase }
    //                 else return null
    //             }
    //             else return null
    //         })
    //     console.log(filtrados)
    //     setClassFilter(filtrados)
    // }, [horario, nivel, grado, numChexbox.value, city.show])

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
                        <h5 className="font-weight-bold">Horarios</h5>
                        <Form className="brand">
                            <Form.Group className="mb-3">
                                <h6 className="font-weight-bold">Desde:</h6>
                                <Form.Control name="desde" value={horario.desde} type="time" onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="">
                                <h6 className="font-weight-bold">Hasta:</h6>
                                <Form.Control name="hasta" value={horario.hasta} type="time" onChange={handleChange} />
                            </Form.Group>
                        </Form>
                        <span style={{ backgroundColor: "lightgreen", color: "green" }} className="badge badge-primary badge-pill">{(horario.desde && horario.hasta && size.name === "horario") && size.length}</span>
                    </ListGroup>

                    <ListGroup className="py-3">
                        <h5 className="font-weight-bold">Calificación</h5>
                        <Form className="rating" >
                            <ListGroup.Item className="form-inline d-flex align-items-center justify-content-between py-2">
                                <Form.Label className="tick">
                                    <span>{star}{star}{star}{star}{star}</span>
                                    <input onChange={handleChangeChexbox} type="checkbox" name="puntuacion" value="5" checked={numChexbox.value === "5" && numChexbox.check ? true : false} />
                                    <span className="check"></span>
                                </Form.Label>
                                <span style={{ backgroundColor: "lightgreen", color: "green" }} className="badge badge-primary badge-pill">{(numChexbox.value === "5" && size.name === "puntuacion") && size.length}</span>
                            </ListGroup.Item >
                            <ListGroup.Item className="form-inline d-flex align-items-center justify-content-between py-2">
                                <Form.Label className="tick">
                                    <span>{star}{star}{star}{star}</span>
                                    <input onChange={handleChangeChexbox} type="checkbox" name="puntuacion" value="4" checked={numChexbox.value === "4" && numChexbox.check ? true : false} /> <span className="check"></span>
                                </Form.Label>
                                <span style={{ backgroundColor: "lightgreen", color: "green" }} className="badge badge-primary badge-pill">{(numChexbox.value === "4" && size.name === "puntuacion") && size.length}</span>
                            </ListGroup.Item >
                            <ListGroup.Item className="form-inline d-flex align-items-center justify-content-between py-2">
                                <Form.Label className="tick">
                                    <span>{star}{star}{star}</span>
                                    <input onChange={handleChangeChexbox} type="checkbox" name="puntuacion" value="3" checked={numChexbox.value === "3" && numChexbox.check ? true : false} /> <span className="check"></span>
                                </Form.Label>
                                <span style={{ backgroundColor: "lightgreen", color: "green" }} className="badge badge-primary badge-pill">{(numChexbox.value === "3" && size.name === "puntuacion") && size.length}</span>
                            </ListGroup.Item >
                            <ListGroup.Item className="form-inline d-flex align-items-center justify-content-between py-2">
                                <Form.Label className="tick">
                                    <span>{star}{star}</span>
                                    <input onChange={handleChangeChexbox} type="checkbox" name="puntuacion" value="2" checked={numChexbox.value === "2" && numChexbox.check ? true : false} /> <span className="check"></span>
                                </Form.Label>
                                <span style={{ backgroundColor: "lightgreen", color: "green" }} className="badge badge-primary badge-pill">{(numChexbox.value === "2" && size.name === "puntuacion") && size.length}</span>
                            </ListGroup.Item >
                            <ListGroup.Item className="form-inline d-flex align-items-center justify-content-between py-2">
                                <Form.Label className="tick">
                                    <span>{star}</span>
                                    <span className="far fa-star px-1 text-muted"></span>
                                    <input onChange={handleChangeChexbox} type="checkbox" name="puntuacion" value="1" checked={numChexbox.value === "1" && numChexbox.check ? true : false} />
                                    <span className="check"></span>
                                </Form.Label>
                                <span style={{ backgroundColor: "lightgreen", color: "green" }} className="badge badge-primary badge-pill">{(numChexbox.value === "1" && size.name === "puntuacion") && size.length}</span>
                            </ListGroup.Item >
                        </Form>


                    </ListGroup>

                </Col>
                <Col sm={12} md={7} lg={9}>
                    <ClassCards className="h-100" clasesFiltradas={classFilter ? classFilter : clases} 
                    filtros={(nivel || grado || (horario.desde && horario.hasta) || numChexbox.value || city.show)}
                    />
                </Col>
            </Row>
        </div >
    )
}

const mapStateToProps = (state) => {
    return {
        clases: state.clases
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAll: () => dispatch(getAll())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassContainer)