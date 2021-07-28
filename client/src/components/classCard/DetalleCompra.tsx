import s from './Detail.module.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Disponible } from '../../../../interfaces';

export default function Detail({profesor}) {
    const [dias, setDias] = useState([])
    const week = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado' ]
    const year = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

    useEffect(() => {
        async function fetchDays() {
            const fetchCalendar = await axios.get(`http://localhost:3001/api/calendario/${profesor}`)
            const today = new Date()
            const profDays = fetchCalendar.data.map((date: Disponible) => {
                today.setDate(date.fecha.dia); 
                const oneDate = {
                    disponible: date,
                    day: week[today.getDay()],
                    number: today.getDate(),
                    month: year[today.getMonth()],
                    year: today.getFullYear()

                }
                return oneDate
            })
            setDias(profDays) 
        }
        fetchDays()
    }, [])

    return (
        <>
            { dias.length ? 
                [<option value=''>Selecciona un día para tu clase</option>, 
                dias.map((fullDate, i) => {
                    return <option key={i + 10} value={`${fullDate.day} ${fullDate.number} de ${fullDate.month} del ${fullDate.year}`}>{`${fullDate.day} ${fullDate.number} de ${fullDate.month} del ${fullDate.year}`}</option>
                })]
            :
                <option value=''>CARGANDO</option>
            }
        </>
    );
}