import React from 'react'
import { Container } from 'react-bootstrap'
import "../historial/Historial.module.css"
import { useEffect, useState } from 'react'
import { Button, Card, Col, ListGroup, Modal, Row, } from 'react-bootstrap'
import axios from 'axios'
import Puntuar from '../puntuar/Puntuar'
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
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
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
            await setAlum(userResponse.data.mail)            
            const response = await axios.get(`http://localhost:3001/api/clases/all/${userResponse.data.mail}`)
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
    
    return (
        <div class="container" >
            <h1>Mi historial de cursos</h1>
            
            <ul style={classListContainer}>
                {historia.map((e, i)=>{
                    console.log("ESTO ES E", e)
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
                                        <Button onClick={() => handleShow()}> Puntuar clase </Button>
                                        <Puntuar key={e.id}id={e.id} show={show} handleClose={handleClose} clase={e} alum={alum} index={i} />
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
