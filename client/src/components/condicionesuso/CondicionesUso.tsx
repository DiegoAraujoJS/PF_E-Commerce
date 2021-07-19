import React from 'react';
import { useEffect } from 'react';
import s from './CondicionesUso.module.css'

export default function CondicionesUso() {

    useEffect(() => {
        document.title = "Condiciones de uso"
    }, []);

    return (
        <div className={s.container}>
            <h1>Condiciones de uso</h1>
        </div>
       
    )
}