import PropTypes from 'prop-types';

const OrderLineShape = {
    orderLineID: PropTypes.number,
    orderID: PropTypes.number,
    accountID: PropTypes.number,
    customerContactID: PropTypes.number,
    paymentType: PropTypes.number,
    origin: PropTypes.number,
    shopID:  PropTypes.number,
    countryID: PropTypes.number,
    deliveryMethodID: PropTypes.number,
    productRelationID: PropTypes.number,
    cardValue: PropTypes.number,
    quantity: PropTypes.number,
    productID: PropTypes.number,
    isCredited: PropTypes.number,
    hour: PropTypes.number,
    minute: PropTypes.number,
    second: PropTypes.number,
    day: PropTypes.number,
    month: PropTypes.number,
    year: PropTypes.number,
    state: PropTypes.number
}

const OrderShape = {
    orderID: PropTypes.number,
    hasPredicted: PropTypes.bool,
    orderLines: PropTypes.arrayOf(PropTypes.shape(OrderLineShape))
}

const AccountShape = {
    name: PropTypes.string,
    accountID: PropTypes.number,
    accountType: PropTypes.string,
    defaultPaymentMethod: PropTypes.string,
    shopID: PropTypes.number,
    IsWhiteListed: PropTypes.number
}

export {
    OrderShape,
    OrderLineShape,
    AccountShape
};
