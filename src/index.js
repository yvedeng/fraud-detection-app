import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import FraudApp from './FraudApp';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css'

// import createStore from './store/createStore';
import reducer from './reducer/FormReducer';


const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
    <FraudApp />
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();