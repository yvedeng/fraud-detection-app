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

    handlePredict(order) {
        this.setState({isPredicting: true})
        this.props.b2bActions.predictOrder({'order':order});
    }

    componentWillMount(){
        this.props.b2bActions.loadB2BAccountList();
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
                    onSearchHistory={this.onClickSearch}
                    handlePredict={this.handlePredict}
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

