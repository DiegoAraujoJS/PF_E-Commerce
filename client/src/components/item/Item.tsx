import s from './Item.module.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { closeCircleOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import { useDispatch, useSelector } from 'react-redux';
import { modificarClasesPorComprar } from '../../Actions/Actions';
import axios from 'axios'
import Swal from 'sweetalert2'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faClock, faEnvelope, faStar } from '@fortawesome/free-regular-svg-icons';
import ClassDetail from '../classCard/ClassDetail';
import { faMapMarkerAlt, faStar as starComplete, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
const starEmpty = <FontAwesomeIcon icon={faStar} style={{ color: "#ffe516" }} />
const starHalf = <FontAwesomeIcon icon={faStarHalfAlt} style={{ color: "#ffe516" }} />
const starCompleta = <FontAwesomeIcon icon={starComplete} style={{ color: "#ffe516" }} />
const email = <FontAwesomeIcon icon={faEnvelope} className="mt-1" style={{ color: "#0067ff" }} />
const mark = <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: "#ff3f3f" }} />

    // id={clase?.id}
    // nombre={clase?.nombre}
    // descripcion={clase?.descripcion}
    // esPresencial={clase?.esPresencial}
    // grado={clase?.grado}
    // materia={clase?.materia}
    // nivel={clase?.nivel}
    // profesor={clase?.profesor}
    
    // date={clase?.date}
    // precio={clase?.precio}
    // key={i + 20}
    // student={clase?.student}
    
    
    export default function Item({ cliente, id, imagen, nombre, precioDescuento, moneda, dia, horaInicio, horaFin, profesor, comprado }) {
      


      const [show, setShow] = useState(false);
      const [d, setDet] = useState([]);
      
      
      
      useEffect(() => {
        axios.get(`http://localhost:3001/api/clases/all`)
        .then(result => {
          if(result.status === 200) {  
            const props = result.data;
            setDet(props)
            console.log('aquiiii', props)
            // return props;
          }
        }) 
      }, [show]);
      
     
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);
 
      
      const pro = d.filter(el => el.id === id)
      const props = pro[0];
      
      const puntuacion = (num) => {
      
            num === 5 ? <p>{starCompleta}{starCompleta}{starCompleta}{starCompleta}{starCompleta}</p>
                : (num < 5 && num >= 4.5) ? <p>{starCompleta}{starCompleta}{starCompleta}{starCompleta}{starHalf}</p>
                    : num === 4 || (num < 4.5 && num >= 4) ? <p>{starCompleta}{starCompleta}{starCompleta}{starCompleta}{starEmpty}</p>
                        : (num < 4 && num >= 3.5) ? <p>{starCompleta}{starCompleta}{starCompleta}{starHalf}{starEmpty}</p>
                            : num === 3 || (num < 3.5 && num >= 3) ? <p>{starCompleta}{starCompleta}{starCompleta}{starEmpty}{starEmpty}</p>
                                : (num < 3 && num >= 2.5) ? <p>{starCompleta}{starCompleta}{starHalf}{starEmpty}{starEmpty}</p>
                                    : num === 2 || (num < 2.5 && num >= 2) ? <p>{starCompleta}{starCompleta}{starEmpty}{starEmpty}{starEmpty}</p>
                                        : (num < 2 && num >= 1.5) ? <p>{starCompleta}{starHalf}{starEmpty}{starEmpty}{starEmpty}</p>
                                            : num === 1 || (num < 1.5 && num >= 1) ? <p>{starCompleta}{starEmpty}{starEmpty}{starEmpty}{starEmpty}</p>
                                                : <h4>No tiene puntuacion</h4>
        }

        
    





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
    }).then(async (result) => {
      if (result.isConfirmed) {
          try {
            const updatedCarrito = await axios.get(`http://localhost:3001/api/carrito/${cliente}/${id}`)
            if (updatedCarrito.status === 200 && Array.isArray(updatedCarrito.data) && updatedCarrito.data.length) {
              Swal.fire(
                'Eliminado!',
                'Tu clase se ha eliminado de tu lista.',
                'success'
              )
                const clasesPorComprarFormateadas: any = updatedCarrito.data.map(e => {
                    console.log(e.date)
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
                        precioDescuento: Number(e.precio?.slice(1)) + Number(e.precio),
                        
                        dia: `${dia}/${mes}/${e.date.year}`,
                        horaInicio: `${horaInicio[0]}:${horaInicio[1]} ${horaInicio[2]}`,
                        horaFin: `${horaFinal[0]}:${horaFinal[1]} ${horaFinal[2]}`,
                        profesor: e.profesor?.User_mail,
                        precio: e.precio
                    }
                    return clasePorComprar;
                })
                dispatch(modificarClasesPorComprar(clasesPorComprarFormateadas));
              }
          } catch (error) {
            console.log(error)
          }
         
          
            // .then(result => {
            //   if (result.status === 200) {
            //     dispatch(modificarClasesPorComprar(result.data));
            //   }D
            // })
            // .catch(error => console.log('BUGGA', error))

          
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
          <div  className={s.card}>
            {/* <Link to={`/detalle/${id}`} className={s.enlaceComprado}> */}
              <div onClick={handleShow} className={s.imageContainer}>
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
              {/* clasesPorComprar.map((e, i) => <Item key={i} cliente={cliente} id={e.id} imagen={e.imagen} nombre={e.nombre} precioDescuento={e.precioDescuento} precioOriginal={e.precioOriginal} moneda={moneda} dia={e.dia} horaInicio={e.horaInicio} horaFin={e.horaFin} profesor={e.profesor} comprado={false}></Item>) */}
              <div className={s.pricesComprado}>
                <div className={s.textAlign}>
                  <p className={s.titleComprado}>Precio</p>
                </div>
                <div className={s.down}>
                  <span className={s.monedaComprado}>{moneda}</span>
                  <span className={s.precioComprado}>{precioDescuento.toFixed(2)}</span>
                </div>
                <div className={"w-100 d-flex justify-content-center"}>
                  <Link to={`/chat/${profesor}`}>
                      <button className={"btn btn-primary"}>
                          Chatea con el profesor
                      </button>
                  </Link> 
                </div>
              </div>
              <ClassDetail hijo = {{show, handleClose, email, mark, puntuacion }} {...props} />
            {/* </Link> */}
          </div>
          :
          <div className={s.card}>
            {/* <Link to={`/detalle/${id}`} className={s.enlace}> */}
              <div onClick={handleShow} className={s.imageContainer}>
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
                  <span className={s.precio}>{precioDescuento.toFixed(2)}</span>
                </div>
                
              </div>
              <ClassDetail hijo = {{show, handleClose, email, mark, puntuacion}} {...props} />
            {/* </Link> */}
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

