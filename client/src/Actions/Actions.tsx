import axios from "axios";
import { actionsType } from "../constants/constants";

const GET_BY_ID = 'GET_BY_ID_CLAIM';
// const SEARCH_INPUT = 'SEARCH_INPUT'


const getByIdClaim = (id) => {
    return async (dispatch) => {
        //const resp = await axios.get('http://localhost:3001/api/claim/' + id)
        const resp = {data:[]} // descomentar axios cuando se tenga la base de Datos y borrar esta linea
        dispatch({type: actionsType.GET_BY_ID, payload: resp.data})
    }
};


function newClass ( data ) {
    return (dispatch) => {
        axios.post("http://localhost:3001/api/clases/add", data)
            .then(response => {
                dispatch({ type: actionsType.NEW_CLASS , payload: response.data }) 
            })
            .catch(err => { 
                dispatch({ type: actionsType.NEW_CLASS, payload: null })
            })    
        }
}

function registerAction ( data ) {
    return (dispatch) => {
        axios.post('http://localhost:3001/api/session/register', data)
            .then(response => {
                dispatch({ type: actionsType.NEW_REGISTER , payload: response.data }) 
            })
            .catch(err => { 
                dispatch({ type: actionsType.NEW_REGISTER, payload: null })
            })    
        }
}

export { getByIdClaim , newClass, registerAction}