import {updateObject} from '../../store/utility';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    counter: 0
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INCREMENT:
            return updateObject(state, {counter: state.counter + 1});
        case actionTypes.DECREMENT:
            return updateObject(state, {counter: state.counter - 1});
        case actionTypes.ADD:
            return updateObject(state, {counter: state.counter + action.payload.value});
        case actionTypes.SUBTRACT:
            return updateObject(state, {counter: state.counter - action.payload.value});
        default:
            return state;
    }
};

export default reducer;
