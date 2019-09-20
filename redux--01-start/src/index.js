import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// This application uses multiple reducers in order to keep each reducer more task specific and modular
import counterReducer from "./store/reducers/counter";
import resultsReducer from "./store/reducers/results";

/**
 * We need to combine the reducers into a single reducer.
 * combineReducers() from the redux library does this for us behind the scenes
 * @type {Reducer<unknown>}
 */
const rootReducer = combineReducers({
    ctr: counterReducer,
    res: resultsReducer
});

const logger = store => {
    return next => {
        return action => {
            console.log('[Middleware] Dispatching', action);
            const result = next(action);
            console.log('[Middleware] next state', store.getState());
            return result;
        }
    }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// create the central store and connect the reducer to the store
const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(logger, thunk))
);

// use the Provider component to inject Redux into our React app
// send the store in to the Provider module as a parameter
ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));
registerServiceWorker();
