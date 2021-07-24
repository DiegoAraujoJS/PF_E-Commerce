
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
            if (user) {
                const clases = await axios.get(`http://localhost:3001/api/carrito/all/${user.data.mail}`)
                
                if (clases.status === 200 && clases.data.length) {
                    const clasesPorComprarFormateadas: ClasePorComprar[] = clases?.data.map(e => {
                        let dia = e.date?.day;
                        let mes = e.date?.month;
                        let horaInicio = e.date?.time[0].split(':');
                        let horaFinal = e.date?.time[1].split(':');
                        if (e.date.day.toString().length === 1) dia = '0' + dia;
                        if (e.date.month.toString().length === 1) mes = '0' + mes;
                        if (horaInicio[0] >= 12) {
                            horaInicio[2] = 'PM';
                            if (horaInicio[0] !== 12) horaInicio[0] = (Number(horaInicio[0]) - 12).toString();
                        } else {
                            horaInicio[2] = 'AM';
                        }
                        if (horaFinal[0] >= 12) {
                            horaFinal[2] = 'PM';
                            if (horaFinal[0] !== 12) horaFinal[0] = (Number(horaFinal[0]) - 12).toString();
                        } else {
                            horaFinal[2] = 'AM';
                        }
                        if (horaInicio[0].length === 1) horaInicio[0] = '0' + horaInicio[0];
                        if (horaFinal[0].length === 1) horaFinal[0] = '0' + horaFinal[0];
                        let clasePorComprar = {
                            id: e.id,
                            imagen: e.profesor?.foto,
                            nombre: e.nombre,
                            precioDescuento: Number(e.precio?.slice(1)),
                            precioOriginal: Number(e.precio?.slice(1)) + 5000,
                            dia: `${dia}/${mes}/${e.date.year}`,
                            horaInicio: `${horaInicio[0]}:${horaInicio[1]} ${horaInicio[2]}`,
                            horaFin: `${horaFinal[0]}:${horaFinal[1]} ${horaFinal[2]}`,
                            profesor: e.profesor?.User_mail
                        }
                        return clasePorComprar;
                    })
                    setClient(user.data.mail)
                    setClasesPorComprar(clasesPorComprarFormateadas)
                }
            }
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