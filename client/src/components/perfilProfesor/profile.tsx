import React, { useEffect, useState } from 'react';
import './profile.css'
import axios from "axios"


interface Profesor {
    email: string
    nombre: string
    apellido: string
    profesor: Object
}


function Profile(){
    const  [prof, setProf]=useState<any>({})
    
    const fetchProfs = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/profesores/edwardburgos@gmail.com`)
            if (response) {
                setProf(response.data)
            } 
        } catch {
            console.log('error')
        }
        
        
    }
    useEffect(()=>{
        fetchProfs()
    }, []);
    
    return (
    <div className="row py-5 px-4">
    <div className="col-md-5 mx-auto">
     
        <div className="bg-white shadow rounded overflow-hidden">
            <div className="px-4 pt-0 pb-4 cover">
                <div className="media align-items-center profile-head">
                
                    <div className="profile"><img src={prof.profesor.foto} alt="..." width="130" height="130" className="profile"/>
                  
                    </div>
                    <div className="rate">
                        <input type="radio" id="star5" name="rate" value="5" />
                        <label htmlFor="star5" title="text">5 stars</label>
                        <input type="radio" id="star4" name="rate" value="4" />
                        <label htmlFor="star4" title="text">4 stars</label>
                        <input type="radio" id="star3" name="rate" value="3" />
                        <label htmlFor="star3" title="text">3 stars</label>
                        <input type="radio" id="star2" name="rate" value="2" />
                        <label htmlFor="star2" title="text">2 stars</label>
                        <input type="radio" id="star1" name="rate" value="1" />
                        <label htmlFor="star1" title="text">1 star</label>
            </div>
                   
                    <div className="media-body mb-5">
                        <h4 className="mt-0 mb-0">{prof.nombre} {prof.apellido} </h4>
                        <p className="small mb-4"> <i className="fas fa-map-marker-alt mr-2"></i>{prof.profesor.ciudad}</p>
                    </div>
                  
                </div>
            </div>
            <div className="bg-light p-4 d-flex justify-content-center text-center">
            
          {/*     {<ul className="list-inline mb-0">
                    <li>Aqui va el calendario</li>
                </ul>} */}
            </div>
            <div className="px-4 py-3">
                <h5 className="mb-0">Licenciado en matematica</h5>
                <div className="p-4 rounded shadow-sm bg-light">
                    <p className="font-italic mb-0">{prof.profesor.descripcion}</p>
                    <p className="font-italic mb-0"></p>
                    <p className="font-italic mb-0">Trabajo en ...</p>
                </div>
            </div>
            <div className="py-4 px-4">
                
            </div>
        </div>
    </div>
</div>
    )
}

export default Profile