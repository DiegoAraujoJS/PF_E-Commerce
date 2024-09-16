import React from 'react';
import s from './DetalleCesta.module.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useStripe } from '@stripe/react-stripe-js';
import Item from '../item/Item';
import nothingFound from '../../images/nothingFound.svg'


export default function DetalleCesta({ moneda, cliente }) {

    // This allows us to have access to Redux state's properties
    const clasesPorComprar = useSelector(state => state['clasesPorComprar']);

    // This allows us to connect to stripe
    const stripe = useStripe();

    // This allows us to round number correctly
    function roundTwo(num) {
        return Math.round((num + Number.EPSILON) * 100) / 100
    }

    // This allows us to calculate the total based on Redux state's properties
    
    let precioOriginal = 0;
    let total = 0;
    let descuento = 0;
    if (clasesPorComprar.length) {
        
        precioOriginal = roundTwo(clasesPorComprar.map(e => e.precioDescuento).reduce((acum, e) => acum + e));
        
        total = roundTwo(precioOriginal);
        precioOriginal = roundTwo(precioOriginal)
        descuento = 0
    }

    // This allows us to redirect the client
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const session = await axios.post('http://localhost:3001/procesarpago', {
                clasesPorComprar,
                precioOriginal,
                total,
                descuento,
                moneda,
                cliente
            })
            stripe.redirectToCheckout({ sessionId: session.data.id })
        } catch (error) {
            alert(error)
        }
    }

    return (
        <>
            {
                clasesPorComprar.length ?
                    <div className={s.container}>
                        <div className={s.left}>
                            <p className={`${s.cantidadClases} ${s.marginBottom}`}>{clasesPorComprar.length === 1 ? '1 clase en la cesta' : `${clasesPorComprar.length} clases en la cesta`}</p>
                            <div>
                                {
                                    clasesPorComprar.map((e, i) => <Item key={i} cliente={cliente} id={e.id} imagen={e.imagen} nombre={e.nombre} precioDescuento={e.precioDescuento} moneda={moneda} dia={e.dia} horaInicio={e.horaInicio} horaFin={e.horaFin} profesor={e.profesor} comprado={false}></Item>)
                                }
                            </div>
                        </div>
                        <div className={s.right}>
                            <form onSubmit={handleSubmit}>
                                <p className={`${s.title} ${s.marginBottom}`}>Resumen</p>
                                <div className={s.details}>
                                    
                                    <div>
                                        <span className={s.label}>Descuento: </span>
                                        <span className={s.moneda}>{moneda}</span>
                                        <span className={s.precio}>-{descuento.toFixed(2)}</span>
                                    </div>
                                </div>
                                <div className={s.totalContainer}>
                                    <span className={s.labelTotal}>Total: </span>
                                    <span className={s.monedaTotal}>{moneda}</span>
                                    <span className={s.precioTotal}>{total.toFixed(2)}</span>
                                </div>
                                <p>
                                    Tus Clases Virtuales está obligado por ley a recaudar los impuestos sobre las transacciones
                                    de las compras realizadas en determinadas jurisdicciones fiscales.
                                </p>
                                <p>
                                    Al completar la compra, aceptas estas <Link to={`condicionesdeuso`} className={s.enlace}>Condiciones de uso</Link>
                                </p>
                                <input type='submit' className={s.payButton} value='Pagar' />
                            </form>
                        </div>
                    </div>
                    :
                    <div>
                        <p className={`${s.cantidadClases} ${s.marginBottom}`}>0 clases en la cesta</p>
                        <div className={s.childContainer}>
                            <p className={s.description}>Tu cesta está vacía. ¡Busca una clase que te guste!</p>
                            <div className={s.imageDiv}>
                                <img src={nothingFound} alt='No se encontraron productos' className={s.svgImage}></img>
                            </div>
                            <div className={s.buttonDiv}>
                                <Link to="/clases"><button className={s.seguirComprando}>Seguir buscando</button></Link>
                            </div>
                        </div>
                    </div>
            }
        </>

    )
}