const initialState = {

    b2bOrder: {
        accounts: [],
        account: {},
        isPredicting: false,
        isSearching: false,
        showAllOrderLines: false,
        oldOrders: [],
        newOrders: [],
        predictedOrder: [],
        error: null,
        predictResult: null,
        importances: []
    },

    ajaxCallInProgress: 0
};

export default initialState;