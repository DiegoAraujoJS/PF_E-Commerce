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

const getAll = () => {
    return async (dispatch) => {
        try{
        const response = await axios.get('http://localhost:3001/api/clases/all')
        dispatch({type: actionsType.GET_ALL_CLASS, payload: response.data})
      }
      catch(err){
          console.log(err)
      }
    }
};

export { getByIdClaim, getAll }