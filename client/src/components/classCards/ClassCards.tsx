import React, { useState, useEffect } from 'react'
import CSS from 'csstype';
import ClassCard from '../classCard/ClassCard';
import { store } from '../../Store/store';
import { Button, Col, Container, Dropdown, DropdownButton, Form, InputGroup, ListGroup, ListGroupItem, Pagination, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getAll } from '../../Actions/Actions';


function ClassCards({ clases, getAll }: any) {
    const [search, setSearch] = useState("")
    const [classFilter, setClassFilter] = useState([])
    const [classProp, setClassProp] = useState("")
    const [show, setShow] = useState([])

    React.useEffect(() => {
        // async function fetchDataStart() {
        //     const searchInput = store.getState().searchInput
        //     setClases(searchInput) // [{},{}]
        // }
        // fetchDataStart()
        getAll()
        setShow(clases)
    }, [])

    const classListContainer: CSS.Properties = {
        // position: 'relative',
        height: '500px',
        width: '800px',
        top: '40px',
        overflowY: 'scroll',
        margin: 'auto',
        paddingLeft: '0px',
        listStyleType: 'none',
        border: '2px solid red'
    };

    const handleChange = (e) => {
        setSearch(e.target.value)
    };


    useEffect(() => {
        if (clases && search) {
            if (classProp && typeof classProp === 'string') {
                let filtrados = clases.filter(clase => {
                    if(clase && clase[classProp])  return clase[classProp].toLowerCase().includes(search.toLowerCase())
                    else return null
                })
                setClassFilter(filtrados)

            } else {
                let filtrados = clases.filter(clase =>{ 
                    if(clase && clase.nombre)  return clase.nombre.toLowerCase().includes(search.toLowerCase())
                    else return null
                })
                setClassFilter(filtrados)
            }
        }
        else if(search === ''){
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
    }, [])

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
        let displayRecipes = 10

        for (let index = 0; index < dataLength; index += displayRecipes) {
            let end = index + displayRecipes
            let newChunk = clases.slice(index, end);
            chunkArray.push(newChunk);
        }

        chunkArray.forEach((chunk, i) => {
            paginatedDataObject[i + 1] = chunk;
        });

        setPage({
            ...page,
            totalPages: clases ? Math.ceil(clases.length / displayRecipes) : 0,
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
                    key={i}
                >{i}
                </Pagination.Item>
            );
        }
        let currentPage = (<Pagination.Item onClick={(e: any) => { setCurrentClickedNumber(e); }}
            key={currentClickedNumber}>{currentClickedNumber} </Pagination.Item>)

        let points = <Pagination.Item> ... </Pagination.Item>

        return [pages[currentClickedNumber - 3] ? points : null, pages[currentClickedNumber - 2], currentPage, pages[currentClickedNumber], pages[currentClickedNumber + 1] ? points : null];
    };


    return (
        <Container className='container d-flex flex-column mt-3 justify-content-around' >

            <Row className="d-flex justify-content-center mb-3">
                <Col sm={2} md={2}>
                    <div>
                        <select className="form-select" onChange={(e:any) => setClassProp(e.target.value)}>
                            <option value="" >Filtros</option>
                            <option value="nombre" >Nombre</option>
                            <option value="profesor" >Profesor</option>
                            <option value="materia" >Materia</option>
                        </select>
                    </div>
                </Col>
                <Col sm={8} md={8} >
                    <Form.Control type="text" placeholder="Busca por el nombre de la clase" onChange={handleChange} />
                </Col >
            </Row>
            <Row>
                <Col>
                    <ul style={classListContainer}>
                        {dataFromPaginate ?
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
                                    key={i}
                                />
                            ))
                            : classFilter && classFilter.length > 0? classFilter.map((clase, i) => {
                                if (i < 10) {
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
                                            key={i}
                                        />
                                    );
                                } else {
                                    return null;
                                }
                            }) : clases && clases.length > 0 && search.length === 0 ? clases.map((clase, i) => <li className="m-3" key={i + 10}>
                                <ClassCard
                                    nombre={clase.nombre}
                                    descripcion={clase.descripcion}
                                    esPresencial={clase.esPresencial}
                                    grado={clase.grado}
                                    materia={clase.materia}
                                    nivel={clase.nivel}
                                    profesor={clase.profesor}
                                    puntuacion={clase.puntuacion}
                                    key={i + 11} />
                            </li>
                            ) : <h2>No hay clases disponibles</h2>
                        }
                    </ul>
                </Col>
            </Row>
            <Row className="d-flex justify-content-center mt-3">
                <Col>
                    {totalPages > 0 ?
                        <Pagination className="d-flex justify-content-center">
                            <div >
                                <div>
                                    {currentClickedNumber > 1 ? (
                                        <div>
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
                                <div>{pageNumberRender()}</div>
                                <div>
                                    {currentClickedNumber !== totalPages ? (
                                        <div>
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
            <Row className="d-flex justify-content-center">
                <Col className="d-flex justify-content-center mb-3">
                    <h3>Total Pages: {totalPages}</h3>
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

export default connect(mapStateToProps, mapDispatchToProps)(ClassCards)


// const connectStateToProps = (state) => {
//     return {
//         searchInput: state.searchInput
//     }
// }

// export default connect(connectStateToProps)(ClassCards)
// @Column
//     nombre!: string;

//     @Column
//     puntuacion!: number;

//     @Column ({allowNull: false})
//     grado!: string;

//     @Column
//     nivel!: string;

//     @Column ({allowNull: false})
//     materia!: string;

//     @Column
//     descripcion!: string;

//     @Column 
//     ciudad!: string

//     @ForeignKey(() => Profesor)
//     @Column
//     Profesor_mail!: string

// clase
    // descripcion
    // titulo
    // puntuacion
    // materia
    // grado
    // nivel
    // presencial o virtual


// profesor
    // nombre
    // imagen
    // descripcion
    // ciudad

    // [clase, profesor]