import React from 'react'
import { Container } from 'react-bootstrap'
import "../historial/Historial.module.css"
import { useEffect, useState } from 'react'
import { Button, Card, Col, ListGroup, Modal, Row, } from 'react-bootstrap'
import axios from 'axios'
import Puntuar from '../puntuar/Puntuar.jsx'
import getCookieValue from '../../cookieParser'
const Historial = () => {
    const profileImg = {
        height: '160px',
        width: '160px',
        borderRadius: '50%',
    };
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
            await setAlum(userResponse.data.mail)            
            const response = await axios.get(`http://localhost:3001/api/clases/all/student/${userResponse.data.mail}`)
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
    return (
        <div class="container" >
            <h1>Mi historial de cursos</h1>
            
            <ul style={classListContainer}>
                {historia.map((e, i)=>{
                    
                    const clase=e
                    if(!e.profesor){return null}
                    return (
                        <Container style={{background:"silver", borderColor:"red", borderRadius:"20px", marginTop:"20px"}}>
                            <div>
                                <div className="d-flex justify-content-start">
                                   {e.profesor? <Card.Img style={profileImg}  src={e.profesor.foto} alt="Error" />: null}
                                   <div style={{marginLeft:"20px"}}>
                                        <div>
                                            {e.status}
                                        </div>
                                        <div>
                                            Materia: {e.materia}
                                        </div>
                                        <div>
                                            Nombre de la clase: {e.nombre}
                                        </div>
                                        <div>
                                            Fecha de la clase: {e.date.day}/{e.date.month}/{e.date.year} 
                                        </div>
                                        <div>
                                            Horario de la clase: {e.date.time[0]}-{e.date.time[1]}
                                        </div>
                                        <div>
                                            Precio: {e.precio}
                                        </div>

                                   </div>
                                   <div  style={{marginLeft:"35vw"}}>
                                        <Button onClick={() => handleShow(i)}> Puntuar clase </Button>
                                        <Puntuar key={i}id={e.id} show={show[i]} handleClose={() => handleClose(i)} clase={e} alum={alum} index={i} />
                                   </div>
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