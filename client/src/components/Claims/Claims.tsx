import { useEffect } from "react";
import { connect } from "react-redux";
import { getAllClaims } from "../../Actions/Actions";
import Claim from "./Claim";
import style from './Claims.module.css';

function Claims({claims, getAllClaims}) {

    //let { claims } = props;

    useEffect(()=>{
        getAllClaims()
    },[])

    return (
        <div className = {style.container}>
            <h2>RECLAMOS</h2>
            {claims && Array.isArray(claims) && claims.length && claims.map((c,i) => (
                <Claim
                    name = { c.reclamo.name }
                    detalle = { c.reclamo.detalle }
                    id = { c.id }
                    key = {i}
                />
            ))}
        </div>
    )
}

const mapStateToProps = (state) =>{
    return {
        claims : state.claims
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
    getAllClaims : () => dispatch(getAllClaims())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Claims);