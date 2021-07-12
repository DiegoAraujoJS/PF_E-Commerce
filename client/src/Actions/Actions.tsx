import axios from "axios";
import { actionsType } from "../constants/constants";

const getByIdClaim = (id) => {
    return async (dispatch) => {
        //const resp = await axios.get('http://localhost:3001/api/claim/' + id)
        const resp = {data:[]} // descomentar axios cuando se tenga la base de Datos y borrar esta linea
        dispatch({type: actionsType.GET_BY_ID, payload: resp.data})
    }
};


function newClass ( data: Object ) {
    return (dispatch) => {
        console.log(data)
        axios.post("http://localhost:3001/clases/add", data)
            .then(response => {
                dispatch({ type: actionsType.NEW_CLASS , payload: response.data }) 
            })
            .catch(err => { dispatch({ type: actionsType.NEW_CLASS, payload: "Error" })})    
        }
}




export { getByIdClaim , newClass}