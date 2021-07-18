import React, { useState, useEffect } from 'react'
import CSS from 'csstype';
import ClassCard from '../classCard/ClassCard';
import { Alert, Button, Col, Container, Dropdown, DropdownButton, Form, InputGroup, ListGroup, ListGroupItem, Pagination, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getAll } from '../../Actions/Actions';
import { Class } from '../../interfaces';

function ClassCards({ clases, getAll, clasesFiltradas, filtros }: any) {
    const [search, setSearch] = useState("")
    const [classFilter, setClassFilter] = useState([])
    const [classProp, setClassProp] = useState("")


    useEffect(() => {
        getAll()
    }, [])

    useEffect(() => {      
        setClassFilter(clases)
    }, [clases])

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
        setSearch(e.target.value)
    };

    useEffect(() => {
        if (clases && search) {
            if (classProp && typeof classProp === 'string') {
                let filtrados = clases.filter((clase:Class) => {
                    if(classProp === "nombre" && clase ){
                        return clase.nombre.toLowerCase().includes(search.toLowerCase())
                    }
                    else if(classProp === "profesor" && clase && clase.profesor){
                        return clase.profesor.name.toLowerCase().includes(search.toLowerCase())
                    }
                    else return null
                })
                setClassFilter(filtrados)

            } else {
                let filtrados = clases.filter(clase => {
                    if (clase && clase.nombre) return clase.nombre.toLowerCase().includes(search.toLowerCase())
                    else return null
                })
                setClassFilter(filtrados)
            }
        }
        else if (search === '') {
            setClassFilter(clases)
        }
    }, [search])

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
    }, [classFilter, clases])

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

        let dataLength = classFilter.length ? classFilter.length : clases.length;
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
            totalPages: (clasesFiltradas.length > 0 && filtros) ? Math.ceil(clasesFiltradas.length / displayRecipes) : !filtros ? Math.ceil(clases.length / displayRecipes) : 1,
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
        console.log(totalPages)
        console.log(pages)
        return [pages[currentClickedNumber - 3] ? points : null, pages[currentClickedNumber - 2], currentPage, pages[currentClickedNumber], pages[currentClickedNumber + 1] ? points : null];
    };

    return (
        <div className="container-fluid">

            <Row className="d-flex justify-content-center mb-3">
                <Col sm={3} md={3}>
                    <div>
                        <select className="form-select" onChange={(e: any) => setClassProp(e.target.value)}>
                            <option value="nombre" >Nombre de la clase</option>
                            <option value="profesor" >Nombre del Profesor</option>
                        </select>
                    </div>
                </Col>
                <Col sm={6} md={6} >
                    <Form.Control type="text" placeholder="Busca por el nombre de la clase o profesor" onChange={handleChange} />
                </Col >
            </Row>

            <Row  >
                <Col  >
                    <ul style={classListContainer}>
                        {dataFromPaginate && dataFromPaginate.length > 0 ?
                            dataFromPaginate.map((clase, i) => (
                                <ClassCard
                                    nombre={clase.nombre}
                                    descripcion={clase.descripcion}
                                    esPresencial={clase.esPresencial}
                                    grado={clase.grado}
                                    materia={clase.materia}
                                    nivel={clase.nivel}
                                    profesor={clase.profesor}
                                    puntuacion={clase.puntuacion}
                                    date={clase.date}
                                    key={i + 10}
                                />
                            ))

                            : classFilter ? classFilter.map((clase, i) => {
                                if (i < 2) {
                                    return (
                                        <ClassCard
                                            nombre={clase.nombre}
                                            descripcion={clase.descripcion}
                                            esPresencial={clase.esPresencial}
                                            grado={clase.grado}
                                            materia={clase.materia}
                                            nivel={clase.nivel}
                                            profesor={clase.profesor}
                                            puntuacion={clase.puntuacion}
                                            date={clase.date}
                                            key={i + 20}
                                        />
                                    );
                                } else {
                                    return null;
                                }
                            })
                                : clases ? clases.map((clase, i) => {
                                    if (i < 2) {
                                        return (
                                            <ClassCard
                                                nombre={clase.nombre}
                                                descripcion={clase.descripcion}
                                                esPresencial={clase.esPresencial}
                                                grado={clase.grado}
                                                materia={clase.materia}
                                                nivel={clase.nivel}
                                                profesor={clase.profesor}
                                                puntuacion={clase.puntuacion}
                                                date={clase.date}
                                                key={i + 30}
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

export default connect(mapStateToProps, mapDispatchToProps)(ClassCards)


