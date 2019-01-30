import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import iziToast from 'izitoast';
import B2bDetectionOverview from '../components/B2bDetectionOverview';
import * as OrderHistoryActions from '../actions/orderHistoryActions';

class B2bContainer extends React.Component {
    constructor() {
        super();

        this.onClickSearch = this.onClickSearch.bind(this);
        this.handlePredict = this.handlePredict.bind(this);
        this.handleAccountChange = this.handleAccountChange.bind(this);
        this.handleShowNew = this.handleShowNew.bind(this);
        this.handleShowOld = this.handleShowOld.bind(this);
        this.handleUpdateSingle = this.handleUpdateSingle.bind(this);
        this.handleUpdateOneOrder = this.handleUpdateOneOrder.bind(this);

    }

    componentWillMount(){
        this.props.b2bActions.loadB2BAccountList();
    }

    handleShowNew() {
        this.props.b2bActions.handleShowNewOrderLines(this.props.showNewOrderLines);
    }

    handleShowOld() {
        this.props.b2bActions.handleShowOldOrderLines(this.props.showOrderLines);
    }

    onClickSearch(accountId) {
        if (accountId){
            this.props.b2bActions.getOrderHistory(accountId);
        } else {
            iziToast.warning({
                title: 'Warning',
                message: '',
                position: 'topRight',
                timeout: 3000
            });
        }
    }
    
    handleAccountChange(account){
        this.props.b2bActions.handleAccountSelectChange(account);
    }

    handleUpdateOneOrder(order) {
        iziToast.question({
            timeout: 20000,
            close: false,
            overlay: true,
            displayMode: 'once',
            id: 'question',
            zindex: 999,
            title: 'Warmly warning',
            message: 'You cannot see the undetected orders before this order, are you sure?',
            position: 'center',
            buttons: [
                ['<button><b>YES</b></button>', function (instance, toast) {
        
                    instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
        
                }, true],
                ['<button>NO</button>', function (instance, toast) {
        
                    instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
        
                }],
            ],
            onClosing: function(instance, toast, closedBy){
                console.info('Closing | closedBy: ' + closedBy);
            },
            onClosed: function(instance, toast, closedBy){
                console.info('Closed | closedBy: ' + closedBy);
            }
        });

        this.handleUpdateOneOrder(order);
    }

    handlePredict(order) {
        this.setState({isPredicting: true})
        this.props.b2bActions.predictOrder(order);
    }

    handleUpdateSingle(order){
        this.props.b2bActions.updateSingleOrder(order);
    }

    render() {
        return (
               <B2bDetectionOverview
                    accounts={this.props.orderReducer.accounts}
                    account={this.props.orderReducer.account}
                    oldOrders={this.props.orderReducer.oldOrders}
                    newOrders={this.props.orderReducer.newOrders}
                    isSearching={this.props.orderReducer.isSearching}
                    isPredicting={this.props.orderReducer.isPredicting}
                    isSingleOrderUpdating={this.props.orderReducer.isSingleOrderUpdating}
                    onSearchHistory={this.onClickSearch}
                    handlePredict={this.handlePredict}
                    handleUpdateSingle={this.handleUpdateOneOrder}
                    handleAccountChange={this.handleAccountChange}
                    numberOrderPerPage={this.props.numberOrderPerPage}
                    importances={this.props.orderReducer.importances}
                    handleShowNew={this.handleShowNew}
                    handleShowOld={this.handleShowOld}
                    showOldOrderLines={this.props.orderReducer.showOldOrderLines}
                    showNewOrderLines={this.props.orderReducer.showNewOrderLines}
                >
               </B2bDetectionOverview>
        );
    }
};

B2bContainer.propTypes = {
    orderReducer: PropTypes.object.isRequired,
    b2bActions: PropTypes.object,
    numberOrderPerPage: PropTypes.number.isRequired
}

// state -> rootReducer
function mapStateToProps(state, ownProps) {
    return {
        orderReducer: state.orderReducer
    }
};

function mapDispatchToProps(dispatch) {
    return {
        b2bActions: bindActionCreators(OrderHistoryActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(B2bContainer);

