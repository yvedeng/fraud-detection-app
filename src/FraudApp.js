import React from 'react';
import { Segment, Dimmer} from 'semantic-ui-react';
import iziToast from 'izitoast';
import B2bDetection from './components/B2bDetection';
import { orders, initialOrders} from './api/fakeData';

class FraudApp extends React.Component{
    constructor() {
        super()
        this.state = {
            accounts: [],
            orders: initialOrders,
            newOrders: initialOrders,
            isSearching: false,
            isPredicting: false,
            numberOrderPerPage: 1,
            predictedOrders: []
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
            iziToast.success({
                title: 'Success',
                message: 'Searched successfully',
                position: 'topRight',
                timeout: 3000
            })
          }.bind(this), 1000);
    }

    handlePredict(order){
        if (! this.state.predictedOrders.includes(order.orderId)) {
            this.setState({isPredicting: true});
            let predictedOrder = Object.assign({}, order);
            
            setTimeout(function(){
                const predictedResults = [ {orderLineId: 10000,
                                        state: false}, 
                                        {orderLineId: 10001,
                                            state: true}];
                
                predictedOrder.orderLines.map(ol => ol.isFraudulent = predictedResults.filter(
                    result=>result.orderLineId===ol.orderLineId)[0].state);
                
                const idx = this.state.newOrders.findIndex((no) => no.orderId === order.orderId)
                
                this.setState({newOrders: [...this.state.newOrders.slice(0, idx), predictedOrder, ...this.state.newOrders.slice(idx+1)]});
                this.setState({predictedOrders: [...this.state.predictedOrders, order.orderId]})
                this.setState({isPredicting: false});
                iziToast.success({
                    title: 'Success',
                    message: 'Predicted successfully',
                    position:'topRight',
                    timeout: 3000
                })
            }.bind(this), 5000);
        } else {
            // send a notification
            iziToast.warning({
                title: 'Caution',
                message: 'You\'ve predicted the order already.',
                position: 'topRight',
                timeout: 3000
            });
        }
    }

    handleCancel(order) {
        this.setState({isPredicting: false});
        iziToast.warning({
            title: 'Caution',
            message: 'You\'ve cancelled the prediction.',
            position: 'topRight',
            timeout: 3000
        });
    }

    render() {
        return (
            <Dimmer.Dimmable as={Segment}>
                <B2bDetection 
                    accounts={this.state.accounts} 
                    orders={this.state.orders}
                    newOrders={this.state.newOrders}
                    isSearching={this.state.isSearching}
                    isPredicting={this.state.isPredicting}
                    onSubmit={this.handleSearch.bind(this)} 
                    handlePredict={this.handlePredict.bind(this)}
                    numberOrderPerPage={this.state.numberOrderPerPage}
                    predictResults={this.state.predictedResults}
                    handleCancel={this.handleCancel.bind(this)}/>
            </Dimmer.Dimmable>   
        )
    }
}

export default FraudApp;