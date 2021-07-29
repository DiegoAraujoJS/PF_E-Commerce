import React from 'react'
import { Container } from 'react-bootstrap'
import "../historial/Historial.module.css"
import { useEffect, useState } from 'react'
import { Button, Card, Col, ListGroup, Modal, Row, } from 'react-bootstrap'
import axios from 'axios'
import Puntuar from '../puntuar/Puntuar.jsx'
import getCookieValue from '../../cookieParser'
import Swal from "sweetalert2";
const Historial = () => {
    const profileImg = {
        height: '160px',
        width: '160px',
        borderRadius: '50%',
    };
    const estiloCompletado={backgroundColor: "#1ECD97", 
        borderRadius: "20px", 
        fontFamily:"Montserrat", 
        fontSize:"18px", 
        padding:"3px",
        width:"300px", 
        boxSizing:"border-box",
        display:"flex", 
        justifyContent:"center",
        fontWeight:"700"}
    const estiloPendiente={backgroundColor: "#F4A62E", 
        borderRadius: "20px", 
        fontFamily:"Montserrat", 
        fontSize:"18px", 
        padding:"3px",
        width:"300px", 
        boxSizing:"border-box",
        display:"flex",
        fontWeight:"700", 
        justifyContent:"center"}
    const estiloCancelado={backgroundColor: "#FB797E", 
        borderRadius: "20px", 
        fontFamily:"Montserrat", 
        fontWeight:"700", 
        fontSize:"18px", 
        padding:"3px",
        width:"300px", 
        display:"flex", 
        justifyContent:"center"}
    const estiloPublicado={
        backgroundColor: "#2E67F4", 
        borderRadius: "20px", 
        fontFamily:"Montserrat", 
        fontSize:"18px", 
        padding:"3px", 
        boxSizing:"border-box",
        width:"300px", 
        display:"flex", 
        justifyContent:"center", 
        fontWeight:"700"
    }
    const [historialFiltro, setHistorialFiltro]=useState("")
    const [colorBotonPublicado, setColorBotonPublicado]=useState("white")
    const [colorBotonCompletado, setColorBotonCompletado]=useState("white")
    const [colorBotonPendiente, setColorBotonPendiente]=useState("white")
    var j=0
    const classListContainer = {
        // position: 'relative',
        // overflowY: 'auto',
        margin: 'auto',
        paddingLeft: '0px',
        listStyleType: 'none',
    };
    const [show, setShow] = useState([false]);
    const handleClose = (i) => {
        console.log("INDEX", i)
        if(show.length=i){setShow([false])}
        if(show.length<=i)setShow([...show, false])};
    const handleShow = (i) => {
        console.log("INDEX2", i)
        console.log("SHOWINDEX", show)
        if(show.length=i){setShow([true])}
        if(show.length<=i)setShow([...show, true])};
    const [historia, setHistoria]=useState([])
    const [alum, setAlum]=useState("")
    const fetchHistorial = async () => {
        try {
            
            const token = getCookieValue("token").slice(
                1,
                getCookieValue("token").length - 1
              );
              let userResponse = await axios.post(
                `http://localhost:3001/api/verify`,
                {},
                { headers: { Authorization: token } }
              );
              console.log("Iserresponse", userResponse)
              let role="student"
            if(userResponse.data.role===1)role="profesor"
            await setAlum(userResponse.data)            
            const response = await axios.get(`http://localhost:3001/api/clases/all/student/${userResponse.data.mail}`)
            console.log("RESPONSEEEE", response)
            await setHistoria([
                ...response.data]
            )
            
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(()=>{
        fetchHistorial()
    },[])
    console.log("Show", show)
    const setearCompletado=()=>{
        setHistorialFiltro("complete")
        setColorBotonPendiente("white")
        setColorBotonPublicado("white")
        setColorBotonCompletado("#1ECD97")}
    const setearPublicado=()=>{
        setHistorialFiltro(null)
        setColorBotonPendiente("white")
        setColorBotonPublicado("#2E67F4")
        setColorBotonCompletado("white")}
    const setearPendientes=()=>{
        setHistorialFiltro("pending")
        setColorBotonPendiente("#F4A62E")
        setColorBotonPublicado("white")
        setColorBotonCompletado("white")}
    const setearSinFiltros=()=>{
        setHistorialFiltro("")
        setColorBotonPendiente("white")
        setColorBotonPublicado("white")
        setColorBotonCompletado("white")}
    const cancelar= async (e)=>{
        Swal.fire({
          title: '¿Esta seguro de cancelar esta clase?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Si!',
          cancelButtonText: 'No!'
        }).then((result) => {
          if (result.isConfirmed) {
            axios.get("http://localhost:3001/api/reclamos/cancelar/" + e)
            Swal.fire(
              'Cancelado!',
              'La clase fue cancelada correctamente.',
              'success'
            )
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
              'Cancelado',
              'La clase sigue activa',
              'error'
            )
          }
        })
      }; 
      const borrar= async (e)=>{
          const idd={id:e}
        Swal.fire({
          title: '¿Esta seguro de borrar tu publicacion?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Si!',
          cancelButtonText: 'No!'
        }).then((result) => {
          if (result.isConfirmed) {
            axios.post(("http://localhost:3001/api/clases/delete"),idd)
            Swal.fire(
              'Cancelado!',
              'La clase fue cancelada correctamente.',
              'success'
            )
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
              'Cancelado',
              'La clase sigue activa',
              'error'
            )
          }
        })
      };
      const completar = async (e) => {
        Swal.fire({
            title: '¿Ya tomaste esta clase?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si!',
            cancelButtonText: 'No!'
        }).then(result => {
            if (result.isConfirmed) {
                axios.post(`http://localhost:3001/api/clases/status`, {id: e.id, status: 'complete'})
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelado',
                    'La clase sigue pendiente',
                    'error'
                  )   
            }
        })
      }    
    const colorred="#1ECD97"
    return (
        <div class="container" >
            <h1>Mi historial de cursos</h1>
            <h3>Filtrar por:</h3>
            <button style={{backgroundColor: colorBotonPublicado, borderRadius: "20px", fontFamily:"Arial", fontSize:"14px", padding:"3px",width:"100px", boxSizing:"border-box"}} onClick={()=>{setearPublicado()}}>Publicados</button>
            <button style={{backgroundColor: colorBotonCompletado, borderRadius: "20px", fontFamily:"Arial", fontSize:"14px", padding:"3px",width:"100px", boxSizing:"border-box"}}onClick={()=>{setearCompletado()}}>Completados</button>
            <button style={{backgroundColor: colorBotonPendiente, borderRadius: "20px", fontFamily:"Arial", fontSize:"14px", padding:"3px", boxSizing:"border-box",width:"100px"}} onClick={()=>{setearPendientes()}}>Pendientes</button>
            <button style={{backgroundColor: "white", borderRadius: "20px", fontFamily:"Arial", fontSize:"14px", padding:"3px", boxSizing:"border-box",width:"100px"}} onClick={()=>{setearSinFiltros()}}>Sin filtros</button>
            
            <ul style={classListContainer}>
                {historia.map((e, i)=>{
                    console.log("ESTO ES E", e)
                    const clase=e
                    if(!e.profesor){return null}
                    if(historialFiltro!==""){if(e.status!==historialFiltro){return null}}
                    return (
                        <Container style={{background:"silver", borderColor:"red", borderRadius:"20px", marginTop:"20px"}}>
                            <div>
                                <div className="d-flex justify-content-start" style={{width:"500px"}}>
                                   {e.profesor? <Card.Img style={profileImg}  src={e.profesor.foto} alt="Error" />: null}
                                   <div style={{marginLeft:"20px"}}>
                                        {e.status==="complete"?<div style={estiloCompletado}>
                                            Clase completada
                                        </div> : (e.status==="pending"?<div style={estiloPendiente}>
                                            Pendiente
                                        </div>: (e.status==="cancelled"?<div style={estiloCancelado}>
                                            Cancelado
                                        </div>:<div style={estiloPublicado}>
                                            Publicado
                                        </div>))
                                        }
                                        <div>
                                            Materia: {e.materia}
                                        </div>
                                        <div>
                                            Nombre de la clase: {e.nombre}
                                        </div>
                                        {e.status!==null?<div>
                                            Fecha de la clase: {e.date.day}/{e.date.month}/{e.date.year} 
                                        </div>:null}
                                        {e.status!==null?<div>
                                            Horario de la clase: {e.date.time[0]}-{e.date.time[1]}
                                        </div>:null}
                                        <div>
                                            Precio: {`$${e.precio}`}
                                        </div>
                                        {(e.profesor.User_mail===alum.mail && e.status!==null)?<div>
                                                                        Alumno: {e.student.name} {e.student.lastName}
                                                                    </div>:
                                                                    <div>
                                                                        Profesor: {e.profesor.name} {e.profesor.lastName}
                                                                    </div>}

                                   </div>
                                   {e.status==="complete"?
                                   <div  style={{marginLeft:"35vw"}}>
                                        <Button onClick={() => handleShow(i)}> Puntuar clase </Button>
                                        <Puntuar key={i}id={i} show={show[i]} handleClose={() => handleClose(i)} clase={e} alum={alum.mail} index={i} />
                                   </div>: null}
                                   {e.status==="pending"?
                                   <div  style={{marginLeft:"35vw"}}>
                                   <Button onClick={() => cancelar(e.id)}> Cancelar clase </Button>
                                   {alum.mail === e.User_mail ? <Button onClick={() => completar(e)}> Ya tomé esta clase </Button> : null}
                                     </div>: null}
                                     {e.status===null?
                                   <div  style={{marginLeft:"35vw"}}>
                                   <Button onClick={() => borrar(e.id)}> Cancelar publicacion </Button>
                                     </div>: null}
                                </div>
                            </div>
                        </Container>
                            )
                })}
         
            </ul>
            
        </div>
    )
}

export default Historial
