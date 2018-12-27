import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'semantic-ui-react';


const OrderRow = ({order, handlePredict, isPredicting}) => (
    <Table.Row>
        <Table.Cell value={order.orderLineId}>{order.orderLineId}</Table.Cell>
        <Table.Cell value={order.paymentType}>{order.paymentType}</Table.Cell>
        <Table.Cell value={order.productId}>{order.productId}</Table.Cell>
        <Table.Cell value={order.cardValue}>{order.cardValue}</Table.Cell>
        <Table.Cell value={order}>
            {handlePredict? isPredicting? <Button primary loading>Predict</Button>: <Button primary onClick={(order)=>handlePredict(order)}>Predict</Button> : order.state}
        </Table.Cell>
    </Table.Row>
);

OrderRow.propTypes = {
    order: PropTypes.object,
    handlePredict: PropTypes.func,
    isPredicting: PropTypes.bool
};
  
export default OrderRow;