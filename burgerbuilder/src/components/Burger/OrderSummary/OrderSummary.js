import React from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
                </li>);
        });

    return (
        <Aux>
            <h3>Order Summary</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Order Total: {props.total}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType={'Danger'} clicked={props.modalClose}>CANCEL</Button>
            <Button btnType={'Success'} clicked={props.orderContinue}>CONTINUE</Button>
        </Aux>
    );
};

export default orderSummary;