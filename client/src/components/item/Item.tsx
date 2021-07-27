import s from './Item.module.css';
import { Link } from 'react-router-dom';
import React from 'react';
import { closeCircleOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import { useDispatch, useSelector } from 'react-redux';
import { modificarClasesPorComprar } from '../../Actions/Actions';
import axios from 'axios'
import Swal from 'sweetalert2'

export default function Item({ cliente, id, imagen, nombre, precioDescuento, precioOriginal, moneda, dia, horaInicio, horaFin, profesor, comprado }) {

  // This allows use to modify Redux state's properties 
  const dispatch = useDispatch();

  // This allows us to read the Redux state's property clasesPorComprar
  const clasesPorComprar = useSelector(state => state['clasesPorComprar']);
  // const clasesPorComprar = useSelector(state => state['claim']);

  // This allows us to delete a class from Redux state's property clasesPorComprar
  async function quitardeCesta() {
    // let clasesActualizadas = clasesPorComprar.filter(e => e.id !== id);
    // dispatch(modificarClasesPorComprar(clasesActualizadas));
    Swal.fire({
      title: '¿Quieres eliminar de tu lista esta clase?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminalo!',
      cancelButtonText: 'No, quédatelo'
    }).then((result) => {
      if (result.isConfirmed) {

          axios.get(`http://localhost:3001/api/carrito/${cliente}/${id}`)
            .then(result => {
              if (result.status === 200) {
                dispatch(modificarClasesPorComprar(result.data));
              }
            })
            .catch(error => alert(error))

          Swal.fire(
            'Eliminado!',
            'Tu clase se ha eliminado de tu lista.',
            'success'
          )
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelado',
            'Tu lista sigue intacta',
            'error'
          )
        }
      })

  }
  console.log(cliente)
  return (
    <>
      {
        comprado ?
          <div className={s.card}>
            <Link to={`/detalle/${id}`} className={s.enlaceComprado}>
              <div className={s.imageContainer}>
                <img src={imagen} alt={nombre} className={s.cover} />
              </div>
              <div className={s.detailsContainer}>
                <p className={s.title}>{nombre}</p>
                <div>
                  <span className={s.labelDetail}>Profesor</span>
                  <span className={s.detail}>{profesor}</span>
                </div>
                <div>
                  <span className={s.labelDetail}>Día</span>
                  <span className={s.detail}>{dia}</span>
                </div>
                <div>
                  <span className={s.labelDetail}>Hora de inicio</span>
                  <span className={s.detail}>{horaInicio}</span>
                </div>
                <div>
                  <span className={s.labelDetail}>Hora de finalización</span>
                  <span className={s.detail}>{horaFin}</span>
                </div>
              </div>
              <div className={s.pricesComprado}>
                <div className={s.textAlign}>
                  <p className={s.titleComprado}>Precio</p>
                </div>
                <div className={s.down}>
                  <span className={s.monedaComprado}>{moneda}</span>
                  <span className={s.precioComprado}>{precioDescuento?.toFixed(2)}</span>
                </div>
              </div>
            </Link>
          </div>
          :
          <div className={s.card}>
            <Link to={`/detalle/${id}`} className={s.enlace}>
              <div className={s.imageContainer}>
                <img src={imagen} alt={nombre} className={s.cover} />
              </div>
              <div className={s.detailsContainer}>
                <p className={s.title}>{nombre}</p>
                <div>
                  <span className={s.labelDetail}>Profesor</span>
                  <span className={s.detail}>{profesor}</span>
                </div>
                <div>
                  <span className={s.labelDetail}>Día</span>
                  <span className={s.detail}>{dia}</span>
                </div>
                <div>
                  <span className={s.labelDetail}>Hora de inicio</span>
                  <span className={s.detail}>{horaInicio}</span>
                </div>
                <div>
                  <span className={s.labelDetail}>Hora de finalización</span>
                  <span className={s.detail}>{horaFin}</span>
                </div>
              </div>
              <div className={s.prices}>
                <p className={s.title}>Precio</p>
                <div>
                  <span className={s.moneda}>{moneda}</span>
                  <span className={s.precio}>{precioDescuento?.toFixed(2)}</span>
                </div>
                <div>
                  <span className={s.moneda}>{moneda}</span>
                  <span className={s.precioOriginal}>{precioOriginal?.toFixed(2)}</span>
                </div>
              </div>
            </Link>
            <div className={s.quitarDeCesta}>
              <button onClick={quitardeCesta} className={s.quitarDeCestaButton}>
                <IonIcon icon={closeCircleOutline} className={s.iconDumb}></IonIcon>
              </button>
            </div>
          </div>
      }
    </>
  );
}

