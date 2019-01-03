import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import OrderLineTRow from './OrderLineTRow';
import { OrderLineShape } from './PropTypes';

export default class OrderLineTable extends React.Component {
    constructor(){
        super();
        this.handlePredictClick = this.handlePredictClick.bind(this);
    }

    handlePredictClick(order) {
        if (this.props.handlePredict) {
            this.props.handlePredict(order)
        }
    }

    render () {
        return (
            <Table selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>OrderLine ID</Table.HeaderCell>
                        <Table.HeaderCell>Customer ID</Table.HeaderCell>
                        <Table.HeaderCell>Payment Type</Table.HeaderCell>
                        <Table.HeaderCell>Origin</Table.HeaderCell>
                        <Table.HeaderCell>Shop ID</Table.HeaderCell>
                        <Table.HeaderCell>Country ID</Table.HeaderCell>
                        <Table.HeaderCell>Delivery Method ID</Table.HeaderCell>
                        <Table.HeaderCell>Product Relation ID</Table.HeaderCell>
                        <Table.HeaderCell>Card Value</Table.HeaderCell>
                        <Table.HeaderCell>Quantity</Table.HeaderCell>
                        <Table.HeaderCell>Product ID</Table.HeaderCell>
                        <Table.HeaderCell>Is Credited</Table.HeaderCell>
                        <Table.HeaderCell>Timestamp</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        this.props.orderLines.map((orderLine, i) => {
                            console.log(orderLine);
                            return (<OrderLineTRow 
                                    key={i} 
                                    orderLine={orderLine} 
                                    handlePredict={this.handlePredictClick}/>);
                        })
                    }
                </Table.Body>
            </Table>
        );
    }
}

OrderLineTable.propTypes = {
    orderLines: PropTypes.arrayOf(PropTypes.shape(OrderLineShape)),
    handlePredict: PropTypes.func,
    isPredicting: PropTypes.bool
};
