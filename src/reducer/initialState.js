const initialState = {

    b2bOrder: {
        accounts: [],
        isPredicting: false,
        isSearching: false,
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