import React, { useState, useEffect } from 'react'
import { Container, Row, Col, ListGroup } from 'react-bootstrap'
import ClassCards from '../classCards/ClassCards'
import "./ClassConteiner.css"
import { connect } from 'react-redux';
import { getAll } from '../../Actions/Actions';
import axios from 'axios'


function ClassContainer({ clases, getAll }) {
    const [show, setShow] = useState([])
    const [classFilter, setClassFilter] = useState([])
    const [nivel, setNivel] = useState("")
    const [numChexbox, setNumChexbox] = useState({
        value: "",
        check: false
    })

    React.useEffect(() => {
        getAll()
    }, [])


    useEffect(() => {
        async function fetchData() {
            try {
                if (clases && nivel && typeof nivel === 'string') {
                    setNumChexbox({
                        value: "",
                        check: false
                    })
                    const response: any = await axios.get(`http://localhost:3001/api/clases/nivel/${nivel}`)
                    if (response) return setClassFilter(response.data)
                }
                else if (nivel === "") {
                    setNumChexbox({
                        value: "",
                        check: false
                    })
                    setClassFilter(clases)
                }
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchData();

    }, [nivel])


    const handleChange = async (e) => {
        try {
            if (e.target.name === "puntuacion") {
                let puntuacion = e.target.value
                setNivel("")
                if (e.target.checked === false) {
                    setNumChexbox({
                        value: "",
                        check: false
                    })

                    setNivel("")
                    setNumChexbox({
                        value: puntuacion,
                        check: false
                    })
                    setClassFilter(clases)
                }
                else {
                    setNumChexbox({
                        value: puntuacion,
                        check: true
                    })
                    const response: any = await axios.get(`http://localhost:3001/api/clases/puntuacion/${puntuacion}`)
                    console.log(response)
                    if (response) return setClassFilter(response.data)
                }
            }
        }
        catch (err) {
            console.log(err)
        }
    };


    console.log(classFilter)

    return (
        <Container className="container-fluid form m-0">
            <Row>
                <Col sm={4} md={4}>
                    <h5 className="font-weight-bold">Categorias</h5>
                    <ListGroup>
                        <ListGroup.Item action onClick={() => nivel !== "Primario" ? setNivel("Primario") : setNivel("")} className="d-flex justify-content-between align-items-center category"> Primario <span className="badge badge-primary badge-pill">328</span> </ListGroup.Item>
                        <ListGroup.Item action onClick={() => nivel !== "Secundario" ? setNivel("Secundario") : setNivel("")} className="d-flex justify-content-between align-items-center category"> Secundario <span className="badge badge-primary badge-pill">112</span> </ListGroup.Item>
                        <ListGroup.Item action onClick={() => nivel !== "Terciario" ? setNivel("Terciario") : setNivel("")} className="d-flex justify-content-between align-items-center category"> Terciario <span className="badge badge-primary badge-pill">32</span> </ListGroup.Item>
                        <ListGroup.Item action onClick={() => nivel !== "Universitario" ? setNivel("Universitario") : setNivel("")} className="d-flex justify-content-between align-items-center category"> Universitario <span className="badge badge-primary badge-pill">48</span> </ListGroup.Item>
                    </ListGroup>
                    <div className="py-3">
                        <h5 className="font-weight-bold"> Edad</h5>
                        <form className="brand">
                            <div className="form-inline d-flex align-items-center py-1">
                                <label className="tick">6-9<input type="checkbox" />
                                    <span className="check"></span>
                                </label>
                            </div>
                            <div className="form-inline d-flex align-items-center py-1">
                                <label className="tick">9-12 <input type="checkbox" />
                                    <span className="check"></span>
                                </label>
                            </div>
                            <div className="form-inline d-flex align-items-center py-1">
                                <label className="tick">12-15 <input type="checkbox" />
                                    <span className="check"></span>
                                </label>
                            </div>
                            <div className="form-inline d-flex align-items-center py-1">
                                <label className="tick">15-17 <input type="checkbox" />
                                    <span className="check"></span>
                                </label>
                            </div>
                            <div className="form-inline d-flex align-items-center py-1">
                                <label className="tick">18+ <input type="checkbox" />
                                    <span className="check"></span>
                                </label> </div>
                        </form>
                    </div>
                    <div className="py-3">
                        <h5 className="font-weight-bold">Calificación</h5>
                        <form className="rating" >
                            <div className="form-inline d-flex align-items-center py-2">
                                <label className="tick">
                                    <span className="fas fa-star">🌟</span> <span className="fas fa-star">🌟</span> <span className="fas fa-star">🌟</span> <span className="fas fa-star">🌟</span> <span className="fas fa-star">🌟</span>
                                    <input onChange={handleChange} type="checkbox" name="puntuacion" value="5" checked={numChexbox.value === "5" && numChexbox.check ? true : false} />
                                    <span className="check"></span>
                                </label> </div>
                            <div className="form-inline d-flex align-items-center py-2">
                                <label className="tick">
                                    <span className="fas fa-star">🌟</span><span className="fas fa-star">🌟</span> <span className="fas fa-star">🌟</span> <span className="fas fa-star">🌟</span> <span className="far fa-star px-1 text-muted"></span>
                                    <input onChange={handleChange} type="checkbox" name="puntuacion" value="4" checked={numChexbox.value === "4" && numChexbox.check ? true : false} /> <span className="check"></span>
                                </label> </div>
                            <div className="form-inline d-flex align-items-center py-2">
                                <label className="tick"><span className="fas fa-star">🌟</span>
                                    <span className="fas fa-star">🌟</span> <span className="fas fa-star">🌟</span> <span className="far fa-star px-1 text-muted"></span> <span className="far fa-star px-1 text-muted"></span>
                                    <input onChange={handleChange} type="checkbox" name="puntuacion" value="3" checked={numChexbox.value === "3" && numChexbox.check ? true : false} /> <span className="check"></span>
                                </label>
                            </div>
                            <div className="form-inline d-flex align-items-center py-2">
                                <label className="tick"><span className="fas fa-star">🌟</span> <span className="fas fa-star">🌟</span> <span className="far fa-star px-1 text-muted"></span> <span className="far fa-star px-1 text-muted"></span> <span className="far fa-star px-1 text-muted"></span>
                                    <input onChange={handleChange} type="checkbox" name="puntuacion" value="2" checked={numChexbox.value === "2" && numChexbox.check ? true : false} /> <span className="check"></span>
                                </label>
                            </div>
                            <div className="form-inline d-flex align-items-center py-2">
                                <label className="tick">
                                    <span className="fas fa-star">🌟</span> <span className="far fa-star px-1 text-muted"></span> <span className="far fa-star px-1 text-muted"></span> <span className="far fa-star px-1 text-muted"></span>
                                    <span className="far fa-star px-1 text-muted"></span>
                                    <input onChange={handleChange} type="checkbox" name="puntuacion" value="1" checked={numChexbox.value === "1" && numChexbox.check ? true : false} />
                                    <span className="check"></span>
                                </label>
                            </div>
                        </form>
                    </div>
                </Col>
                <Col sm={8} md={8}>
                    {/* <SearchBar /> */}
                    <ClassCards clasesFiltradas={classFilter ? classFilter : clases} />

                </Col>
            </Row>
        </Container>
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