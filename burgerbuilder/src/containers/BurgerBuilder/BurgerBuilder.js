import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from '../../axios-orders';
// HOC
import Aux from '../../hoc/Aux/Aux'
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

// Component
import Burger from '../../components/Burger/Burger'
import BurgerControls from '../../components/Burger/BuildControls/BuildControls'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

// UTILS
import * as actions from '../../store/actions/index';

// UI
import Spinner from '../../components/UI/Spinner/Spinner';
import Modal from '../../components/UI/Modal/Modal';

class BurgerBuilder extends Component {
    state = {
        purchasing: false
    };

    componentDidMount() {
        console.log("[componentDidMount] this.props:", this.props);
        this.props.onInitIngredients();
    }

    updatePurchaseState = () => {
        const sum = Object.keys(this.props.ingredients)
            .map(key => this.props.ingredients[key])
            .reduce((acc, curr) => acc + curr, 0);
        return sum > 0;
    };

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    };

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = this.props.error ? <p>Unable to load the ingredients</p> : <Spinner/>;
        if (this.props.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients}/>
                    <BurgerControls
                        ingredientAdded={this.props.onAddIngredient}
                        ingredientRemoved={this.props.onRemoveIngredient}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState()}
                        purchasing={this.purchaseHandler}
                        totalPrice={this.props.totalPrice}/>
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ingredients}
                total={this.props.totalPrice.toFixed(2)}
                modalClose={this.purchaseCancelHandler}
                orderContinue={this.purchaseContinueHandler}
            />;
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClose={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    };
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ingredient) => dispatch(actions.addIngredient(ingredient)),
        onRemoveIngredient: (ingredient) => dispatch(actions.removeIngredient(ingredient)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));