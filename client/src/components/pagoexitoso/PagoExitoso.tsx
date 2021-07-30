import React, { useState } from 'react';
import thanks from '../../images/thanks.svg';
import s from './PagoExitoso.module.css';
import { useEffect } from 'react';
import axios from 'axios';
import Item from '../item/Item';
import googleCalendar from '../../images/googlecalendar.svg';
import loadingGif from '../../images/loadingGif.gif';
import config from '../../config/config'
import { Link } from 'react-router-dom';

declare global {
    interface Window {
        gapi: any;
    }
}

export default function PagoExitoso() {
    

    const [productosComprados, setProductosComprados] = useState([]);
    const [eventosPorGuardar, setEventosPorGuardar] = useState([]);
    const [cliente, setCliente] = useState('')
    const [clientMail, setClientMail] = useState('');

    function randomID() {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 10; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    useEffect(() => {
        async function informaciondepago() {
            document.title = "Pago exitoso"
            let params = new URLSearchParams(window.location.search);
            let id = params.get('id')
            const session = await axios.get(`http://localhost:3001/informaciondepago/${id}`)
            
            const carrito = await axios.get(`http://localhost:3001/api/carrito/all/${session.data.customer_email}`)
            const ids = carrito ? carrito.data.map(cl => cl.id) : null
            if (ids) {
                for (const id of ids) {
                    const completeClasses = await axios.post(`http://localhost:3001/api/clases/status`, {id: id, status: 'pending', mail: session.data.customer_email})
                    const clear = await axios.get(`http://localhost:3001/api/carrito/${session.data.customer_email}/${id}`)
                }
                
            }




            console.log('sessiondata', session.data.line_items.data)
            let cliente = session.data.customer.name.split(' ')
            let clienteFormateado = cliente.map(e => `${e.slice(0, 1).toUpperCase()}${e.slice(1).toLowerCase()}`)
            let clienteNombre = clienteFormateado.join(' '); 
            let cliente_email = session.data.customer_email;
            setClientMail(cliente_email);
            setCliente(clienteNombre);
            let detalleCompra = session.data.line_items.data.map(e => {
                const profesor = e.price.product.description.split(' ')[2];
                const dia = e.price.product.description.split(' ')[6];
                const horaInicio = `${e.price.product.description.split(' ')[11]} ${e.price.product.description.split(' ')[12]}`;
                const horaFin = `${e.price.product.description.split(' ')[17]} ${e.price.product.description.split(' ')[18]}`;
                let productoComprado = {
                    id: e.price.product.metadata.id,
                    imagen: e.price.product.images[0],
                    nombre: e.price.product.name,
                    precioDescuento: e.amount_total / 100,
                    moneda: e.price.currency.toUpperCase(),
                    profesor,
                    dia,
                    horaInicio,
                    horaFin,
                    precio: e.precio
                }
                return productoComprado
            })
            setProductosComprados(detalleCompra);
            let eventos = detalleCompra.map(e => {
                let fechaActual = new Date()
                let anio = fechaActual.getFullYear();
                let mes = fechaActual.getMonth();
                let dia = fechaActual.getDate();
                let nombreDia = fechaActual.getDay();
                let meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'];
                let dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
                let fecha = e.dia.split('/');
                const getMonth = (element) => element===fecha[1]
                fecha[1] = meses.findIndex(getMonth) + 1
                // horaInicio
                let hora = e.horaInicio.split(' ')
                let numeros = hora[0].split(':');
                let horas = numeros[0];
                let minutos = numeros[1];
                // horaFin
                let horaFinal = e.horaFin.split(' ')
                let numerosFinal = horaFinal[0].split(':');
                let horasFinal = numerosFinal[0];
                let minutosFinal = numerosFinal[1];

                if (hora[1] === 'PM') horas = parseInt(horas) + 12;
                if (horaFinal[1] === 'PM') horasFinal = parseInt(horasFinal) + 12;

                let evento = {
                    'summary': e.nombre,
                    'description': `Clase comprada el ${dias[nombreDia]} ${dia} de ${meses[mes]} del ${anio} en UCLASES.com`,
                    'start': {
                        'dateTime': `${fecha[2]}-${fecha[1]}-${fecha[0]}T${horas}:${minutos}:00-03:00`,
                        'timeZone': 'America/Argentina/Buenos_Aires',
                    },
                    'end': {
                        'dateTime': `${fecha[2]}-${fecha[1]}-${fecha[0]}T${horasFinal}:${minutosFinal}:00-03:00`,
                        'timeZone': 'America/Argentina/Buenos_Aires',
                    },
                    'attendees': [
                        { 'email': e.profesor },
                        { 'email': cliente_email }
                    ],
                    'reminders': {
                        'useDefault': false,
                        'overrides': [
                            { 'method': 'email', 'minutes': 24 * 60 },
                            { 'method': 'popup', 'minutes': 1 }
                        ]
                    },
                    'conferenceData': {
                        'createRequest': { 'requestId': randomID() },
                    }
                }
                return evento
            })
            setEventosPorGuardar(eventos)

            // Aquí se debería hacer la llamada POST a la API para guadar la información a la base de datos
        }
        informaciondepago();
    }, [])


    // Declaramos la variable gapi
    let gapi = window.gapi;

    // Array of API discovery doc URLs for APIs used by the quickstart
    let DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

    // Authorization scopes required by the API; multiple scopes can be
    // included, separated by spaces.
    let SCOPES = "https://www.googleapis.com/auth/calendar.events";

    function handleClick() {
        gapi.load('client:auth2', () => {

            gapi.client.init({
                apiKey: config.REACT_APP_GOOGLE_CALENDAR_API_KEY,
                clientId: config.REACT_APP_GOOGLE_CALENDAR_CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES
            })

            gapi.client.load('calendar', 'v3')

            gapi.auth2.getAuthInstance().signIn()
                .then(() => {
                    eventosPorGuardar.forEach((element) => {

                        var request = gapi.client.calendar.events.insert({
                            'calendarId': 'primary',
                            'resource': element,
                            'conferenceDataVersion': 1
                        })

                        request.execute(event => {
                            window.open(event.htmlLink)
                        })

                    })
                })
        })
    }

    return (
        <div className={s.container}>
            <p className={s.title}>{`Gracias por tu compra ${cliente}`}</p>
            <img src={thanks} alt='Gracias por tu compra' className={s.thanksImage}></img>
            <div className={s.contenedorBoton}>
                <button className={s.agendar} onClick={handleClick}>
                    <img src={googleCalendar} className={s.googleCalendar} alt='Google Calendar Logo'></img>
                    Agenda tus clases en Google Calendar
                </button>
            </div>
            <p className={s.subtitle}>Detalle de compra</p>
            <div className={s.detalleContainer}>
                {
                    productosComprados.length ?
                        productosComprados.map((e, i) => <Item cliente={cliente} key={i} id={e.id} imagen={e.imagen} nombre={e.nombre} precioDescuento={e.precioDescuento} moneda={e.moneda} dia={e.dia} horaInicio={e.horaInicio} horaFin={e.horaFin} profesor={e.profesor} comprado={true}></Item>)
                        :
                        <img src={loadingGif} alt="Loading Gif" className={s.loadingGif} />
                }
            </div>
        </div>
    )
}