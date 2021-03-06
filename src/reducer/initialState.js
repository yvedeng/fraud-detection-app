const initialState = {
    
    b2bOrder: {
        accounts: [],
        account: null,
        isPredicting: false,
        isSearching: false,
        isSingleOrderUpdating: false,
        showOldOrderLines: false,
        showNewOrderLines: false,
        oldOrders: [],
        newOrders: [],
        error: null,
        predictResult: null,
        importances: []
    },

    ajaxCallInProgress: 0
};

export default initialState;