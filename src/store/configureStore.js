
import {createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import rootReducer from '../reducer/rootReducer';

export default function configureStore(initalState) {
  return createStore(
    rootReducer,
    initalState,
    applyMiddleware(thunk)
  );
};