import {ADD, DECREMENT, INCREMENT, SUBTRACT} from "./actionTypes";

export const increment = () => {
    return {
        type: INCREMENT
    }
};

export const decrement = () => {
    return {
        type: DECREMENT
    }
};

export const add = payload => {
    return {
        type: ADD,
        payload: payload
    }
};

export const subtract = payload => {
    return {
        type: SUBTRACT,
        payload: payload
    }
};
