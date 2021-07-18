
import s from './Cesta.module.css';
import React, { useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useDispatch } from 'react-redux';
import { modificarClasesPorComprar } from '../../Actions/Actions';
import DetalleCesta from '../detallecesta/DetalleCesta';

// This allows us to use Stripe
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_API_KEY);

export default function Cesta({ clasesPorComprar, moneda, cliente }) {

    useEffect(() => {
        document.title = "Cesta"
    }, [])

    // This allows us to define a default currency
    if (!moneda) moneda = 'USD'

    // This allows us to modify Redux state's properties
    const dispatch = useDispatch();
    dispatch(modificarClasesPorComprar(clasesPorComprar));

    return (
        <div className={s.container}>
            <h1 className={s.title}>Cesta</h1>
            <Elements stripe={stripePromise}>
                <DetalleCesta moneda={moneda} cliente={cliente}></DetalleCesta>
            </Elements>
        </div>
    );
}