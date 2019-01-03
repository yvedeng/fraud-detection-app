import React from 'react';
import PropTypes from 'prop-types';
import { Table, Icon } from 'semantic-ui-react';
import { OrderLineShape } from './PropTypes';


class OrderLineTRow extends React.Component {

    render() {
        return (
            this.props.orderLine.isFraudulent ?
            <Table.Row negative>
                <Table.Cell>
                    {this.props.orderLine.orderLineId}
                </Table.Cell>
                <Table.Cell>{this.props.orderLine.customerId}</Table.Cell>
                <Table.Cell>{this.props.orderLine.paymentType}</Table.Cell>
                <Table.Cell>{this.props.orderLine.origin}</Table.Cell>
                <Table.Cell>{this.props.orderLine.shopId}</Table.Cell>
                <Table.Cell>{this.props.orderLine.countryId}</Table.Cell>
                <Table.Cell>{this.props.orderLine.deliveryMethodId}</Table.Cell>
                <Table.Cell>{this.props.orderLine.productRelationId}</Table.Cell>
                <Table.Cell>{this.props.orderLine.cardValue}</Table.Cell>
                <Table.Cell>{this.props.orderLine.quantity}</Table.Cell>
                <Table.Cell>{this.props.orderLine.productId}</Table.Cell>
                <Table.Cell>{this.props.orderLine.isCredited.toString()}</Table.Cell>
                <Table.Cell>{this.props.orderLine.hour} : {this.props.orderLine.minute} : {this.props.orderLine.second} {this.props.orderLine.day}-{this.props.orderLine.month}-{this.props.orderLine.year} </Table.Cell>
                <Table.Cell>
                    <Icon name='close' />
                    Suspicious
                </Table.Cell>
            </Table.Row>
            :
            <Table.Row positive>
                <Table.Cell>
                    {this.props.orderLine.orderLineId}
                </Table.Cell>
                <Table.Cell>{this.props.orderLine.customerId}</Table.Cell>
                <Table.Cell>{this.props.orderLine.paymentType}</Table.Cell>
                <Table.Cell>{this.props.orderLine.origin}</Table.Cell>
                <Table.Cell>{this.props.orderLine.shopId}</Table.Cell>
                <Table.Cell>{this.props.orderLine.countryId}</Table.Cell>
                <Table.Cell>{this.props.orderLine.deliveryMethodId}</Table.Cell>
                <Table.Cell>{this.props.orderLine.productRelationId}</Table.Cell>
                <Table.Cell>{this.props.orderLine.cardValue}</Table.Cell>
                <Table.Cell>{this.props.orderLine.quantity}</Table.Cell>
                <Table.Cell>{this.props.orderLine.productId}</Table.Cell>
                <Table.Cell>{this.props.orderLine.isCredited.toString()}</Table.Cell>
                <Table.Cell>{this.props.orderLine.hour} : {this.props.orderLine.minute} : {this.props.orderLine.second} {this.props.orderLine.day}-{this.props.orderLine.month}-{this.props.orderLine.year} </Table.Cell>
                <Table.Cell>
                    <Icon name='checkmark' />
                    Regular
                </Table.Cell>
            </Table.Row>
        );
    }
}

OrderLineTRow.propTypes = {
    orderLine: PropTypes.shape(OrderLineShape),
    handlePredict: PropTypes.func,
};
  
export default OrderLineTRow;