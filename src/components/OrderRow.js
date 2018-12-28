import React from 'react';
import PropTypes from 'prop-types';
import { Button, List, Icon, Container } from 'semantic-ui-react';
import OrderLineTable from './OrderLineTable';
import {OrderShape} from './PropTypes';

class OrderRow extends React.Component {
    constructor() {
        super()

        this.state = {
            showOrderLines: false
        }
    }

    handleExpandClick(e) {
        this.setState({showOrderLines: !this.state.showOrderLines})
    }

    render() {
        return (
            <List.Item>
                <List.Content floated='right'>
                    {this.props.handlePredict? (this.props.isPredicting ? <Button loading>Predicting</Button> : <Button onClick={(e, order) => {this.props.handlePredict(order.orderId)}}>Predict</Button>) : null}
                </List.Content>
                <List.Content>
                    <Container textAlign="left">
                    <List.Header onClick={this.handleExpandClick.bind(this)}>
                        {this.state.showOrderLines? <Icon name='angle down'/> : <Icon name='angle right'/>}
                        Order ID: {this.props.order.orderId}
                    </List.Header>
                    </Container>
                </List.Content>
                    {this.state.showOrderLines ? <OrderLineTable 
                    orderLines={this.props.order.orderLines}
                    handlePredict={this.props.handlePredict}/> : null}
            </List.Item>
        );
    }
}

    
OrderRow.propTypes = {
    order: PropTypes.shape(OrderShape),
    isPredicting: PropTypes.bool,
    handlePredict: PropTypes.func
}

export default OrderRow;
