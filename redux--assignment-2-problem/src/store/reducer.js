import * as actionTypes from './actions';

const initialState = {
    persons: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_PERSON:
            return {
                ...state,
                persons: state.persons.concat(action.payload.person)
            };
        case actionTypes.DELETE_PERSON:
            const newArray = state.persons.filter(person => person.id !== action.payload.personId);
            return {
                ...state,
                persons: newArray
            };
        default:
            return state;
    }
};

export default reducer;