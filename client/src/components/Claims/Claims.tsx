import React from "react";
import Claim from "./Claim";
import style from './Claims.module.css';

function Claims(props) {

    //let { claims } = props;

    let claims = [{
        name: 'Ayuda',
        description: 'me timaroASDFASDSDFSDFSDFSDFSDFSDFFASDFASDFASDFSADFASDFFFFFFFFFFFFFFFFFFFFFFFSDFSDFSDFSDFSDFSDFSDFSDFSDFSDFSDFSDFn',
        codeClaim: '1',
    },
    {
        name: 'Devuelvame mi Dinero',
        description: 'me robaron',
        codeClaim: '2',
    },
    {
        name: 'Ayuda',
        description: 'me timaron',
        codeClaim: '1',
    },
    {
        name: 'Devuelvame mi Dinero',
        description: 'me robaroOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOn',
        codeClaim: '2',
    },
    {
        name: 'Ayuda',
        description: 'me timaron',
        codeClaim: '1',
    },
    {
        name: 'Devuelvame mi Dinero',
        description: 'me robaron',
        codeClaim: '2',
    },
]

// height: '30px', 
//         width: '430px',
//         overflow: 'hidden',
//         textOverflow: 'ellipsis',
//         whiteSpace: 'nowrap'

    return (
        <div className = {style.container}>
            <h2>RECLAMOS</h2>
            {Array.isArray(claims) && claims.map((c,i) => (
                <Claim
                    name = { c.name }
                    description = { c.description }
                    code = { c.codeClaim }
                />
            ))}
        </div>
    )
}

export default Claims;