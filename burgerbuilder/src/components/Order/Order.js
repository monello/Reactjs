import React from 'react';

import classes from './Order.module.css';

const order = (props) => {
    const ingredientsOutput = Object.keys(props.ingredients).map(ingredientName => (
        <span className={classes.Ingredient}
              key={ingredientName}>{ingredientName} ({props.ingredients[ingredientName]})</span>
    ));
    return (
        <div className={classes.Order}>
            <h2>Order</h2>
            <p>Ingredients: {ingredientsOutput}</p>
            <p>Price: <strong>R {props.price.toFixed(2)}</strong></p>
        </div>
    )
};

export default order;
