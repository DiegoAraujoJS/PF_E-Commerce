import React, { useState, useEffect } from 'react'
import { Alert, Button, Col, Row, Form } from 'react-bootstrap';
import StudentClassCard from '../classCard/StudentClassCard';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'

function StudentClassCards({ clasesFiltradas, dispatchInput }) {
    // const [search, setSearch] = React.useState('')
    const [classFilter, setClassFilter] = useState([])
    const [search, setSearch] = React.useState('')


    useEffect(() => {
        setClassFilter(clasesFiltradas)
    }, [clasesFiltradas])
    const handleChange = (e) => {
        setSearch(e.target.value)
    };
    // const handleChange = (e) => {
    //     setSearch(e.target.value)
    // };
    // async function vaYBusca() {
    //     const response: any = await axios.get(`http://localhost:3001/api/clases?busqueda=${search}`)
    //     dispatchInput(response.data)
    // }

    // const searchIcon = <FontAwesomeIcon icon={faSearch} className="ml-2 ml-2" />
    
    async function vaYBusca() {
        const response: any = await axios.get(`http://localhost:3001/api/clases/students?busqueda=${search}`)
        console.log(response.data)
        dispatchInput(response.data)
    }
    const searchIcon = <FontAwesomeIcon icon={faSearch}  className="ml-2 ml-2" />

    return (
        <div>
            <Row className="d-flex justify-content-center mb-3">
                                <Col className="p-0" sm={5} md={5} >
                                    <Form.Control type="text" placeholder="Buscar clase..." value={search} onChange={handleChange} />
                                </Col >
                                <Col className="p-0" sm={1} md={1}>
                                    <Button variant='primary' onClick={() => vaYBusca()}>{searchIcon}</Button>
                                </Col>
                            </Row>
            <Row className="d-flex justify-content-center">
                <Col className="p-0" sm={11} md={11}>
                    <ul>
                        {classFilter ? classFilter?.map((clase, i) => {
                            return (
                                <StudentClassCard
                                    id={clase?.id}
                                    nombre={clase?.nombre}
                                    descripcion={clase?.descripcion}
                                    esPresencial={clase?.esPresencial}
                                    grado={clase?.grado}
                                    materia={clase?.materia}
                                    nivel={clase?.nivel}
                                    profesor={clase?.profesor}
                                    puntuacion={clase?.puntuacion}
                                    date={clase?.date}
                                    precio={clase?.precio}
                                    key={i + 20}
                                />
                            );
                        })
                            : <Alert variant="secondary" className="text-center">
                                <h3>Realice una busqueda</h3>
                            </Alert>
                        }
                        {classFilter && classFilter.length === 0 ?
                            <Alert variant="info" className="text-center">
                                <h3>No hay clases disponibles</h3>
                            </Alert> : null}
                    </ul>
                </Col>
            </Row>

        </div>
    )
}

const dispatchFuncToProps = (dispatch) => {
    return {
        dispatchInput: function (payload) {
            dispatch({ type: 'SEARCH_INPUT', payload })
        }
    }
}

export default connect(null, dispatchFuncToProps)(StudentClassCards)



