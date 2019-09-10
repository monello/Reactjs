import React, {Component} from 'react';
import {connect} from 'react-redux';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {
    render() {
        return (
            <div>
                <CounterOutput value={this.props.ctr}/>
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter}/>
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}/>
                <CounterControl label="Add 5" clicked={() => this.props.onAddCounter(5)}/>
                <CounterControl label="Subtract 5" clicked={() => this.props.onSubtractCounter(5)}/>
            </div>
        );
    }
}

const mapStoreToProps = state => {
    return {
        ctr: state.counter
    }
};


const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter: () => dispatch({type: 'INCREMENT'}),
        onDecrementCounter: () => dispatch({type: 'DECREMENT'}),
        onAddCounter: (value) => dispatch({
            type: 'ADD',
            payload: {
                value: value
            }
        }),
        onSubtractCounter: (value) => dispatch({
            type: 'SUBTRACT',
            payload: {
                value: value
            }
        })
    }
};

export default connect(mapStoreToProps, mapDispatchToProps)(Counter);