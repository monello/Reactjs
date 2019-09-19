import React, {Component} from 'react';
import axios from '../../axios-orders';
import {connect} from 'react-redux';

// HOC
import Aux from '../../hoc/Aux/Aux'
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

// Component
import Burger from '../../components/Burger/Burger'
import BurgerControls from '../../components/Burger/BuildControls/BuildControls'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

// UI
import Spinner from '../../components/UI/Spinner/Spinner';
import Modal from '../../components/UI/Modal/Modal';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        console.log("[componentDidMount] this.props:", this.props);
        // axios.get('https://my-react-course-project-15ec1.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         console.log("Response:", response);
        //         this.setState({ingredients: response.data})
        //     })
        //     .catch(error => {
        //         this.setState({error: true});
        //     })
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
        let burger = this.state.error ? <p>Unable to load the ingredients</p> : <Spinner/>
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
        if (this.state.loading) {
            orderSummary = <Spinner/>
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
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ingredient) => dispatch({
            type: actionTypes.ADD_INGREDIENT,
            payload: {
                ingredient: ingredient
            }
        }),
        onRemoveIngredient: (ingredient) => dispatch({
            type: actionTypes.REMOVE_INGREDIENT,
            payload: {
                ingredient: ingredient
            }
        }),
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));