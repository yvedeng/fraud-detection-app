const orders = [{
    orderId: 10,
    orderLines: [
        {
            orderLineId: 10000,
            customerId: 10,
            paymentType: 1,
            origin: 1,
            shopId: 1,
            countryId: 1,
            deliveryMethodId: 1,
            productRelationId: 1000,
            cardValue: 10,
            quantity: 2,
            productId: 10000,
            isCredited: false,
            hour: 12,
            minute: 25,
            second: 49,
            day: 28,
            month: 12,
            year: 2018,
            isFraudulent: false
        }, {
            orderLineId: 10001,
            customerId: 10,
            paymentType: 1,
            origin: 1,
            shopId: 1,
            countryId: 1,
            deliveryMethodId: 1,
            productRelationId: 1000,
            cardValue: 10,
            quantity: 2,
            productId: 10001,
            isCredited: false,
            hour: 12,
            minute: 25,
            second: 49,
            day: 28,
            month: 12,
            year: 2018,
            isFraudulent: false
        }]
    }, {
    orderId: 11,
    orderLines: [
        {
            orderLineId: 10001,
            customerId: 9,
            paymentType: 1,
            origin: 1,
            shopId: 1,
            countryId: 1,
            deliveryMethodId: 2,
            productRelationId: 1002,
            cardValue: 1000,
            quantity: 2,
            productId: 100001,
            isCredited: false,
            hour: 12,
            minute: 26,
            second: 55,
            day: 28,
            month: 12,
            year: 2018,
            isFraudulent: false
        }
    ]}
];

const initialOrders = [];

export {
    orders,
    initialOrders
};