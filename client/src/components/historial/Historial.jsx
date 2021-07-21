import React from 'react'
import { Container } from 'react-bootstrap'
import "../historial/Historial.module.css"
import { useEffect, useState } from 'react'
import axios from 'axios'
const Historial = () => {
    const [historia, setHistoria]=useState([])
    const fetchHistorial = async () => {
        try {
           
            if (true) {
                const response = await axios.get(`http://localhost:3001/api/profesores/mauroleonel@gmail.com`)
                console.log("RESPONSE", response)
                await setHistoria({
                    ...response.data
                })
                
            }else
            {
             

            }
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(()=>{
        fetchHistorial()
    },[])
    console.log("Historia", historia)
    return (
        <div class="container" >
            <h1>Mi historial de cursos</h1>
            
            <Container style={{background:"silver", borderColor:"red", borderRadius:"20px"}}>
                <div></div>
            </Container>

            
        </div>
    )
}

export default Historial
