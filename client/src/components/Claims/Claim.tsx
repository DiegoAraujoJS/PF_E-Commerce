import { Link } from "react-router-dom";
import style from './Claim.module.css';

function Claim(props) {

    let { nombre, detalle, id } = props;

    return (
        <div className = {style.container}>
            <h5>{nombre}</h5>
            <p className = { style.description }>{detalle}</p>
            <span>#{id}</span>
            <Link className = {style.btn} to = { `/claim/${id}` }> Visualizar </Link>
        </div>
    )   
}

export default Claim;