import { actionsType } from '../constants/constants';
import { auth } from '../firebase';

let initialState = {
    searchInput: '',
    professors: [{ name: 'ariel' }, { name: 'asd' }],
    professor: [],
    claim: [],
    class: {},
    clases: [],
    cantidadClasesPorComprar: 0,
    user: '',
    user_mail: '',
    user_name: '',
    user_lastName: '',
    user_photo: '',
    clasesPorComprar: false,
    logueado: false
};

const all = (state = initialState, action) => {
    switch (action.type) {
        case actionsType.GET_BY_ID:
            return {
                ...state,
                claim: action.payload
            }
        case actionsType.SEARCH_INPUT:
            return {
                ...state,
                searchInput: action.payload
            }
        case actionsType.GET_ALL_CLASS:
            return {
                ...state,
                clases: action.payload
            }
        case actionsType.MODIFICAR_CLASES_POR_COMPRAR:
            return {
                ...state,
                clasesPorComprar: action.clasesPorComprar
            }
        case actionsType.MODIFICAR_USUARIO_LOGUEADO:
            return {
                ...state,
                user: action.user
            }
        case actionsType.MODIFICAR_CANTIDAD_CLASES_POR_COMPRAR:
            return {
                ...state,
                cantidadClasesPorComprar: action.cantidadClasesPorComprar
            }
        case actionsType.MODIFICAR_ESTADO_LOGUEADO:
            return {
                ...state,
                logueado: action.logueado
            }
        case actionsType.SET_USER_DATA:
            console.log(action.payload);
            return {
                ...state,
                user: {
                    user_mail: action.payload.mail !== "" && action.payload.mail,
                    user_name: action.payload.name !== "" && action.payload.name,
                    user_lastName: action.payload.lastName !== "" && action.payload.lastName,
                    user_city: action.payload.user_city !== "" && action.payload.user_city
                }
            }
        default:
            return state
    }
};

export default all;