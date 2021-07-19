
import s from './Cesta.module.css';
import axios from 'axios'
import { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useDispatch } from 'react-redux';
import { modificarClasesPorComprar } from '../../Actions/Actions';
import DetalleCesta from '../detallecesta/DetalleCesta';
import config from '../../config/config'
import getCookieValue from '../../cookieParser';
import { ClasePorComprar } from '../../../../interfaces';
// This allows us to use Stripe
const stripePromise = loadStripe(config.REACT_APP_STRIPE_PUBLIC_API_KEY);

export default function Cesta() {

    const moneda = 'USD'

    const [client, setClient] = useState('')
    const [clasesPorComprar, setClasesPorComprar] = useState([])

    useEffect(() => {
        document.title = "Cesta"
        async function getClientAndClasses() {
            const token = getCookieValue(`token`).replaceAll('\"', '')
            const user = await axios.post(`http://localhost:3001/api/verify`, {}, { headers: { Authorization: token } })
            const clases = await axios.get(`http://localhost:3001/api/carrito/all/${user.data.mail}`)

            // DEVUELVE ESTO
            //             // [
            //     {
            //         "nombre": "Sumas y Restas",
            //         "descripcion": "Aprende a sumar y restar para ser el mejor de tu clase",
            //         "esPresencial": "Virtual",
            //         "grado": "Primer grado",
            //         "materia": "Matematica",
            //         "nivel": "Primario",
            //         "profesor": {
            //             "score": 2.1,
            //             "User_mail": "edwardburgos@gmail.com",
            //             "password": null,
            //             "name": "Edward",
            //             "lastName": "Burgos",
            //             "city": "Lima",
            //             "foto": "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=547&q=80",
            //             "description": "Profesor apasionado por enseñar",
            //             "history": null,
            //             "calendario": null,
            //             "createdAt": "2021-07-19T01:18:22.817Z",
            //             "updatedAt": "2021-07-19T01:18:22.817Z"
            //         },
            //         "puntuacion": 5,
            //         "date": {
            //             "year": 2021,
            //             "month": 8,
            //             "day": 7,
            //             "time": [
            //                 "08:00:00",
            //                 "12:00:00"
            //             ]
            //         },
            //         "precio": "$2000"
            //     }
            // ]
            const clasesPorComprarTransform: ClasePorComprar[] = clases.data.map(e => {
                let clasePorComprar = {
                    id: 8,
                    imagen: e.profesor.foto,
                    nombre: e.profesor.nombre,
                    precioDescuento: 14.30,
                    precioOriginal: 16.99,
                    dia: '16/07/2021',
                    horaInicio: '9:30 AM',
                    horaFin: '10:00 PM',
                    profesor: 'braiansilva@gmail.com'
                }

            })

            // ME DEVUELVE ESTO > http://localhost:3001/api/carrito/all/edwardburgos@gmail.com
            // Class ==> ClasePorComprar
            //   [{
            //     id: 8, //
            //     imagen: 'https://images.unsplash.com/photo-1561657819-51c0511e35ab?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80',
            //     nombre: '4 horas de clase de matemáticas',
            //     precioDescuento: 14.30,
            //     precioOriginal: 16.99,
            //     dia: '16/07/2021', 
            //     horaInicio: '9:30 AM', 
            //     horaFin: '10:00 PM',
            //     profesor: 'braiansilva@gmail.com'
            //   }]

            // `${Number(props.date.time[0].substring(0, 1))}${Number(props.date.time[0].substring(1, 2))}:${Number(props.date.time[0].substring(3, 4))}${Number(props.date.time[0].substring(5, 6))} PM`
            setClient(user.data.mail)
            setClasesPorComprar(clases.data)
        }
        getClientAndClasses()
    }, [])

    // This allows us to modify Redux state's properties
    const dispatch = useDispatch();
    dispatch(modificarClasesPorComprar(clasesPorComprar));

    return (
        <div className={s.container}>
            <h1 className={s.title}>Cesta</h1>
            <Elements stripe={stripePromise}>
                <DetalleCesta moneda={moneda} cliente={client}></DetalleCesta>
            </Elements>
        </div>
    );
}