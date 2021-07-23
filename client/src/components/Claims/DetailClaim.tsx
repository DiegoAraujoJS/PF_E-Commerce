import { useState, useEffect } from "react";
import style from "./DetailClaim.module.css";
import Swal from "sweetalert2";
import axios from "axios";
import { Button } from "react-bootstrap";
import ChatAdmin from "../Chat/ChatAdmin";
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
    Swal.fire({
      title: '¿Esta seguro de prohibir a este usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si!',
      cancelButtonText: 'No!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.get("http://localhost:3001/api/reclamos/suspender/" + claim.denunciado.mail)
          .then(response => {
            if (response.status === 200) {
              setSuspendido(response.data.suspendido);
            }
          })
          .catch(error => alert(error))

        Swal.fire(
          'Prohibido!',
          'La cuenta del usuario a sido suspendido correctamente.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'La cuenta del usuario sigue intancta',
          'error'
        )
      }
    })
  };

  const permitir = async () => {
    Swal.fire({
      title: '¿Esta seguro de eliminar la prohibición a este usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si!',
      cancelButtonText: 'No!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.get("http://localhost:3001/api/reclamos/permitir/" + claim.denunciado.mail)
          .then(response => {
            if (response.status === 200) {
              setSuspendido(response.data.suspendido);
            }
          })
          .catch(error => alert(error))

        Swal.fire(
          'Exito!',
          'La prohibición del usuario a sido eliminada correctamente.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'La cuenta del usuario sigue suspendida',
          'error'
        )
      }
    })
  };


  return (
    <div className={"container px-3 pt-3"}>
      {claim && (
        <div
          className={
            "d-flex flex-row justify-content-center p-3 " +
            "align-items-start w-100 bg-light"
          }
        >
          <div className={"w-50 d-flex flex-column p-3"}>
            <div className={"text-center mb-2"}>
              <img
                className={"img-fluid rounded-circle " + style.imgClaim}
                src="https://i.imgur.com/MRTAOWM.png"
                alt="foto perfil estudiante"
              />
              <h5 className={"w-100 m-0 p-1"}>{claim.denunciante.name}</h5>
              <span>{claim.denunciante.mail}</span>
            </div>

            <div className={"bg-white rounded-3 shadow my-2 mx-auto"}>
              <div className={"d-flex flex-row w-100 p-3"}>
                <h6 className="me-auto">{claim.nombre}</h6>
                <span>#{claim.id}</span>
              </div>
              <p className={"px-3 pb-3 m-0"}>
                Descripción: {claim.reclamo}
              </p>
            </div>

            <div className={"rounded-3 shadow my-2 mx-auto"}>
              <ChatAdmin admin={claim.admin} user={claim.denunciante} />
            </div>
          </div>
          <div className={"w-50 d-flex flex-column p-3"}>
            <div className={"text-center my-2"}>
              <img
                className={style.imgClaim}
                src="https://i.imgur.com/wc7cCCs.png"
                alt="foto denunciado"
              />
              <h5 className={"w-100 m-0 p-1"}>
                {claim.denunciado.name}
              </h5>
              <span>{claim.denunciado.mail}</span>
            </div>

            <div className={"bg-white rounded-3 shadow my-2 mx-auto w-100"}>
              <div className={"w-100"}>Materias dictadas:</div>
            </div>

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
