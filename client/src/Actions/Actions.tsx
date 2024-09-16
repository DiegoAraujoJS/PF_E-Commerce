import axios from "axios";
import { actionsType } from "../constants/constants";

// const GET_BY_ID = 'GET_BY_ID_CLAIM';
// const SEARCH_INPUT = 'SEARCH_INPUT'

const getByIdClaim = (id) => {
    return async (dispatch) => {
        //const resp = await axios.get('http://localhost:3001/api/claim/' + id)
        const resp = {data:[]} // descomentar axios cuando se tenga la base de Datos y borrar esta linea
        dispatch({type: actionsType.GET_BY_ID, payload: resp.data})
    }
};

const getAllClaims = () => {
    return async (dispatch) => {
        try{
        const response = await axios.get('http://localhost:3001/api/reclamos/all')
        dispatch({type: actionsType.GET_ALL_CLAIMS, payload: response.data})
      }
      catch(err){
          console.log(err)
      }
    }
};

const getUserLoged = (payload) => {
    console.log(payload);
    return (dispatch) => {
        try{
            return dispatch({type: actionsType.SET_USER_DATA, payload: payload})
        } catch(err) {
            console.log(err)
        }
    }
}

const modificarClasesPorComprar = (clasesPorComprar) => {
    return {
        type: 'MODIFICAR_CLASES_POR_COMPRAR',
        clasesPorComprar
    }
}

const set_calendar_data = (calendarArray) => {
    return {
        type: actionsType.SET_FETCH_CALENDAR,
        payload: calendarArray
    }
}

export { getByIdClaim, getAllClaims, getUserLoged, modificarClasesPorComprar, set_calendar_data}