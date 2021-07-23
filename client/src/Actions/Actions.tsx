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

const modificarCantidadClasesPorComprar = (cantidadClasesPorComprar) => {
    return {
        type: 'MODIFICAR_CANTIDAD_CLASES_POR_COMPRAR',
        cantidadClasesPorComprar
    }
}

const modificarUsuarioLogueado = (user) => {
    return {
        type: 'MODIFICAR_USUARIO_LOGUEADO',
        user
    }
}

const modificarEstadoLogueado = (logueado) => {
    return {
        type: 'MODIFICAR_ESTADO_LOGUEADO',
        logueado
    }
}



export { getByIdClaim, getAll, getUserLoged, modificarClasesPorComprar, modificarUsuarioLogueado, modificarEstadoLogueado, modificarCantidadClasesPorComprar}