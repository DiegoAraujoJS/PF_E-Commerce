import React from 'react'
import CSS from 'csstype';
import ClassCard from '../classCard/ClassCard';
import { connect } from 'react-redux';
import axios from 'axios'
import {ButtonGroup, Button} from 'react-bootstrap'
import { User, Profesor, Class } from '../classCard/interfaces';

function ClassCards({ searchInput }) {

    const [clases, setClases] = React.useState([])

    React.useEffect(() => {
        async function fetchDataStart() {
            console.log(searchInput)
            const response: any = await axios.get(`http://localhost:3001/api/clases?busqueda=${searchInput}`)
            setClases(response) // [{},{}]
        }
        fetchDataStart()
    }, [])
    
    const classListContainer: CSS.Properties = {
        position: 'relative',
        height: '500px',
        width: '800px',
        top: '40px',
        overflowY: 'scroll',
        margin: 'auto',
        paddingLeft: '0px',
        listStyleType: 'none',
        border: '2px solid red'
    };

    return (
        <div className='container d-flex flex-column mt-3 justify-content-around'>
            {/* Botones de paginacion <ButtonGroup>
                <Button>Left</Button>
                <Button>Middle</Button>
                <Button>Right</Button>
            </ButtonGroup> */}
            <ul style={classListContainer}>
                {clases.map( (clase, i) => <li className="m-3" key={i}>
                    {console.log(clase)}
                    <ClassCard 
                    nombre={clase.nombre} 
                    descripcion={clase.descripcion} 
                    esPresencial={clase.esPresencial} 
                    grado={clase.grado} 
                    materia={clase.materia} 
                    nivel={clase.nivel} 
                    profesor={clase.profesor} 
                    puntuacion={clase.puntuacion} 
                    key={i}/>
                    </li>
                )}    
            </ul>
        </div>
    )
}

const connectStateToProps = (state) => {
    return {
        searchInput: state.searchInput
    }
}

export default connect(connectStateToProps)(ClassCards)
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