import React from 'react';
import CSS from 'csstype';
import { Class} from './interfaces';
import {Card, /* Button */} from 'react-bootstrap'
const ClassCard: React.FC<Class> = (props) => {
    const profileImg: CSS.Properties = {
        height: '100px',
        width: '100px',
        borderRadius: '50%',
    };
    const descLimit: CSS.Properties = {
        height: '30px', 
        width: '430px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
    };
    const cityPos: CSS.Properties = {
        height: 'fit-content',
        width: 'fit-content',
    };

    return (
        <Card>
            <Card.Header>{props.nombre}</Card.Header>
            <Card.Body className='container d-flex flex-row justify-content-around align-items-center'>
                <img style={profileImg} src={props.profesor && props.profesor.foto} alt={props.profesor && props.profesor.nombre}/>
                <div>
                    <Card.Title>* * * * *</Card.Title>
                    <Card.Title>{props.materia && props.materia + ' - ' + props.grado && props.grado + ' - ' + props.nivel && props.nivel}</Card.Title>
                    <Card.Text style={descLimit}>
                        {props.descripcion && props.descripcion}
                    </Card.Text>
                </div>
                <Card.Text style={cityPos}>{props.profesor && props.profesor.ciudad}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default ClassCard