import { Link } from "react-router-dom";
import style from './Claim.module.css';

function Claim(props) {

    let { name, description, code } = props;

    return (
        <div className = {style.container}>
            <h5>{name}</h5>
            <p className = { style.description }>{description}</p>
            <span>#{code}</span>
            <Link className = {style.btn} to = { `/claim/${code}` }> Visualizar </Link>
        </div>
    )   
}

export default Claim;