import React from 'react';
import { Divider, Header, Icon } from 'semantic-ui-react';
import OrderList from './OrderList';
import AccountForm from './AccountForm';
import Visualization from './visualization/Visualization';

const B2BDetectionOverview = ({accounts, oldOrders, newOrders, isSearching, isPredicting, onSearchHistory, handlePredict, numberOrderPerPage, predictedOrder, importances}) => (
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
                allAccounts={accounts}
                isSearching={isSearching}
                onClick={onSearchHistory}/>
            <br></br>

            <Divider horizontal>
            <Header as='h3' className="historyView">
                <Icon name='history' />
                ORDER HISTORY (detected)
            </Header>
            Total: {oldOrders.length} Orders
            </Divider>

            <OrderList 
                orders={oldOrders}
                numberOrderPerPage={numberOrderPerPage} />
            <br></br>

            <Divider horizontal>
            <Header as='h3' className="newOrderView">
                <Icon name='list ul' />
                NEW ORDERS (undetected)
            </Header>
            Total: {newOrders.length} Orders
            </Divider>

            <OrderList 
                orders={newOrders}
                isPredicting={isPredicting}
                handlePredict={handlePredict}
                numberOrderPerPage={numberOrderPerPage}
                predictedOrder={predictedOrder} />
            <br></br>

            {importances.length > 0?
                <div>
                    <Divider horizontal>
                    <Header as='h3' className="visualizationView">
                        <Icon name='area graph' />
                            Visualization
                    </Header>
                    </Divider>
                    <div className="visual">
                    <Visualization importances={importances}/>
                    </div>
                </div>
                : null
            }
            

        </React.Fragment>
    </div>
);

export default B2BDetectionOverview;