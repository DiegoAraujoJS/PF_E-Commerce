import React from 'react';
import { useEffect } from 'react';
import s from './DetalleClase.module.css'

export default function DetalleClase({ id }) {

    useEffect(() => {
        document.title = `Detalle de la clase ${id}`
    })

    return (
        <div className={s.container}>
            <h1>{`Detalle ${id}`}</h1>
        </div>
    )
}