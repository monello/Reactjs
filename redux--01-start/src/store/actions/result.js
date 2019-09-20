import {DELETE_RESULT, STORE_RESULT} from "./actionTypes";

export const saveResult = payload => {
    return {
        type: STORE_RESULT,
        payload: payload
    }
};

export const storeResult = payload => {
    return dispatch => {
        setTimeout(() => {
            dispatch(saveResult(payload));
        }, 2000);
    }
};

export const deleteResult = payload => {
    return {
        type: DELETE_RESULT,
        payload: payload
    }
};
