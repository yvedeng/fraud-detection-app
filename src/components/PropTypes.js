import PropTypes from 'prop-types';

const OrderLineShape = {
    orderLineId: PropTypes.number,
    customerId: PropTypes.number,
    paymentType: PropTypes.number,
    origin: PropTypes.number,
    shopId:  PropTypes.number,
    countryId: PropTypes.number,
    deliveryMethodId: PropTypes.number,
    productRelationId: PropTypes.number,
    cardValue: PropTypes.number,
    quantity: PropTypes.number,
    productId: PropTypes.number,
    isCredited: PropTypes.bool,
    hour: PropTypes.number,
    minute: PropTypes.number,
    second: PropTypes.number,
    day: PropTypes.number,
    month: PropTypes.number,
    year: PropTypes.number,
    isFraudulent: PropTypes.bool
}

const OrderShape = {
    orderId: PropTypes.number,
    orderLines: PropTypes.arrayOf(PropTypes.shape(OrderLineShape))
}

export {
    OrderShape,
    OrderLineShape
};
