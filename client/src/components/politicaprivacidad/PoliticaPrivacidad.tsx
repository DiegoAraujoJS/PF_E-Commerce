import React from 'react';
import { useEffect } from 'react';
import s from './PoliticaPrivacidad.module.css'

export default function PoliticaPrivacidad({ id }) {

    useEffect(() => {
        document.title = `Política de Privacidad`
    })

    return (
        <div className={s.container}>
            <h1>Política de Privacidad</h1>
        </div>
    )
}