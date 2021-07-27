import React from 'react'
import bootstrap from "bootstrap"
import MauroFoto from "../../images/Mauro-Foto.jpg"

const AboutCard = () => {
    return (
        <div className="card">
            <img src={MauroFoto} alt =""/>
        <div className="card-body">
            <h4 className="card-title"> my title</h4>
            <p className="card-text"> SADSADSADASDSA</p>
        </div>
        </div>
    )
}

export default AboutCard
