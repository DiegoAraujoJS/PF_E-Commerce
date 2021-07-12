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



export { getByIdClaim }