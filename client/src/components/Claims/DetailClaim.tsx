import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router';
import { getByIdClaim } from '../../Actions/Actions';

import style from './DetailClaim.module.css';

function DetailClaim(){

    let { id:code } = useParams();
    let[id] = useState(code);
    
    const dispatch = useDispatch();
    const claim = useSelector( state => state['claim']);
    let { name, codeClaim, detail, img, denunciante_email, description } = claim;

    useEffect(() => {
        dispatch(getByIdClaim(id))
    }, [dispatch, id]);

    return(
        <div className = {style.fondo}>
            <div className = {style.container}>
                <div className = {style.claim}>
                    <div className= {style.estudiante}>
                        <img className = {style.imagendenu} src = 'https://i.imgur.com/MRTAOWM.png' alt = 'foto perfil estudiante'/>
                        <h5 className= {style.nombreEst}>Roberto Gomez Alaya</h5>
                        <p>Estudiante</p>
                        <span>{denunciante_email}</span>
                    </div>
                    <div className = {style.description}>
                        <div className = {style.data}>
                            <h6>name: {name}</h6>
                            <span>#{codeClaim}</span>
                        </div>
                        <div className = {style.detailClaim}>
                            <p>descripcion: {description}</p>
                            <p>detalle{detail}</p>
                        </div>
                    </div>
                    <div className = {style.chat}>
                        Chat
                    </div>
                </div>
                <div className = {style.denunciado}>
                    <img className = {style.imagendenu} src = 'https://i.imgur.com/wc7cCCs.png' alt = 'foto denunciado'/>
                    <h5 className= {style.nombreEst}>Nombre: </h5>
                    <div className = {style.detail}>
                        Materias dictadas:
                    </div>
                    <div className = {style.btns}>
                        <button className = {style.ban}>BANEADO</button>
                        <button className = {style.desb}>DESBANEAR</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailClaim;