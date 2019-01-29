import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, List, Pagination, Icon, Container } from 'semantic-ui-react'
import OrderRow from './OrderRow';
import { OrderShape } from './PropTypes';

export default class OrderList extends React.Component {

    constructor(){
        super();
        this.state = {
            activePage: 1,
            numberOfPage: 1,
            ordersByPage: []
        };
    }

    componentDidUpdate(prevProps){
        // when received a new orders - rerender!
        if (this.props.orders !== prevProps.orders) {
            const lengthOfOrders = this.props.orders.length;
            const nPages = Math.ceil(lengthOfOrders/this.props.numberOrderPerPage);
            let orderSlices = [];
            for (let i = 0; i<nPages; i++) {
                orderSlices.push([...this.props.orders.slice(i*this.props.numberOrderPerPage, (i+1)*this.props.numberOrderPerPage)])
            }
            this.setState({
                numberOfPage: nPages,
                ordersByPage: orderSlices
            })
        }
        
    }

    handlePageChange(e, pageProps) {
        this.setState({activePage: pageProps.activePage});
    }

    render() {

        return (
            <div>
                <Accordion fluid styled>
                {   this.state.ordersByPage.length > 0 ?
                    // if multiple pages 
                    this.state.ordersByPage[this.state.activePage-1].map((order, i)=>{
                        return (
                            <List key={i} divided verticalAlign='middle'>
                            <OrderRow 
                                key={i}
                                order={order}
                                showAllOrderLines={this.props.showAllOrderLines}
                                isPredicting={this.props.isPredicting}
                                handlePredict={this.props.handlePredict}
                                handleUpdateSingle={this.props.handleUpdateSingle}
                                predictOrder={this.props.predictOrder}></OrderRow>
                            </List>)})
                    : // if single page
                    this.props.orders.map((order, i)=>{
                        return (
                            <List key={i} divided verticalAlign='middle'>

                            <OrderRow 
                                key={i}
                                order={order}
                                showAllOrderLines={this.props.showAllOrderLines}
                                isPredicting={this.props.isPredicting}
                                handlePredict={this.props.handlePredict}
                                handleUpdateSingle={this.props.handleUpdateSingle}
                                predictOrder={this.props.predictOrder}></OrderRow>
                            </List>)})
                    }
                 
                 <Container textAlign='right'>
                    <Pagination
                            defaultActivePage={1}
                            ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
                            firstItem={{ content: <Icon name='angle double left' />, icon: true }}
                            lastItem={{ content: <Icon name='angle double right' />, icon: true }}
                            prevItem={{ content: <Icon name='angle left' />, icon: true }}
                            nextItem={{ content: <Icon name='angle right' />, icon: true }}
                            onPageChange={this.handlePageChange.bind(this)}
                            totalPages={this.state.numberOfPage}
                    />
                </Container>
                </Accordion>
            </div>
        );
    }
}

OrderList.propTypes = {
    orders: PropTypes.arrayOf(PropTypes.shape(OrderShape)),
    isPredicting: PropTypes.bool,
    handlePredict: PropTypes.func,
    handleUpdateSingle: PropTypes.func,
    numberOrderPerPage: PropTypes.number.isRequired,
    predictOrder: PropTypes.array,
    showAllOrderLines: PropTypes.bool
};