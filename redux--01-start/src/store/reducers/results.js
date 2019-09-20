import {updateObject} from '../../store/utility';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    results: []
};

const deleteResult = (state, action) => {
    const newArray = state.results.filter(result => result.id !== action.payload.resultId);
    return updateObject(state, {results: newArray});
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_RESULT:
            return updateObject(state, {results: state.results.concat({id: new Date(), value: action.payload.counter})})
        case actionTypes.DELETE_RESULT:
            return deleteResult(state, action);
        default:
            return state;
    }
};

export default reducer;
