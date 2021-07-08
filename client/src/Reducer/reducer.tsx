let initialState = {
    professors: [{name:'ariel'}, {name:'asd'}],
    professor: [],
    claim:[]
};

const all = (state = initialState, action) => {
    switch (action.type) {

        case 'GET_BY_ID_CLAIM':
            return {
                ...state,
                claim: action.payload
            }

        default:
            return state
    }
};

export default all;
