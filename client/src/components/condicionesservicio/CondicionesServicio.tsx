import React from 'react';
import { useEffect } from 'react';
import s from './CondicionesServicio.module.css'

export default function CondicionesServicio() {

    useEffect(() => {
        document.title = "Condiciones del servicio"
    }, []);

    return (
        <div className={s.container}>
            <h1>Condiciones del Servicio</h1>
        </div>
       
    )
}