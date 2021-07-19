import React, { useState, useEffect } from 'react'
import CSS from 'csstype';
import ClassCard from '../classCard/ClassCard';
import { Alert, Button, Col, Container, Dropdown, DropdownButton, Form, InputGroup, ListGroup, ListGroupItem, Pagination, Row } from 'react-bootstrap';
import { Class } from '../../../../interfaces';
import axios from 'axios'
import { connect } from 'react-redux';




function ClassCards({ clasesFiltradas, dispatchInput }) {
    const [searchInput, setSearchInput] = React.useState('')
    const [classFilter, setClassFilter] = useState([])
    const [classProp, setClassProp] = useState("")


    useEffect(() => {
        setClassFilter(clasesFiltradas)
    }, [clasesFiltradas])


    const classListContainer: CSS.Properties = {
        // position: 'relative',
        // overflowY: 'auto',
        margin: 'auto',
        paddingLeft: '0px',
        listStyleType: 'none',
    };

    const handleChange = (e) => {
        setSearchInput(e.target.value)
    };

    // useEffect(() => {
    //     if (classFilter && search) {
    //         if (classProp && typeof classProp === 'string') {
    //             let filtrados = classFilter.filter((clase: Class) => {
    //                 if (classProp === "nombre" && clase) {
    //                     return clase.nombre.toLowerCase().includes(search.toLowerCase())
    //                 }
    //                 else if (classProp === "profesor" && clase && clase.profesor) {
    //                     return clase.profesor.name.toLowerCase().includes(search.toLowerCase())
    //                 }
    //                 else return null
    //             })
    //             setClassFilter(filtrados)

    //         } else {
    //             let filtrados = classFilter.filter(clase => {
    //                 if (clase && clase.nombre) return clase.nombre.toLowerCase().includes(search.toLowerCase())
    //                 else return null
    //             })
    //             setClassFilter(filtrados)
    //         }
    //     }
    //     else if (search === '') {
    //         setClassFilter(classFilter)
    //     }
    // }, [search])

    const [page, setPage] = useState({
        totalPages: null,
        dataStartingIndex: null,
        dataLastIndex: 0,
        currentClickedNumber: 1,
        pageData: null,
        clickedOnNumber: null,
        currentClickedPage: null,
    })
    const [dataFromPaginate, setDataFromPaginate] = useState(null);

    var { currentClickedNumber, pageData, totalPages } = page;

    useEffect(() => {
        determineNumberOfPages();
    }, [classFilter])

    useEffect(
        () => {
            const { currentClickedNumber, pageData } = page;
            if (pageData) {
                setDataFromPaginate(pageData[currentClickedNumber]);
            }
        },
        [page.currentClickedNumber, pageData,]
    );

    const determineNumberOfPages = () => {
        let paginatedDataObject = {};

        let dataLength = classFilter.length;
        let chunkArray = [];
        let displayRecipes = 3

        for (let index = 0; index < dataLength; index += displayRecipes) {
            let end = index + displayRecipes
            let newChunk = classFilter.slice(index, end);
            chunkArray.push(newChunk);
        }

        chunkArray.forEach((chunk, i) => {
            paginatedDataObject[i + 1] = chunk;
        });

        setPage({
            ...page,
            totalPages: (classFilter.length > 0) ? Math.ceil(classFilter.length / displayRecipes) : 0,
            dataStartingIndex: 1,
            pageData: paginatedDataObject,
            clickedOnNumber: 1
        });
    };

    const setCurrentClickedNumber = (e: any) => {
        const { target } = e;
        setPage({
            ...page,
            currentClickedNumber: parseInt(target.innerText)
        });
    };

    const moveToLastPage = () => {
        setPage({
            ...page,
            currentClickedNumber: page.totalPages,
            currentClickedPage: page.totalPages
        });
    };

    const moveToFirstPage = () => {
        setPage({
            ...page,
            currentClickedNumber: 1,
            currentClickedPage: 1
        });
    };

    const moveOnePageForward = () => {
        const { dataStartingIndex, totalPages, currentClickedNumber } = page;

        if (dataStartingIndex) {
            setPage({
                ...page,
                dataStartingIndex: null,
                currentClickedNumber: 2
            });
        } else {
            setPage({
                ...page,
                currentClickedNumber:
                    currentClickedNumber + 1 > totalPages
                        ? totalPages
                        : currentClickedNumber + 1
            });
        }
    };

    const moveOnePageBackward = () => {
        setPage({
            ...page,
            currentClickedNumber:
                page.currentClickedNumber - 1 < 1
                    ? 1
                    : page.currentClickedNumber - 1
        });
    };

    const pageNumberRender = () => {
        const { totalPages, currentClickedNumber } = page;
        let pages = [];

        for (let i = 1; i < totalPages + 1; i++) {
            pages.push(
                <Pagination.Item onClick={(e) => {
                    setCurrentClickedNumber(e);
                }}
                    key={i + 50}
                >{i}
                </Pagination.Item>
            );
        }
        let currentPage = (<Pagination.Item active activeLabel=""
            onClick={(e: any) => { setCurrentClickedNumber(e); }}
            key={currentClickedNumber}>{currentClickedNumber} </Pagination.Item>)

        let points = <Pagination.Item> ... </Pagination.Item>
        return [pages[currentClickedNumber - 3] ? points : null, pages[currentClickedNumber - 2], currentPage, pages[currentClickedNumber], pages[currentClickedNumber + 1] ? points : null];
    };


    async function vaYBusca() {
        const response: any = await axios.get(`http://localhost:3001/api/clases?busqueda=${searchInput}`)
        dispatchInput(response.data)
    }

    return (
        <div className="container-fluid">

            <Row className="d-flex justify-content-center mb-3">
                <Col sm={6} md={6} >
                    <Form.Control type="text" placeholder="Matematica en Buenos Aires..." value={searchInput} onChange={handleChange}  />
                </Col >
                <Col sm={2} md={2}>
                        <Button variant='primary' onClick={() => vaYBusca()}>Buscar</Button>                  
                </Col>
            </Row>
            <Row>
                    <Alert variant="secondary" className="text-center p-0 d-flex justify-content-center">
                         <p style={{fontWeight:600}} className="m-0 mt-2 mb-2">Busca por materia/ciudad/nivel/grado, puedes usar al mismo tiempo!</p>
                    </Alert>
            </Row>
            <Row  >
                <Col  >
                    <ul style={classListContainer}>
                        {dataFromPaginate && dataFromPaginate.length > 0 ?
                            dataFromPaginate.map((clase, i) => (
                                // interface Class {
                                //     id?: number;
                                //     nombre: string;
                                //     descripcion: string;
                                //     puntuacion: number;
                                //     materia: string;
                                //     grado: string;
                                //     nivel: string;
                                //     esPresencial: boolean;
                                //     profesor: Profesor;
                                //     date: {year: number, month: number, day: number, time: Time}
                                // }
                                <ClassCard
                                    id={clase.id}
                                    nombre={clase.nombre}
                                    descripcion={clase.descripcion}
                                    esPresencial={clase.esPresencial}
                                    grado={clase.grado}
                                    materia={clase.materia}
                                    nivel={clase.nivel}
                                    profesor={clase.profesor}
                                    puntuacion={clase.puntuacion}
                                    date={clase.date}
                                    precio={clase.precio}
                                    key={i + 10}
                                />
                            ))

                            : classFilter ? classFilter.map((clase, i) => {
                                if (i < 2) {
                                    return (
                                        <ClassCard
                                            id={clase.id}
                                            nombre={clase.nombre}
                                            descripcion={clase.descripcion}
                                            esPresencial={clase.esPresencial}
                                            grado={clase.grado}
                                            materia={clase.materia}
                                            nivel={clase.nivel}
                                            profesor={clase.profesor}
                                            puntuacion={clase.puntuacion}
                                            date={clase.date}
                                            precio={clase.precio}
                                            key={i + 20}
                                        />
                                    );
                                } else {
                                    return null;
                                }
                            })
                                : <Alert variant="info" className="text-center">
                                    <h3>No hay clases disponibles</h3>
                                </Alert>
                        }
                        {classFilter && classFilter.length === 0 ?
                            <Alert variant="info" className="text-center">
                                <h3>No hay clases disponibles</h3>
                            </Alert> : null}
                    </ul>
                </Col>
            </Row>
            <Row className="d-flex flex-row justify-content-center mt-3">
                <Col  >
                    {totalPages > 0 ?
                        <Pagination className="d-flex flex-row justify-content-center">
                            <div className="d-flex flex-row">
                                <div className="d-flex flex-row">
                                    {currentClickedNumber > 1 ? (
                                        <div className="d-flex flex-row">
                                            <span>
                                                <Pagination.Item
                                                    onClick={() => moveToFirstPage()}>
                                                    &lt;&lt;
                                                </Pagination.Item>
                                            </span>
                                            <span>
                                                <Pagination.Item onClick={() => moveOnePageBackward()}>
                                                    &lt;
                                                </Pagination.Item>
                                            </span>
                                        </div>
                                    ) : (
                                        <div />
                                    )}
                                </div>
                                <div className="d-flex flex-row">{pageNumberRender()}</div>
                                <div className="d-flex flex-row">
                                    {currentClickedNumber !== totalPages ? (
                                        <div className="d-flex flex-row">
                                            <span>
                                                <Pagination.Item onClick={() => moveOnePageForward()}
                                                > &gt;
                                                </Pagination.Item>
                                            </span>
                                            <span>
                                                <Pagination.Item onClick={() => moveToLastPage()}>
                                                    &gt;&gt;
                                                </Pagination.Item>
                                            </span>
                                        </div>
                                    ) : (
                                        <div></div>
                                    )}
                                </div>
                            </div>
                        </Pagination>
                        : null}
                </Col>
            </Row>
        </div>
    )
}


const dispatchFuncToProps = (dispatch) => {
    return {
        dispatchInput: function (payload) {
            dispatch({type: 'SEARCH_INPUT', payload})
        }
    }
}

export default connect(null, dispatchFuncToProps)(ClassCards)



