import React from 'react';
import { Divider, Header, Icon } from 'semantic-ui-react';
import OrderList from './OrderList';
import AccountForm from './AccountForm';
import Visualization from './Visualization';

const B2BDetection = ({accounts, orders, newOrders, isSearching, isPredicting, onSubmit, handlePredict, numberOrderPerPage, handleCancel}) => (
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
                    Select a user to participate the detection
                </Header>
            </Divider>
            <AccountForm 
                allAccounts={accounts}
                isSearching={isSearching}
                onClick={onSubmit}/>
            <br></br>

            <Divider horizontal>
            <Header as='h3' className="historyView">
                <Icon name='history' />
                Order history (detected)
            </Header>
            </Divider>

            <OrderList 
                orders={orders}
                numberOrderPerPage={numberOrderPerPage} />
            <br></br>

            <Divider horizontal>
            <Header as='h3' className="newOrderView">
                <Icon name='list ul' />
                Orders that are ready to detect (undetected)
            </Header>
            </Divider>

            <OrderList 
                orders={newOrders}
                isPredicting={isPredicting}
                handlePredict={handlePredict}
                handleCancel={handleCancel}
                numberOrderPerPage={numberOrderPerPage} />
            <br></br>

            <Divider horizontal>
            <Header as='h3' className="visualizationView">
                <Icon name='area graph' />
                    Visualization
            </Header>
            </Divider>
            <div className="visual">
                <Visualization />
            </div>

        </React.Fragment>
    </div>
);

export default B2BDetection;