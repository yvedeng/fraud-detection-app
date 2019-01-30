import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Header, Icon } from 'semantic-ui-react';
import * as types from './PropTypes';
import OrderList from './OrderList';
import AccountForm from './AccountForm';
import SlideBar from './SlideBar';
import Visualization from './visualization/Visualization';
import LineChart from './visualization/LineChart';

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
                        account={this.props.account}
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
                    
                    <div>
                        <SlideBar
                            showAllOrderLines={this.props.showOldOrderLines}
                            handleShow={this.props.handleShowOld}/>
                    </div>
                    <OrderList 
                        orders={this.props.oldOrders}
                        numberOrderPerPage={this.props.numberOrderPerPage}
                        showAllOrderLines={this.props.showOldOrderLines} />
                    <br></br>

                    {this.props.oldOrders.length!==0?
                    <div>
                        <Divider horizontal>
                        <Header as='h3' className="feature-comparision">
                            <Icon name='area graph' />
                                Timelines For Old Orders
                        </Header>
                        </Divider>
                        <LineChart 
                            data={this.props.oldOrders}
                            divId={"old-order-timeline"}
                        />
                    </div>
                     : null
                    }

                    <Divider horizontal>
                    <Header as='h3' className="newOrderView">
                        <Icon name='list ul' />
                        NEW ORDERS (undetected)
                    </Header>
                    Total: {this.props.newOrders.length} Orders
                    </Divider>

                    <div>
                        <SlideBar
                            showAllOrderLines={this.props.showNewOrderLines}
                            handleShow={this.props.handleShowNew}
                        />
                    </div>
                    <OrderList 
                        orders={this.props.newOrders}
                        isPredicting={this.props.isPredicting}
                        handlePredict={this.props.handlePredict}
                        numberOrderPerPage={this.props.numberOrderPerPage}
                        predictedOrder={this.props.predictedOrder}
                        isSingleOrderUpdating={this.props.isSingleOrderUpdating}
                        handleUpdateSingle={this.props.handleUpdateSingle}
                        showAllOrderLines={this.props.showNewOrderLines} />
                    <br></br>
                    
                    {this.props.newOrders.length!==0?
                    <div>
                        <Divider horizontal>
                        <Header as='h3' className="feature-comparision">
                            <Icon name='area graph' />
                                Timelines For New Orders
                        </Header>
                        </Divider>
                    
                        <LineChart 
                            data={this.props.newOrders}
                            divId={"new-order-timeline"}
                        /> 
                    </div>: null
                    }
                     
                    <div className="visual">
                        <Visualization 
                            importances={this.props.importances}
                            oldOrders={this.props.oldOrders}
                            newOrders={this.props.newOrders}
                        />
                    </div>

                </React.Fragment>
            </div>
        );
    }
}
    
B2BDetectionOverview.propTypes = {
    accounts:PropTypes.arrayOf(PropTypes.shape(types.AccountShape)).isRequired,
    account:PropTypes.shape(types.AccountShape),
    oldOrders:PropTypes.arrayOf(PropTypes.shape(types.OrderShape)).isRequired,
    newOrders:PropTypes.arrayOf(PropTypes.shape(types.OrderShape)).isRequired,
    isSearching:PropTypes.bool.isRequired,
    isPredicting:PropTypes.bool.isRequired,
    isSingleOrderUpdating: PropTypes.bool.isRequired,
    onSearchHistory:PropTypes.func.isRequired,
    handlePredict:PropTypes.func.isRequired,
    handleUpdateSingle: PropTypes.func.isRequired,
    handleAccountChange:PropTypes.func.isRequired,
    numberOrderPerPage:PropTypes.number.isRequired,
    importances:PropTypes.array.isRequired,
    showOldOrderLines: PropTypes.bool,
    showNewOrderLines: PropTypes.bool,
    handleShowOld: PropTypes.func.isRequired,
    handleShowNew: PropTypes.func.isRequired
};

export default B2BDetectionOverview;