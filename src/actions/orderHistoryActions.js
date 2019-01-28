import iziToast from 'izitoast';
import B2bDetectApi from '../api/B2bDetectApi';
import * as types from './actionTypes';
import { beginAjaxCall } from './ajaxStatusActions';

// LOAD ACCOUNT List
function loadAccountSuccess(accounts) {
    return {type: types.LOAD_ACCOUNT_SUCCESS, accounts};
}

function loadAccountError(error) {
    return {type: types.LOAD_ACCOUNT_ERROR, error};
}

export function loadB2BAccountList() {
    return function(dispatch) {
        dispatch(beginAjaxCall());
        return B2bDetectApi.getAllB2BAccounts()
        .then(accounts => {
            dispatch(loadAccountSuccess(accounts));
        })
        .catch(error => {
            dispatch(loadAccountError(error))
        });
    };
}

export function handleAccountSelectChange(account) {
    return {type: types.ACCOUNT_CHANGE,
            account: account}
}

// GET HISTORY BY ACCOUNT ID
function getOrderHistorySuccess(newJson, oldJson) {
    return {type: types.GET_ORDER_HISTORY_SUCCESS, 
            newOrders: newJson,
            oldOrders: oldJson};
}

function getOrderHistoryError(error) {
    return {type: types.GET_ORDER_HISTORY_ERROR,
            error: error};
}

export function handleShowOldOrderLines() {
    return {type: types.SHOW_OLD_ORDERLINES}
}

export function handleShowNewOrderLines() {
    return {type: types.SHOW_NEW_ORDERLINES}
}

function getOrderStatus(status) {
    console.log(status)
    return {type: types.GET_ORDER_STATUS,
            isSearching: status}
}

export function getOrderHistory(accountId) {
    return dispatch => {
        dispatch(getOrderStatus(true))
        return B2bDetectApi.getOrderHistory({"account_id": accountId})
            .then((response) => {
                console.log(response)
     
                const newOrders = response['new'].length===0 ? [] : JSON.parse(response['new'])
                const oldOrders = response['old'].length===0 ? [] : JSON.parse(response['old'])
                
                console.log(newOrders)
                console.log(oldOrders)

                iziToast.success({
                    title: 'Success',
                    message: 'Searched ' + accountId + '\'s history successfully',
                    position:'topRight',
                    timeout: 3000
                })
                dispatch(getOrderHistorySuccess(newOrders, oldOrders)); 
                dispatch(getOrderStatus(false));
            })
            .catch(error => {
                console.error(error)
                iziToast.error({
                    title: 'Error',
                    message: error.toString(),
                    position: 'topRight',
                    timeout: 3000
                });
                dispatch(getOrderHistoryError(error));
                dispatch(getOrderStatus(false));
            })
    }
};

// PREDICT THE ORDER SELECTED BY THE USER
function predictOrderSuccess(response) {
    return {type: types.PREDICT_ORDER_SUCCESS,
            orderId: response.orderId,
            result: response.predict,
            importances: response.importances};
}

function predictOrderError(error) {
    return {type: types.PREDICT_ORDER_ERROR,
            error: error};
}

function predictOrderStatus(status) {
    return {type: types.PREDICT_ORDER_STATUS,
            isPredicting: status}
}

export function predictOrder(order) {
    return dispatch => {
        dispatch(predictOrderStatus(true))
        return B2bDetectApi.predict({'order':order})
            .then((response) => {
                console.log(order)
                const orderId = order.order[0].orderID;
                response.orderId = orderId;
                console.log(response)
                response.predict !== 1? 
                iziToast.warning({
                    title: 'Fraudulent',
                    message: 'I believe the order: ' + orderId + ' is a fraudlent order.',
                    position:'topRight',
                    timeout: 3000
                })
                :
                iziToast.success({
                    title: 'Regular',
                    message: 'I believe the order: ' + orderId + ' is a regular order.',
                    position:'topRight',
                    timeout: 3000
                });
                
                dispatch(predictOrderSuccess(response));
                dispatch(predictOrderStatus(false));
            })
            .catch(error => {
                iziToast.error({
                    title: 'Error',
                    message: error.toString(),
                    position: 'topRight',
                    timeout: 3000
                });
                dispatch(predictOrderError(error));
                dispatch(predictOrderStatus(false));
            })
    }
};