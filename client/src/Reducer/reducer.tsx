import { actionsType } from '../constants/constants';

let initialState = {
    searchInput: '',
    professors: [{ name: 'ariel' }, { name: 'asd' }],
    professor: [],
    claim: [],
    class: {},
    clases: [],
    user_mail: '',
    user_name: '',
    user_lastName: '',
    clasesPorComprar: [],
    calendar_to_addClassStudent: {}
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
        case actionsType.CALENDAR_TO_ADDCLASS:
            return {
                ...state,
                calendar_to_addClassStudent: action.payload
            }
        default:
            return state
    }
};

export default all;