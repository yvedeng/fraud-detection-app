import Api from './api';

export default class B2bDetectApi {

    static getAllB2BAccounts() {
        return Api.get('http://127.0.0.1:5000/search_b2b');
    }

    static getAllB2CAccounts() {
        return 'undefined';
    }

    static getOrderHistory(params) {
        console.log(params)
        return Api.post('http://127.0.0.1:5000/search_history', params);
    }

    static predict(params) {
        return Api.post('http://127.0.0.1:5000/predict', params);
    }

    static update(params) {
        return Api.put('http://127.0.0.1:5000/update', params);
    }

    static getTest(params) {
        return Api.get('http://127.0.0.1:5000/get_test', params);
    }

    static healthCheck() {
        return Api.get('http://127.0.0.1:5000/health');
    }

    static checkAlive() {
        return Api.get('http://127.0.0.1:5000/hello');
    }
}