import FraudDetectApi from '../api/mockFraudDetectApi';
import * as types from './actionTypes';

export function loadAccountSuccess(accounts) {
  return {type: types.LOAD_ACCOUNT_SUCCESS, accounts};
}

export function loadAccountList() {
  return dispatch => {
    return FraudDetectApi.getAllAccounts().then(accounts => {
      dispatch(loadAccountSuccess(accounts));
    }).catch(error => {
        throw(error);
    });
  };
}

