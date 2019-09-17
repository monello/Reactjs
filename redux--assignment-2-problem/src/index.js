import React from 'react';
import ReactDOM from 'react-dom';

// STEP 1 - Import the createStore function from Redux
import {createStore} from "redux";

// STEP 2 - Import the provider from react-redux to inject redux into the react app
import {Provider} from "react-redux";

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// STEP 3 - Import the reducer
import rootReducer from './store/reducer';

// STEP 4 - Create the store and connect the rootReducer
const store = createStore(rootReducer);

// STEP 5 - Wrap (inject) redux into the App, wrapping the App in Provider and passing in the store object
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
