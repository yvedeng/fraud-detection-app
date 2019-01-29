import Api from './api';

export default class B2bDetectApi {

    static getAllB2BAccounts() {

        return Api.get('/api/search_b2b');
    }

    static getAllB2CAccounts() {
        return 'undefined';
    }

    static getOrderHistory(params) {
        
        return Api.post('/api/search_history', params);
    }

    static predict(params) {
        return Api.post('/api/predict', params);
    }

    static update(params) {
        return Api.put('/api/update', params);
    }

    static getTest(params) {
        return Api.get('//apiget_test', params);
    }

    static getFeatureNames() {
        return Api.get('/api/features')
    }

    static updateSingleOrder(params) {
        return Api.post('/api/update_single', params)
    }

    static healthCheck() {
        return Api.get('/api/health');
    }

    static checkAlive() {
        return Api.get('/api/hello');
    }
}