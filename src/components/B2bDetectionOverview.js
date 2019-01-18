import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Header, Icon } from 'semantic-ui-react';
import * as types from './PropTypes';
import OrderList from './OrderList';
import AccountForm from './AccountForm';
import Visualization from './visualization/Visualization';

class B2BDetectionOverview extends React.Component {
    render() {
        return (
            <div>
                <Header as='h1' textAlign="center" block={true} dividing={true} icon>
                    <Icon name="user secret" circular={true} />
                    Fraud Detection Platform
                    <Header.Subheader>A platform using state-of-art Machine Learning techniques to detect fraudulent orders.</Header.Subheader>
                </Header>

                <br></br>

                <React.Fragment>
                    <Divider horizontal>
                        <Header as='h3' className="b2bAccountView">
                            <Icon name='user' />
                            SELECT A B2B ACCOUNT
                        </Header>
                    </Divider>
                    <AccountForm 
                        allAccounts={this.props.accounts}
                        isSearching={this.props.isSearching}
                        onClick={this.props.onSearchHistory}
                        handleAccountChange={this.props.handleAccountChange}/>
                    <br></br>

                    <Divider horizontal>
                    <Header as='h3' className="historyView">
                        <Icon name='history' />
                        ORDER HISTORY (detected)
                    </Header>
                    Total: {this.props.oldOrders.length} Orders
                    </Divider>

                    <OrderList 
                        orders={this.props.oldOrders}
                        numberOrderPerPage={this.props.numberOrderPerPage} />
                    <br></br>

                    <Divider horizontal>
                    <Header as='h3' className="newOrderView">
                        <Icon name='list ul' />
                        NEW ORDERS (undetected)
                    </Header>
                    Total: {this.props.newOrders.length} Orders
                    </Divider>

                    <OrderList 
                        orders={this.props.newOrders}
                        isPredicting={this.props.isPredicting}
                        handlePredict={this.props.handlePredict}
                        numberOrderPerPage={this.props.numberOrderPerPage}
                        predictedOrder={this.props.predictedOrder} />
                    <br></br>

                    {this.props.importances.length > 0?
                        <div>
                            <Divider horizontal>
                            <Header as='h3' className="visualizationView">
                                <Icon name='area graph' />
                                    Visualization
                            </Header>
                            </Divider>
                            <div className="visual">
                            <Visualization importances={this.props.importances}/>
                            </div>
                        </div>
                        : null
                    }
                    
                </React.Fragment>
            </div>
        );
    }
}
    
B2BDetectionOverview.propTypes = {
    accounts:PropTypes.arrayOf(PropTypes.shape(types.AccountShape)).isRequired,
    account:PropTypes.shape(types.AccountShape).isRequired,
    oldOrders:PropTypes.arrayOf(PropTypes.shape(types.OrderShape)).isRequired,
    newOrders:PropTypes.arrayOf(PropTypes.shape(types.OrderShape)).isRequired,
    isSearching:PropTypes.bool.isRequired,
    isPredicting:PropTypes.bool.isRequired,
    onSearchHistory:PropTypes.func.isRequired,
    handlePredict:PropTypes.func.isRequired,
    handleAccountChange:PropTypes.func.isRequired,
    numberOrderPerPage:PropTypes.number.isRequired,
    importances:PropTypes.array.isRequired
}

export default B2BDetectionOverview;