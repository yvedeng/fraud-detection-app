import React from 'react';
import PropTypes from 'prop-types';
import { Button, List, Icon } from 'semantic-ui-react';
import OrderLineTable from './OrderLineTable';
import {OrderShape} from './PropTypes';

class OrderRow extends React.Component {
    constructor() {
        super();

        this.state = {
            showOrderLines: false
        };
    }

    componentDidUpdate(nextProps){
        if (nextProps.showAllOrderLines !== this.props.showAllOrderLines) {
            this.setState({showOrderLines: this.props.showAllOrderLines})
        }
    }

    handleExpandClick(e) {
        this.setState({showOrderLines: !this.state.showOrderLines});
    }

    handlePredictClick(params) {
        // const orderId = params.orderId;
        // const accountId = params.accountId;
        // this.props.handlePredict(orderId, accountId);
        this.props.handlePredict(params);
    }

    handleUpdateSingleClick(params) {
        this.props.handleUpdateSingle(params);
    }

    render() {
        return (
            <List.Item>
                <List.Content floated='right'>
                    {this.props.handlePredict? 
                        <div>
                            {this.props.order.orderLines[0].state?
                                <Button
                                    negative
                                    disabled={this.props.isSingleOrderUpdating}
                                    loading={this.props.isSingleOrderUpdating}
                                    onClick={this.handleUpdateSingleClick.bind(this, this.props.order)}
                                    data-tooltip={"Is the prediction correct?"} 
                                    data-position={"top left"}>
                                    Update
                                </Button>: null}
                            <Button 
                                positive 
                                disabled={this.props.isPredicting}
                                loading={this.props.isPredicting}
                                onClick={this.handlePredictClick.bind(this, this.props.order.orderLines)}>
                                Predict
                            </Button> 
                            </div>
                            : 
                            null
                    }
                </List.Content>
                <List.Content floated='left' verticalAlign='middle'>
                    <List.Header onClick={this.handleExpandClick.bind(this)} >
                        {this.state.showOrderLines ? <Icon name='angle down'/> : <Icon name='angle right'/>}
                        Order ID: {this.props.order.orderID}
                    </List.Header>
                </List.Content>
                    {this.state.showOrderLines ? <OrderLineTable 
                    orderLines={this.props.order.orderLines}
                    handlePredict={this.props.handlePredict}
                    isPredicting={this.props.isPredicting}
                    predictedOrder={this.props.predictedOrder}/> : null}
            </List.Item>
        );
    }
}

OrderRow.propTypes = {
    order: PropTypes.shape(OrderShape),
    isPredicting: PropTypes.bool,
    handlePredict: PropTypes.func,
    isSingleOrderUpdating: PropTypes.bool,
    handleUpdateSingle: PropTypes.func,
    handleCancel: PropTypes.func,
    predictedOrder: PropTypes.array,
    showAllOrderLines: PropTypes.bool
}

export default OrderRow;
