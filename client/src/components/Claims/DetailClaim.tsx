import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router';
import { getByIdClaim } from '../../Actions/Actions';

import style from './DetailClaim.module.css';
import Swal from "sweetalert2";

import { UserProps } from "../../../../interfaces";
import axios from "axios";
import { Button } from "react-bootstrap";

interface Claim {
    Denunciante_email: string, Denunciado_email: string, reclamo: string
}

function DetailClaim() {
    const [suspendido, setSuspendido] = useState()

    let { id: code } = useParams();
    let [id] = useState(code);

    const dispatch = useDispatch();
    const claim = useSelector(state => state['claim']);
    let { name, codeClaim, detail, img, denunciante_email, description } = claim;

    useEffect(() => {
        dispatch(getByIdClaim(id))
    }, [dispatch, id]);


    const [getClaim, setClaim] = useState<{ reclamo: Claim, denunciante: UserProps, denunciado: UserProps }>({
        reclamo: { Denunciante_email: "", Denunciado_email: "", reclamo: "" },
        denunciante: { name: "", lastName: "", mail: "", role: 0, city: "", },
        denunciado: { name: "", lastName: "", mail: "", role: 0, city: "", },
    })

    useEffect(() => {
        async function getClaim() {
            const response = await axios.get('http://localhost:3001/api/reclamos/claim/' + id)
            if (response.status === 200) {
                setClaim(response.data)
            }
        }
        getClaim()
    }, [])

    const suspender = async () => {
        const response = await axios.get('http://localhost:3001/api/reclamos/suspender/' + getClaim.reclamo.Denunciado_email)
        if (response.status === 200) {
            setSuspendido(response.data.suspendido)
            Swal.fire(
                'Exito!',
                'El usuario a sido suspendido correctamente!',
                'success'
            )
        }
    }
    const permitir = async () => {
        const response = await axios.get('http://localhost:3001/api/reclamos/permitir/' + getClaim.reclamo.Denunciado_email)
        if (response.status === 200) {
            Swal.fire(
                'Exito!',
                'La cuenta del usuario esta disponible!',
                'success'
            )
        }
    }



    return (
        <div className={style.fondo}>
            <div className={style.container}>
                <div className={style.claim}>
                    <div className={style.estudiante}>
                        <img className={style.imagendenu} src='https://i.imgur.com/MRTAOWM.png' alt='foto perfil estudiante' />
                        <h5 className={style.nombreEst}> {getClaim.denunciante.name}</h5>
                        <p>Estudiante</p>
                        <span>{denunciante_email}</span>
                    </div>
                    <div className={style.description}>
                        <div className={style.data}>
                            <h6 className="pt-3">name: {name}</h6>
                            <span>#{codeClaim}</span>
                        </div>
                        <div className={style.detailClaim}>
                            <p>descripcion: {description}</p>
                            <p className="pb-3">detalle{detail}</p>
                        </div>
                    </div>
                    <div className={style.chat}>
                        Chat
                    </div>
                </div>
                <div className={style.denunciado}>
                    <img className={style.imagendenu} src='https://i.imgur.com/wc7cCCs.png' alt='foto denunciado' />
                    <h5 className={style.nombreEst}>Nombre: {getClaim.denunciado.name}</h5>
                    <div className={style.detail}>
                        Materias dictadas:
                    </div>
                    <div className={"d-flex justify-content-evenly " + style.btns}>
                        <Button onClick={() => suspender()} disabled={suspendido} className="mr-2">PROHIBIR</Button>
                        <Button onClick={() => permitir()} disabled={!suspendido} className="ml-2">DESHACER PROHIBICIÓN</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailClaim;