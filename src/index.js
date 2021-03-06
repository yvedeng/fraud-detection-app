import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import B2bContainer from './containers/B2bContainer';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css'
import "izitoast/dist/css/iziToast.css";
import configureStore from './store/configureStore';
import * as b2bActions from './actions/orderHistoryActions';
import { beginAjaxCall } from './actions/ajaxStatusActions';

const store = configureStore();

store.dispatch(b2bActions.loadB2BAccountList());
store.dispatch(account => b2bActions.handleAccountSelectChange(account));
store.dispatch(isShow => b2bActions.handleShowOldOrderLines(isShow));
store.dispatch(isShow => b2bActions.handleShowNewOrderLines(isShow));
store.dispatch(accountId => b2bActions.getOrderHistory(accountId));
store.dispatch((orderId, accountId) => b2bActions.predictOrder(orderId, accountId));
store.dispatch(beginAjaxCall())

ReactDOM.render(
    <Provider store={store}>
        <B2bContainer numberOrderPerPage={10}/>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
