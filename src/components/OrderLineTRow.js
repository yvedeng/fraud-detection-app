import React from 'react';
import PropTypes from 'prop-types';
import { Table, Icon } from 'semantic-ui-react';
import { OrderLineShape } from './PropTypes';


class OrderLineTRow extends React.Component {

    render() {
        return (
            this.props.orderLine.state?
                this.props.orderLine.state === 1? 
                <Table.Row positive>
                    <Table.Cell>
                        {this.props.orderLine.orderLineID}
                    </Table.Cell>
                    <Table.Cell>{this.props.orderLine.accountID}</Table.Cell>
                    <Table.Cell>{this.props.orderLine.customerContactID}</Table.Cell>
                    <Table.Cell>{this.props.orderLine.paymentType}</Table.Cell>
                    <Table.Cell>{this.props.orderLine.origin}</Table.Cell>
                    <Table.Cell>{this.props.orderLine.shopID}</Table.Cell>
                    <Table.Cell>{this.props.orderLine.countryID}</Table.Cell>
                    <Table.Cell>{this.props.orderLine.deliveryMethodID}</Table.Cell>
                    <Table.Cell>{this.props.orderLine.productRelationID}</Table.Cell>
                    <Table.Cell>{this.props.orderLine.cardValue}</Table.Cell>
                    <Table.Cell>{this.props.orderLine.quantity}</Table.Cell>
                    <Table.Cell>{this.props.orderLine.productID}</Table.Cell>
                    <Table.Cell>{this.props.orderLine.isCredited===1?'Yes': 'No'}</Table.Cell>
                    <Table.Cell>{this.props.orderLine.hour} : {this.props.orderLine.minute} : {this.props.orderLine.second} {this.props.orderLine.day}-{this.props.orderLine.month}-{this.props.orderLine.year} </Table.Cell>
                    <Table.Cell>
                        <Icon name='checkmark' />
                        Regular
                    </Table.Cell>
                </Table.Row> : 
                <Table.Row negative>
                    <Table.Cell>
                        {this.props.orderLine.orderLineID}
                    </Table.Cell>
                    <Table.Cell>{this.props.orderLine.accountID}</Table.Cell>
                    <Table.Cell>{this.props.orderLine.customerContactID}</Table.Cell>
                    <Table.Cell>{this.props.orderLine.paymentType}</Table.Cell>
                    <Table.Cell>{this.props.orderLine.origin}</Table.Cell>
                    <Table.Cell>{this.props.orderLine.shopID}</Table.Cell>
                    <Table.Cell>{this.props.orderLine.countryID}</Table.Cell>
                    <Table.Cell>{this.props.orderLine.deliveryMethodID}</Table.Cell>
                    <Table.Cell>{this.props.orderLine.productRelationID}</Table.Cell>
                    <Table.Cell>{this.props.orderLine.cardValue}</Table.Cell>
                    <Table.Cell>{this.props.orderLine.quantity}</Table.Cell>
                    <Table.Cell>{this.props.orderLine.productID}</Table.Cell>
                    <Table.Cell>{this.props.orderLine.isCredited===1?'Yes':'No'}</Table.Cell>
                    <Table.Cell>{this.props.orderLine.hour} : {this.props.orderLine.minute} : {this.props.orderLine.second} {this.props.orderLine.day}-{this.props.orderLine.month}-{this.props.orderLine.year} </Table.Cell>  
                    <Table.Cell>
                        <Icon name='close' />
                        Suspicious
                    </Table.Cell>
                </Table.Row>
                    :
                    <Table.Row>
                    <Table.Cell>
                        {this.props.orderLine.orderLineID}
                    </Table.Cell>
                    <Table.Cell>{this.props.orderLine.accountID}</Table.Cell>
                    <Table.Cell>{this.props.orderLine.customerContactID}</Table.Cell>
                    <Table.Cell>{this.props.orderLine.paymentType}</Table.Cell>
                    <Table.Cell>{this.props.orderLine.origin}</Table.Cell>
                    <Table.Cell>{this.props.orderLine.shopID}</Table.Cell>
                    <Table.Cell>{this.props.orderLine.countryID}</Table.Cell>
                    <Table.Cell>{this.props.orderLine.deliveryMethodID}</Table.Cell>
                    <Table.Cell>{this.props.orderLine.productRelationID}</Table.Cell>
                    <Table.Cell>{this.props.orderLine.cardValue}</Table.Cell>
                    <Table.Cell>{this.props.orderLine.quantity}</Table.Cell>
                    <Table.Cell>{this.props.orderLine.productID}</Table.Cell>
                    <Table.Cell>{this.props.orderLine.isCredited===1?'Yes': 'No'}</Table.Cell>
                    <Table.Cell>{this.props.orderLine.hour} : {this.props.orderLine.minute} : {this.props.orderLine.second} {this.props.orderLine.day}-{this.props.orderLine.month}-{this.props.orderLine.year} </Table.Cell>
                    <Table.Cell></Table.Cell>
                </Table.Row>
        );
    }
}

OrderLineTRow.propTypes = {
    orderLine: PropTypes.shape(OrderLineShape),
    handlePredict: PropTypes.func,
    predictedOrder: PropTypes.array
};
  
export default OrderLineTRow;