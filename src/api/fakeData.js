const orders = [{
    orderId: 10,
    hasPredicted: false,
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
            isFraudulent: false,
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
    hasPredicted: false,
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

const importance = [
    { 
        axis: "orderLineId", 
        value: "0.1"
    },
    {
        axis:'customerId', 
        value: '0.4'
    },
    {
        axis:'paymentType', 
        value: '0.01'
    },
    {
        axis:'origin', 
        value: '0.09'
    },
    {
        axis:'shopId', 
        value:'0.0002'
    },
    {
        axis:'countryId', 
        value: '0.001'
    },
    {
        axis:'deliveryMethodId',
        value: '0.0092'
    },
    {
        axis:'productRelationId', 
        value: '0.00003'
    },
    {
        axis:'cardValue', 
        value: '0.01'
    },
    {
        axis:'quantity', 
        value: '0.02'
    },
    {
        axis:'productId', 
        value: '0.003'
    },
    {
        axis: 'isCredited', 
        value: '0.033'
    }, 
    {
        axis:'day', 
        value: '0.02'
    }, 
    {
        axis:'month', 
        value: '0.003'
    }, 
    {
        axis:'year', 
        value: '0.0000001'
    },
    {
        axis:'hour', 
        value: '0.003'
    },
    {
        axis:'minute', 
        value:'0.0002'
    }, 
    {
        axis:'second', 
        value: '0.005'
    }
];

const initialOrders = [];

export {
    orders,
    initialOrders,
    importance
};