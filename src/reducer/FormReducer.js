import * as types from '../actions/actionTypes';

export default function reducer (state, action) {
    if (!state) {
        state = { 
            accounts: [],
            orders: [],
            newOrders: []
        }
    }
    switch (action.type) {
        case types.LOAD_ACCOUNT_LIST:
            return {accounts: action.accounts}
        case types.LOAD_ACCOUNT_SUCCESS:
            return {accounts: action.accounts}
        case types.SEARCH_HISTORY:
            return { orders: action.orders }
        case types.SEARCH_NEW_ORDERS:
            return { newOrders: action.newOrders}
      default:
        return state
    }
}
  