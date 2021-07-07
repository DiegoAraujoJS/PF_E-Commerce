import React from "react";
import { Link } from "react-router-dom";
import style from './Claim.module.css';

function Claim(props) {

    let { name, description, code } = props;

    return (
        <div className = {style.container}>
            <h5>{name}</h5>
            <p style={{height: '30px', 
        width: '430px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'}}>{description}</p>
            <span>#{code}</span>
            <Link className = {style.btn} to = { `/claim/${code}` }> Visualizar </Link>
        </div>
    )   
}

export default Claim;