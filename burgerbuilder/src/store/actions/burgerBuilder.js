import * as actionTypes from './actionTypes';
import axios from "../../axios-orders";

export const addIngredient = (ingredient) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        payload: {
            ingredient: ingredient
        }
    }
};

export const removeIngredient = (ingredient) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        payload: {
            ingredient: ingredient
        }
    }
};

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
};

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://my-react-course-project-15ec1.firebaseio.com/ingredients.json')
            .then( response => {
                console.log("Response:", response);
                dispatch(setIngredients(response.data));
            })
            .catch( error => {
                dispatch(fetchIngredientsFailed());
            })
    };
};