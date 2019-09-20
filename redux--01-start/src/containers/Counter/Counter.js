import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actionCreators from '../../store/actions/index';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {
    /**
     * Example of using my own custom increment counter and then calling the dispatch function inside it
     * The dispatch function is set up inside mapDispatchToProps and sent to the Counter component as props (all done behind the scenes through connect, provided by the react-redux package)
     * This allows me to attach my own function to the button's onClick handler and do some additional work inside the function before calling the dispatch-function
     */
    myIncrementCounter = () => {
        console.log('[Counter.js] Calling my custom myIncrementCounter() function');
        this.props.onIncrementCounter();
    };

    render() {
        /** **********
         NOTES:
         this.props.ctr and this.props.storedResults, refer to the mappings we set up in mapStoreToProps
         In the same way the this.props.{someAction} refer to the mappings in mapDispatchToProps
        ************* */
        return (
            <div>
                <CounterOutput value={this.props.ctr}/>
                <CounterControl label="Increment" clicked={this.myIncrementCounter}/>
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}/>
                <CounterControl label="Add 5" clicked={() => this.props.onAddCounter(5)}/>
                <CounterControl label="Subtract 5" clicked={() => this.props.onSubtractCounter(5)}/>
                <hr/>
                <button onClick={() => this.props.onStoreResult(this.props.ctr)}>Store Result</button>
                <ul>
                    {this.props.storedResults.map(strResult => (
                        <li key={strResult.id}
                            onClick={() => this.props.onDeleteResult(strResult.id)}>{strResult.value}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

/**
 * This function creates a state object and maps the properties in an Counter-object to relevant properties in a store
 * It is then connected using the connect() function on the export statement of the component
 * @param state
 * @returns {{ctr: *, storedResults: *}}
 */
const mapStoreToProps = state => {
    return {
        ctr: state.ctr.counter,
        storedResults: state.res.results
    }
};

/**
 * This function creates some dispatch functions and maps them to keys so that they can be used in the Counter component
 * It is then connected using the connect() function on the export statement of the component
 * @param dispatch
 * @returns {{onIncrementCounter: (function(): *), onStoreResult: (function(*=): *), onDecrementCounter: (function(): *), onAddCounter: (function(*=): *), onDeleteResult: (function(*=): *), onSubtractCounter: (function(*=): *)}}
 */
const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter: () => dispatch(actionCreators.increment()),
        onDecrementCounter: () => dispatch(actionCreators.decrement()),
        onAddCounter: value => dispatch(actionCreators.add({value: value})),
        onSubtractCounter: value => dispatch(actionCreators.subtract({value: value})),
        onStoreResult: counter => dispatch(actionCreators.storeResult({counter: counter})),
        onDeleteResult: resultId => dispatch(actionCreators.deleteResult({resultId: resultId}))
    }
};

/**
 * This connect function literally connects the returned objects from the given function to the Component it is connected to
 * It sends these return object to the Component as props, so inside the component you access these through "this.props"
 */
export default connect(mapStoreToProps, mapDispatchToProps)(Counter);