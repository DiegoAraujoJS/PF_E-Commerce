import React, { useEffect, useState } from 'react';
import style from './profile.module.css'
import axios from "axios"
import Calendar from "../calendar/Calendar"
import { ProfesorProps} from '../../../../interfaces';
import getCookieValue from '../../cookieParser';
import ChatRoom from '../Chat/ChatRoom';
import icon_editar from '../../images/editar_perfil.png'
import { useHistory } from "react-router-dom";
const Role = {
    USER: 0,
    PROFESSOR: 1,
    ADMIN: 2
}


function Profile(email) {
    const history = useHistory()
    const [userLoged, setUserLoged] = useState();
    const propEmail = {
        email: email && email.children ? email.children[0] : null
    }
    
    const [prof, setProf] = useState<ProfesorProps>({
        User_mail: "",
        name: "",
        lastName: "",
        city: "",
        foto: "",
        description: "", 
        score: 0

    })

    // const profesorArr = [];

    const fetchProfs = async () => {
        try {
           
            if (propEmail) {
                const response = await axios.get(`http://localhost:3001/api/profesores/${propEmail.email}`)
              
                await setProf({
                    ...response.data
                })
                
            }else
            {
             

            }
        } catch (err) {
            console.log(err)
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
      };
      const handleClick = (e) => {
        e.preventDefault();
        history.push('/editPerfil')
 
    }

    useEffect(() => {
        fetchProfs()
        getUserLoged()

 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (
        <div className={style.container}>

            <section className={style.sectionOne}>
                <div className={style.profileContainer}>
                <img src={icon_editar} className={style.icon} onClick={ (e) => handleClick(e)}/>
                    <img src={prof.foto} alt="..." width="130" height="130" className={style.profile} />
                    <div className="media-body mb-5">
                        <h4 className="mt-0 mb-0">{prof.name} {prof.lastName} </h4>
                        <p className="small mb-4"> <i className="fas fa-map-marker-alt mr-2"></i>{prof.city}</p>
                    </div>
                    <h1> Licenciado en Cs Naturales</h1>
                    <h4>{prof.description}</h4>
                </div>

            </section>

            <section className={style.sectionTwo}>
                <h4 className={style.h4Prof}>Aca podrás ver sus horarios disponibles:</h4>
                <br />
                <div className={style.calendarContainer}>
                    <Calendar {...propEmail} />
                </div>
            </section>
            <section className={style.sectionThree}>
                <div>
                    {/* { userLoged ? <ChatRoom userLoged={userLoged} userReference={{mail: prof.User_mail, role: Role.PROFESSOR, name: prof.name, lastName: prof.lastName}}  /> : null} */}
                </div>
            </section>
            

        </div>
    )
}

export default Profile