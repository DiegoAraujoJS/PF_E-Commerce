import React from 'react'
import CSS from 'csstype';
import ClassCard from '../classCard/ClassCard';
import axios from 'axios'
import {ButtonGroup, Button} from 'react-bootstrap'
import { User, Profesor, Class } from '../classCard/interfaces';

export default function ClassCards(props) {

    const [clases, setClases] = React.useState([])

    React.useEffect(() => {
        async function fetchDataStart() {
            const response = await axios.get(`http://localhost:3001/api/clases?searchQuery=${props.searchQuery}`)
            setClases(response.data)
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