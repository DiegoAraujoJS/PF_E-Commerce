import React from "react";
import Claim from "./Claim";
import style from './Claims.module.css';

function Claims(props) {

    //let { claims } = props;

    let claims = [{
        name: 'Ayuda',
        description: 'El profesor no se presento a la clase',
        codeClaim: '1',
    },
    {
        name: 'Devuelvame mi Dinero',
        description: 'Me cobró 500 pesos en la boleta de pago pero despues me pidio que le pague 300 mas',
        codeClaim: '2',
    },
    {
        name: 'Ayuda',
        description: 'El profesor no entendia bien el contenido de la materia',
        codeClaim: '1',
    },
    {
        name: 'Devuelvame mi Dinero',
        description: 'El profesor llego media hora tarde',
        codeClaim: '2',
    },
    {
        name: 'Alumno Problemático',
        description: 'El alumno estorbaba a sus compañeros e interrumpia la clase con preguntas irrelevantes',
        codeClaim: '3',
    },
    {
        name: 'Devuelvame mi Dinero',
        description: 'No me sentí satisfecho con la clase',
        codeClaim: '2',
    },
]


    return (
        <div className = {style.container}>
            <h2>RECLAMOS</h2>
            {Array.isArray(claims) && claims.map((c,i) => (
                <Claim
                    name = { c.name }
                    description = { c.description }
                    code = { c.codeClaim }
                    key = {i}
                />
            ))}
        </div>
    )
}

export default Claims;