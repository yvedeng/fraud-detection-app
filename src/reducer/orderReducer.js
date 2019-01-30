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

function _pushIfNotExist(arr, element) {
    if (!(element in arr)) {
        arr.push(element);
    }
    arr = arr.sort((a, b)=>(a.orderID > b.orderID)? 1: -1);
    return arr;
}

export default function orderReducer (state=initialState.b2bOrder, action) {
 
    switch (action.type) {

        case types.LOAD_ACCOUNT_SUCCESS:
            return {...initialState.b2bOrder,
                accounts: action.accounts
            };

        case types.LOAD_ACCOUNT_ERROR:
            return {...initialState.b2bOrder,
                error: action.error};


        case types.GET_ORDER_HISTORY_SUCCESS:
            if (action.newOrders.length===0) {
                if (action.oldOrders.length===0) {
                    return state; 
                } else {
                    const oldMap = _groupBy(action.oldOrders, oldOrder=>oldOrder.orderID)
                    let oldArray = [];
                    oldMap.forEach((v, k) => {oldArray.push({orderID: k, hasPredicted: true, orderLines: v})});
                
                    oldArray = oldArray.sort((a, b)=> 
                        (a.orderID > b.orderID)? 1: -1
                    )
                    return {...state, oldOrders: oldArray};
                }
            }
            else {
                if (action.oldOrders.length===0){
                    const newMap = _groupBy(action.newOrders, newOrder=>newOrder.orderID)
                    let newArray = []
                    newMap.forEach((v, k) => {
                        let copyOrderLines = [...v];
                        copyOrderLines.forEach(o=>o.state=null);
                        newArray.push({orderID: k, hasPredicted: false, orderLines: copyOrderLines})})
                    newArray = newArray.sort((a, b)=> 
                        (a.orderID > b.orderID)? 1: -1
                    )
                    return {...state, newOrders: newArray};

                } else {
                    const oldMap = _groupBy(action.oldOrders, oldOrder=>oldOrder.orderID)
                    let oldArray = []
                    oldMap.forEach((v, k) => {oldArray.push({orderID: k, hasPredicted: true, orderLines: v})})
                    oldArray = oldArray.sort((a, b)=> 
                        (a.orderID > b.orderID)? 1: -1
                    )
                    const newMap = _groupBy(action.newOrders, newOrder=>newOrder.orderID)
                    let newArray = []
                    newMap.forEach((v, k) => {
                        let copyOrderLines = [...v];
                        copyOrderLines.forEach(o=>o.state=null);
                        newArray.push({orderID: k, hasPredicted: false, orderLines: v})})
                    
                    newArray = newArray.sort((a, b)=> 
                        (a.orderID > b.orderID)? 1: -1
                    )
                    return {...state,
                        newOrders: newArray,
                        oldOrders: oldArray };
                }
            }
        
        case types.ACCOUNT_CHANGE:
            return {
                ...initialState.b2bOrder,
                accounts: state.accounts,
                account: action.account
            };
            
        case types.GET_ORDER_HISTORY_ERROR:
            return {...state, 
                isPredicting: false,
                error: action.error
            };

        case types.SHOW_OLD_ORDERLINES:
            return {...state,
                showOldOrderLines: !state.showOldOrderLines
            };
        
        case types.SHOW_NEW_ORDERLINES:
            return {...state, 
                showNewOrderLines: !state.showNewOrderLines
            };

        case types.GET_ORDER_STATUS:
            return {...state, 
                isSearching: action.isSearching
            };
        
        case types.PREDICT_ORDER_SUCCESS:
            let orderIndex = state.newOrders.findIndex(order => order.orderID === action.orderId);
            const predictingOrder = state.newOrders[orderIndex];
            const predictOL = predictingOrder.orderLines.map(ol => {
                ol.state = action.result;
                return ol;
            })
            const predictedOrder = {
                ...state.newOrders[orderIndex], 
                hasPredicted: true, 
                orderLines: predictOL};
           
            return {...state, 
                newOrders: [...state.newOrders.slice(0, orderIndex),
                    predictedOrder,
                    ...state.newOrders.slice(orderIndex+1)],
                predictResult: action.result,
                importances: action.importances
            };
            
        case types.PREDICT_ORDER_ERROR:
            return {...state, 
                predictResult: null,
                importances: [],
                error: action.error
            };

        case types.PREDICT_ORDER_STATUS:
            return {...state,
                isPredicting: action.isPredicting
            };
            
        case types.UPDATE_SINGLE_ORDER_SUCCESS:
            // find the order from newOrders and push it to oldOrders
            const updatingOrder = state.newOrders.find(order => order.orderID === action.orderId);
            const updatedNewOrders = state.newOrders.filter(order=> order.orderID !== action.orderId);
            const updatedOldOrders = _pushIfNotExist(state.oldOrders, updatingOrder);

            return {...state,
                newOrders: [...updatedNewOrders],
                oldOrders: [...updatedOldOrders]
            };
        
        case types.UPDATE_SINGLE_ORDER_ERROR:
            return {...state, error: action.error};

        case types.UPDATE_SINGLE_ORDER_STATUS:
            return {...state,
                isSingleOrderUpdating: action.isSingleOrderUpdating
            };

      default:
        return state
    }
}
  