import React, { useEffect, useState } from 'react';
import style from './profile.module.css'
import axios from "axios"
import Calendar from "../calendar/Calendar"
import { IProfesor} from '../../../../interfaces';
import getCookieValue from '../../cookieParser';
import ChatRoom from '../Chat/ChatRoom';
import icon_edit from '../../images/editar.png'
import { useHistory, Link} from "react-router-dom";
import star from '../../images/star.png'
import PerfilAlumno from '../perfilAlumno/perfilAlumno';
import { Rating, RatingView } from 'react-simple-star-rating';

const Role = {
    USER: 0,
    PROFESSOR: 1,
    ADMIN: 2
}


function Profile(email,{user}) {
    console.log("ESTE ES EL USER",user)
    const history = useHistory()
    const [userLoged, setUserLoged] = useState<any>({});
    const [userProfile,setuserProfile] = useState<any>({});
    const propEmail = {
        email: email && email.children ? email.children[0] : null
    }
    
    const [prof, setProf] = useState<IProfesor>({
        User_mail: "",
        name: "",
        lastName: "",
        city: "",
        title:"",
        foto: "",
        description: "", 
        score: 0,
        country: "",
        state: ""

    })
  const ShowData = () => {
      if(userProfile.role === 1 ){
  return (
      <div>
       <div className={style.container}>

<section className={style.sectionOne}>
    <div className={style.profileContainer}>
        <div className={style.icon}>
        <img src={icon_edit} className={style.image_icon}onClick={ (e) => handleClick(e)}/>
        <p className="small mb-4"> <i className="fas fa-map-marker-alt mr-2"></i>Editar tu perfil</p>
        </div>
  
        <img src={prof.foto} alt="..." width="130" height="130" className={style.profile} />
        <div className="media-body mb-5">
            <h4 className="mt-0 mb-0">{prof.name} {prof.lastName} </h4>
            <p className="small mb-4"> <i className="fas fa-map-marker-alt mr-2"></i>{prof.state}, {prof.country}</p>
        </div>
        <h1>{prof.title}</h1>
        <p className={style.description}>{prof.description}</p>
        {prof.howMany>=0? <RatingView ratingValue={prof.score} /* RatingView Props */ /> :"Este profesor no tiene suficientes reviews"}

        
        <div className={style.scrolldown}></div>
    </div>

</section>

<section className={style.sectionTwo}>
    <h4 className={style.h4Prof + " d-flex justify-content-center pt-4 m-0"} style={{color:"#0d6efd"}}>Aca podrás ver sus horarios disponibles:</h4>
    <br />
    <div className="d-flex justify-content-center mb-3"><Link to="/calendarAdd"><button className={style.agregaDisponibilidad} style={{ width: "400px" }}>Agrega un nueva disponibilidad horaria</button></Link></div>
    <div className={style.calendarContainer}>
        <Calendar {...propEmail} />
    </div>
</section>
{/* <section className={style.sectionThree}>
    <div>
        { userLoged ? <ChatRoom userLoged={userLoged} userReference={{mail: prof.User_mail, role: Role.PROFESSOR, name: prof.name, lastName: prof.lastName}}  /> : null}
    </div>
</section> */}


</div>
      </div>
  )
      }else if (userProfile.role === 0){
          return ( <PerfilAlumno email={propEmail.email}/>)
      }
  }
    // const profesorArr = [];
    const fetchUser = async () => {
        try {
           
            if (propEmail) {
                const response = await axios.get(`http://localhost:3001/api/usuarios/${propEmail.email}`)
              
                await setuserProfile({
                    ...response.data
                })
            }
        } catch (err) {
            console.log(err)
        }
    }

    const fetchProfs = async () => {
        try {
           
            if (propEmail) {
                
                const response = await axios.get(`http://localhost:3001/api/profesores/${propEmail.email}`)
                
                await setProf({
                    ...response.data
                })
                console.log(prof.title)
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
        if(userLoged.mail === propEmail.email){
            history.push('/editPerfil')
        }else{
            alert("no puedes editar este perfil")
        }
    }

    useEffect(() => {
        fetchProfs()
        getUserLoged()
        fetchUser()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (
       <div>
     {ShowData()}
       </div>
    )
}

export default Profile