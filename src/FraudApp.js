import React from 'react';
import { Segment, Dimmer} from 'semantic-ui-react';
import Overview from './components/Overview';
import { orders, initialOrders} from './components/fakeData';

class FraudApp extends React.Component{
    constructor() {
        super()
        this.state = {
            accounts: [],
            orders: initialOrders,
            newOrders: initialOrders,
            isSearching: false,
            isPredicting: false,
            numberOrderPerPage: 1
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

    // Needs to fix
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
    
    handleSearch(accountId) {
        this.setState({isSearching: true});
        console.log(accountId);
        if (accountId === 0){
            this.setState({orders: []});
            this.setState({newOrders: []})
        }
        setTimeout(function (){
            // Something you want delayed.
            this.setState({orders: orders});
            this.setState({newOrders: orders});
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
                isPredicting={this.state.isPredicting}
                onSubmit={this.handleSearch.bind(this)} 
                handlePredict={this.handlePredict.bind(this)}
                numberOrderPerPage={this.state.numberOrderPerPage}/>
            </Dimmer.Dimmable>
            </div>
        )
    }
}

export default FraudApp;