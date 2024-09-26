import { useState, useEffect } from "react";
import style from "./DetailClaim.module.css";
import Swal from "sweetalert2";
import axios from "axios";
import { Button } from "react-bootstrap";
import ChatAdmin from "../Chat/ChatAdmin";
import { ClaimType } from "./Claims";
import { Link } from 'react-router-dom'

interface UserClaimDetail {
  mail: string;
  name: string;
  lastName: string;
  photo?: string;
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
        setClaim({
          id: response.data.id,
          nombre: response.data.nombre,
          denunciante: {
              mail: response.data.denunciante.User_mail,
              name: response.data.denunciante.name,
              lastName: response.data.denunciante.lastName,
              photo: response.data.denunciante.foto,
            },
          denunciado: {
            mail: response.data.denunciado.User_mail,
            name: response.data.denunciado.name,
            lastName: response.data.denunciado.lastName,
            photo: response.data.denunciado.foto,
          },
          admin: {
            mail: response.data.admin.User_mail,
            name: response.data.admin.name,
            lastName: response.data.admin.lastName,
            photo: response.data.admin.foto,
          },
          reclamo: response.data.reclamo,
          clase: {
            id: response.data.clase.id,
            nombre: response.data.nombre,
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  const [cancelacion, setCancelación] = useState("")

  const closeClass = async () => {
    Swal.fire({
      title: '¿Esta seguro de cerrar esta clase?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si!',
      cancelButtonText: 'No!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.get("http://localhost:3001/api/reclamos/cancelar/" + claim.clase.id)
          .then(response => {
            if (response.status === 200) {
              setCancelación(response.data.status);
            }
          })
          .catch(error => alert(error))

        Swal.fire(
          'Cancelado!',
          'La clase fue cancelada correctamente.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'La clase sigue activa',
          'error'
        )
      }
    })
  }; 

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
                src={claim.denunciante.photo}
                alt="foto perfil estudiante"
              />
              <h5 className={"w-100 m-0 p-1"}>{claim.denunciante.name}</h5>
              <Link to={`/perfil/${claim.denunciante.mail}`}>{claim.denunciante.mail}</Link>
            </div>

            <div className={"bg-white rounded-3 shadow my-2 mx-auto"}>
              <div className={"d-flex flex-row w-100 p-3"}>
                <h6 className="me-auto">{claim.nombre}</h6>
                <span>#{claim.id}</span>
              </div>
              <p className={"px-3 pb-3 m-0"}>
                Descripción: {claim.reclamo}
              </p>
              {claim.clase ?  <p className={"px-3 pb-3 m-0"}>
                Clase: {claim.clase.nombre}<br></br>
                Id de la clase: {claim.clase.id}
              </p>
              : null}
            </div>

            <div className={"rounded-3 shadow my-2 "}>
              { () => console.log(claim) }
              <ChatAdmin admin={claim.admin} user={claim.denunciante} />
            </div>
          </div>
          <div className={"w-50 d-flex flex-column p-3"}>
            <div className={"text-center mb-2"}>
              <img
                className={"img-fluid rounded-circle " + style.imgClaim}
                src={claim.denunciado.photo}
                alt="foto denunciado"
              />
              <h5 className={"w-100 m-0 p-1"}>
                {claim.denunciado.name}
              </h5>
              <Link to={`/perfil/${claim.denunciado.mail}`}><span>{claim.denunciado.mail}</span></Link>
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
            <div className={"d-flex justify-content-evenly " + style.btns}>
              <Button
                onClick={() => closeClass()}
                disabled={cancelacion === "cancelled" ? true : false}
                className="mr-2"
              >
                CANCELAR CLASE
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailClaim;
