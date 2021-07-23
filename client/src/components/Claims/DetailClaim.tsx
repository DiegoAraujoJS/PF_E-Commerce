import { useState, useEffect } from "react";
import style from "./DetailClaim.module.css";
import Swal from "sweetalert2";
import axios from "axios";
import { Button } from "react-bootstrap";
import ChatAdmin from '../Chat/ChatAdmin';
import { ClaimType } from "./Claims";

interface UserClaimDetail {
  lastName: string;
  name: string;
  mail: string;
}

interface ClaimDetailType extends ClaimType {
  denunciante: UserClaimDetail;
  denunciado: UserClaimDetail;
  admin: UserClaimDetail;
  reclamo: string;
  clase: {
    id: number;
    nombre: string;
  };
}

function DetailClaim(props) {
  const [suspendido, setSuspendido] = useState();

  const [claim, setClaim] = useState<ClaimDetailType>();

  useEffect(() => {
    if (!claim) {
      getClaim();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [claim]);

  async function getClaim() {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/reclamos/" + props.id
      );
      if (response.status === 200) {
        setClaim(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const suspender = async () => {
    const response = await axios.get(
      "http://localhost:3001/api/reclamos/suspender/" + claim.denunciado.mail
    );
    if (response.status === 200) {
      setSuspendido(response.data.suspendido);
      Swal.fire(
        "Exito!",
        "El usuario a sido suspendido correctamente!",
        "success"
      );
    }
  };
  const permitir = async () => {
    const response = await axios.get(
      "http://localhost:3001/api/reclamos/permitir/" + claim.denunciado.mail
    );
    if (response.status === 200) {
      Swal.fire("Exito!", "La cuenta del usuario esta disponible!", "success");
    }
  };

  return (
    <div className={style.fondo}>
      {claim && (
        <div className={style.container}>
          <div className={style.claim}>
            <div className={style.estudiante}>
              <img
                className={style.imagendenu}
                src="https://i.imgur.com/MRTAOWM.png"
                alt="foto perfil estudiante"
              />
              <h5 className={style.nombreEst}> {claim.denunciante.name}</h5>
              <span>{claim.denunciante.mail}</span>
            </div>
            <div className={style.description}>
              <div className={style.data}>
                <h6 className="pt-3">Nombre: {claim.nombre}</h6>
                <span>#{claim.id}</span>
              </div>
              <div className={style.detailClaim}>
                <p>Descripción: {claim.reclamo}</p>
              </div>
            </div>
            <div className={style.chat}><ChatAdmin admin={claim.admin} user={claim.denunciante}/></div>
          </div>
          <div className={style.denunciado}>
            <img
              className={style.imagendenu}
              src="https://i.imgur.com/wc7cCCs.png"
              alt="foto denunciado"
            />
            <h5 className={style.nombreEst}>Nombre: {claim.denunciado.name}</h5>
            <span>{claim.denunciado.mail}</span>
            <div className={style.detail}>Materias dictadas:</div>
            <div className={"d-flex justify-content-evenly " + style.btns}>
              <Button
                onClick={() => suspender()}
                disabled={suspendido}
                className="mr-2"
              >
                PROHIBIR
              </Button>
              <Button
                onClick={() => permitir()}
                disabled={!suspendido}
                className="ml-2"
              >
                DESHACER PROHIBICIÓN
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailClaim;
