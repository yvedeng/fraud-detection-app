import React from 'react';
import { Segment, Dimmer} from 'semantic-ui-react';
import iziToast from 'izitoast';
import B2bDetection from './components/B2bDetectionOverview';
import B2bDetectApi from './api/B2bDetectApi';

class FraudApp extends React.Component{
    constructor() {
        super()
        this.state = {
            accounts: [],
            oldOrders: [],
            newOrders: [],
            isSearching: false,
            isPredicting: false,
            numberOrderPerPage: 1,
            predictedOrders: []
        }
    }

    componentWillMount(){
        this.getAccounts();
    }

  
    
    handleSearch(accountId) {
        this.setState({isSearching: true});
        console.log(accountId);
        if (accountId === 0){
            this.setState({orders: []});
            this.setState({newOrders: []});
            this.setState({predictedOrders: []});
        }
        // setTimeout(function (){
        //     // Something you want delayed.
        //     this.setState({orders: orders});
        //     this.setState({newOrders: orders});
        //     this.setState({predictedOrders: []});
        //     this.setState({isSearching: false});
        //     iziToast.success({
        //         title: 'Success',
        //         message: 'Searched successfully',
        //         position: 'topRight',
        //         timeout: 3000
        //     })
        //   }
        // .bind(this), 1000)

        B2bDetectApi.getOrderHistory({'account_id': accountId.toString()})
        .then((response) => {
            console.log('Success:', response)
            this.setState({isSearching: false})
            console.log(response)
            this.setState({orders: response["old"]})
            this.setState({newOrders: response["new"]})
            iziToast.success({
                title: 'Success',
                message: 'Searched successfully',
                position:'topRight',
                timeout: 3000
            })
        })
        .catch((error) => 
            {
                console.error('Error:', error)
                this.setState({isSearching: false})
                iziToast.error({
                    title: 'Error',
                    message: {error},
                    position: 'topRight',
                    timeout: 3000
                });
            })
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
                    orders={this.state.oldOrders}
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



