import React, { useEffect, useState } from 'react';
import style from "./perfilAlumno.module.css"
import axios from "axios"
import getCookieValue from '../../cookieParser';
import icon_edit from '../../images/editar.png'
import { useHistory } from "react-router-dom";

const PerfilAlumno = ({email}) => {
    const history = useHistory();
    const [userLoged, setUserLoged] = useState<any>({});
    const [alumno, setAlumno] = useState<any>({
        User_mail: "",
        name: "",
        lastName: "",
        city: "",
        title:"",
        foto: "",
        description: "", 
        score: 0
    
    })
    const fetchAlumno = async () => {
        try {
           
            if (email) {
                const response = await axios.get(`http://localhost:3001/api/usuarios/${email}`)
              
                await setAlumno({
                    ...response.data
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
    const handleClick = (e) => {
        e.preventDefault();
        if(userLoged.mail === email){
            history.push('/editPerfilAlumno')
        }else{
            alert("no puedes editar este perfil")
        }
    }
    const getUserLoged = async () => {
        const token = getCookieValue("token").slice(
          1,
          getCookieValue("token").length - 1
        );
        let userResponse = await axios.post(
          `http://localhost:3001/api/verify`,
          {},
          { withCredentials: true, headers: { Authorization: token } }
        );
        setUserLoged(userResponse.data);
        console.log("ESTE ES EL RESPONSE",userResponse.data)

      };
    useEffect(() => {
        fetchAlumno()
        getUserLoged()
    }, []);
    return (
        <div>
         <section className={style.sectionOne}>
    <div className={style.profileContainer}>
        <div className={style.icon}>
         <img src={icon_edit} className={style.image_icon}onClick={ (e) => handleClick(e)}/>
        <p className="small mb-4"> <i className="fas fa-map-marker-alt mr-2"></i>Editar tu perfil</p>
        </div>
  
        <img src={alumno.foto} alt="..." width="130" height="130" className={style.profile} />
        <div className="media-body mb-5">
            <h4 className="mt-0 mb-0">{alumno.name} {alumno.lastName} </h4>
            <p className="small mb-4"> <i className="fas fa-map-marker-alt mr-2"></i>{alumno.city}</p>
        </div>
        <h1>{alumno.title}</h1>
        <p className={style.description}>{alumno.description}</p>
    </div>

</section>
        </div>
    )
}

export default PerfilAlumno
