import React, { useEffect, useState } from 'react';
import style from './profile.module.css'
import axios from "axios"
import Calendar from "../calendar/Calendar"
import { ProfesorProps } from '../../../../interfaces';

function Profile(email) {
    console.log("Este deberia ser el email", email && email.children && email.children[0])
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

    const profesorArr = [];

    const fetchProfs = async () => {
        try {
            if (propEmail) {
                const response = await axios.get(`http://localhost:3001/api/profesores/${propEmail.email}`)
                setProf({
                    ...response.data
                })
                console.log(prof)
            }
            console.log("No se encontro el Email")
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchProfs()
    }, []);

    return (
        <div className={style.container}>
            <section className={style.sectionOne}>
                <div className={style.profileContainer}>
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
                <h1> Sobre mi... y como contactarme</h1>
            </section>

        </div>
    )
}

export default Profile

/*     <div className="row py-5 px-4">
    <div className="col-md-7 mx-auto">
     <section>

     </section>
     <section>

     </section>
     <section>

     </section>
        <div className="bg-white shadow rounded overflow-hidden">
            <div className="px-4 pt-0 pb-4 cover">
                <div className="media align-items-center profile-head">

                    <div className="profile"><img src={prof.foto} alt="..." width="130" height="130" className="profile"/>
                    <div><img src={prof.foto} alt="..." width="130" height="130" className={style.profile}/>
                    </div>
                    <div className={style.rate}>
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
                        <p className="small mb-4"> <i className="fas fa-map-marker-alt mr-2"></i>{prof.ciudad}</p>
                    </div>

                </div>
            </div>
            <div className="bg-light p-4 d-flex justify-content-center text-center">

            </div>
            <div className="px-4 py-3">
                <h5 className="mb-0">Licenciado en matematica</h5>
                <div className="p-4 rounded shadow-sm bg-light">
                    <p className="font-italic mb-0">{prof.descripcion}</p>
                    <p className="font-italic mb-0"></p>
                    <p className="font-italic mb-0">Trabajo en ...</p>
                </div>
            </div>
            <div>
                      <Calendar/>
                  </div>
            <div className="py-4 px-4">

            </div>
        </div>
    </div>
</div> */