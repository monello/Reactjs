import * as actionTypes from '../actions';

const initialState = {
    counter: 0
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INCREMENT:
            // Understanding the following return statement:
            // - It returns an Object
            // - We spread all the properties in state, which makes a clone of the state.
            // - We add or overwrite the counter property. In this case we overwrite the counter property because it already exists in state (see initialState declaration)
            return {
                ...state,
                counter: state.counter + 1
            };
        case actionTypes.DECREMENT:
            return {
                ...state,
                counter: state.counter - 1
            };
        case actionTypes.ADD:
            return {
                ...state,
                counter: state.counter + action.payload.value
            };
        case actionTypes.SUBTRACT:
            return {
                ...state,
                counter: state.counter - action.payload.value
            };
        default:
            return state;
    }
};

export default reducer;
