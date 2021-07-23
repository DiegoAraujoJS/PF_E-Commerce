import React,{ useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./Claim.module.css";
import { ClaimType } from "./Claims";

function Claim(props: React.PropsWithChildren<ClaimType>) {

  return (
    <div className={style.container}>
      <h5>{props.nombre}</h5>
      <p className={style.description}>{props.reclamo}</p>
      <span>#{props.id}</span>
      <Link className={style.btn} to={`/claim/${props.id}`}>
        {" "}
        Visualizar{" "}
      </Link>
    </div>
  );
}

export default Claim;
