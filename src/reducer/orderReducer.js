import * as types from '../actions/actionTypes';
import initialState from './initialState';

function _groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return map;
}

export default function orderReducer (state=initialState.b2bOrder, action) {
 
    switch (action.type) {

        case types.LOAD_ACCOUNT_SUCCESS:
        return {...initialState.b2bOrder,
            accounts: action.accounts
        };

        case types.LOAD_ACCOUNT_ERROR:
            return initialState.b2bOrder;


        case types.GET_ORDER_HISTORY_SUCCESS:
            if (action.newOrders.length===0) {
                if (action.oldOrders.length===0){
                    return (Object.assign({}, state, {
                        newOrders: [],
                        oldOrders: [],
                        isPredicting: false,
                        predictResult: null,
                        importances: []
                    }))

                } else {
                    const oldMap = _groupBy(action.oldOrders, oldOrder=>oldOrder.orderID)
                    let oldArray = []
                    oldMap.forEach((v, k) => {oldArray.push({orderID: k, hasPredicted: true, orderLines: v})})
                    
                    return (Object.assign({}, state, {
                        newOrders: [],
                        oldOrders: oldArray,
                        isPredicting: false,
                        predictResult: null,
                        importances: []
                    }))
                    
                }
            } else {
                if (action.oldOrders.length===0){
                    const newMap = _groupBy(action.newOrders, newOrder=>newOrder.orderID)
                    let newArray = []
                    newMap.forEach((v, k) => {
                        let copyOrderLines = [...v];
                        copyOrderLines.forEach(o=>o.state=null);
                        newArray.push({orderID: k, hasPredicted: false, orderLines: copyOrderLines})})
        
                    return (Object.assign({}, state, {
                        newOrders: newArray,
                        oldOrders: [],
                        isPredicting: false,
                        predictResult: null,
                        importances: []
                    }))

                } else {
                    const oldMap = _groupBy(action.oldOrders, oldOrder=>oldOrder.orderID)
                    let oldArray = []
                    oldMap.forEach((v, k) => {oldArray.push({orderID: k, hasPredicted: true, orderLines: v})})

                    const newMap = _groupBy(action.newOrders, newOrder=>newOrder.orderID)
                    let newArray = []
                    newMap.forEach((v, k) => {
                        let copyOrderLines = [...v];
                        copyOrderLines.forEach(o=>o.state=null);
                        newArray.push({orderID: k, hasPredicted: false, orderLines: v})})
                    
                    return (Object.assign({}, state, {
                        newOrders: newArray,
                        oldOrders: oldArray,
                        isPredicting: false,
                        predictResult: null,
                        importances: []
                    }))
                }
            }
        
        case types.ACCOUNT_CHANGE:
            return {
                ...initialState.b2bOrder,
                accounts: state.accounts,
                account: action.account
            }
            
        case types.GET_ORDER_HISTORY_ERROR:
            return Object.assign({}, state, {
                isPredicting: false,
                error: action.error
            });

        case types.SHOW_OLD_ORDERLINES:
            console.log("updating showOldOrderLines");
            console.log(state.showOldOrderLines)
            return Object.assign({}, state, {
                showOldOrderLines: !state.showOldOrderLines
            })
        
        case types.SHOW_NEW_ORDERLINES:
            return Object.assign({}, state, {
                showNewOrderLines: !state.showNewOrderLines
            })

        case types.GET_ORDER_STATUS:
            console.log(action.isSearching)
            return (Object.assign({}, state, {
                isSearching: action.isSearching
            }))
        
        case types.PREDICT_ORDER_SUCCESS:
            state.newOrders.map(obj => obj.orderID === action.orderId ? obj.orderLines.forEach(o=>
                {o.state=action.result
                return o
                }) : obj);
            return Object.assign({}, state, {
                newOrders: [...state.newOrders],
                predictResult: action.result,
                importances: action.importances,
                predictedOrder: [...state.predictedOrder, Object.assign({}, {'orderId': action.result})]
            });
            
        case types.PREDICT_ORDER_ERROR:
            return Object.assign({}, state, {
                error: action.error
            });

        case types.PREDICT_ORDER_STATUS:
            console.log(action.isPredicting)
            return Object.assign({}, state,{
                isPredicting: action.isPredicting
            });
      default:
        return state
    }
}
  