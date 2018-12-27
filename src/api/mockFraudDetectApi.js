const accounts = [
    {key:100, text:"100th company", value:100},
    {key:101, text:"101st company", value:101},
    {key:102, text:"102nd company", value:102}
];

const orders = [
  {
      orderLineId: 1,
      paymentType: 2,
      productId: 3,
      cardValue: 4,
      state: 1
  },
  {
      orderLineId: 2,
      paymentType: 3,
      productId: 4,
      cardValue: 5,
      state: 0
  }
];

const newOrders = [{
  orderLineId: 3,
  paymentType: 4,
  productId: 5,
  cardValue: 6,
  state: 0
}];

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (account) => {
    return account.key + '-' + account.text.toLowerCase();
};

class FraudDetectApi {
    static getAllAccounts() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(Object.assign([], accounts));
        }, 1000);
      });
    }

    static getNewOrders() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(Object.assign([], newOrders));
        }, 1000);
      });
    }

    static getHistoryOrders() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(Object.assign([], orders));
        }, 1000);
      });
    }
}

export default FraudDetectApi;