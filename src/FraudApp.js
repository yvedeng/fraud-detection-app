import React from 'react';
import { Segment, Dimmer} from 'semantic-ui-react';
import Overview from './components/Overview';

class FraudApp extends React.Component{
    constructor() {
        super()
        this.state = {
            accounts: [],
            orders: [],
            newOrders: [],
            isSearching: false,
            isPredicting: false
        }
    }

    componentDidMount(){
        this.getAccounts();
    }

    getAccounts(){
        this.setState({
            accounts: [
                {key:100, text:"100th company", value:100},
                {key:101, text:"101st company", value:101},
                {key:102, text:"102nd company", value:102}
            ]
        })
    }

    _updateOrder(newOrders, orderLineId, isFraudulent){
        let order = Object.assign({}, newOrders.filter(order => order.orderLineId === orderLineId));
        order.state = isFraudulent;
        return order;
    }

    handlePredict(order){
        console.log(order)
        console.log(this.state.newOrders);
        this.setState({isPredicting: true});
        let predictedOrder = Object.assign({}, this.state.newOrders.filter((newOrder)=>newOrder.orderLineId === order.orderLineId));
        
        console.log(predictedOrder);

        setTimeout(function(){
            const isFraudulent = false;
            predictedOrder.state = isFraudulent;
            this.setState({newOrders: [
                ...this.state.newOrders]
            });
            console.log(this.state.newOrders);
        })
    }
    
    handleSubmit(accountId) {
        this.setState({isSearching: true});
        console.log(accountId);
        if (accountId === 0){
            this.setState({orders: []});
            this.setState({newOrders: []})
        }
        setTimeout(function (){
            // Something you want delayed.
            this.setState({orders: [
                {
                    orderLineId: 1,
                    paymentType: 2,
                    productId: 3,
                    cardValue: 4,
                    state: 1
                },
                {
                    orderLineId: 2,
                    paymentType: 3,
                    productId: 4,
                    cardValue: 5,
                    state: 0
                }
            ]});
    
            this.setState({newOrders: [{
                orderLineId: 3,
                paymentType: 4,
                productId: 5,
                cardValue: 6,
                state: 0
            }]});

            this.setState({isSearching: false});

          }.bind(this), 1000);
        
    }

    render() {
        return (
            <div>
            <Dimmer.Dimmable as={Segment} dimmed={this.state.isSearching}>
            <Overview 
                accounts={this.state.accounts} 
                orders={this.state.orders}
                newOrders={this.state.newOrders}
                isSearching={this.state.isSearching}
                onSubmit={this.handleSubmit.bind(this)} 
                handlePredict={this.handlePredict.bind(this)}/>
            </Dimmer.Dimmable>
            </div>
        )
    }
}

export default FraudApp;