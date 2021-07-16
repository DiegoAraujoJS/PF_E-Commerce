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
    user_lastName: ''
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
        case actionsType.SET_USER_DATA:
            console.log(action.payload);
            return {
                ...state,
                user_mail: action.payload.mail,
                user_name: action.payload.mail,
                user_lastName: action.payload.lastName
            }
        default:
            return state
    }
};

export default all;
