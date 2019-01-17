import {combineReducers} from 'redux';
import orderReducer from './orderReducer';
import ajaxReducer from './ajaxStatusReducer';

const rootReducer = combineReducers({
    orderReducer,
    ajaxReducer
});

export default rootReducer;