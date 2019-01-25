import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import { AccountShape } from './PropTypes';
import AccountCard from './AccountCard';

class AccountForm extends React.Component{  

    componentDidUpdate(prevProps) {
        if (this.props.account !== prevProps.account) {
            return true;
        } 
    }

    handleChange(e){
        const account = this.props.allAccounts[e.target.value]
        this.props.handleAccountChange(account)
    }

    render() {
        return(
            <Form >
                <Form.Group inline>
                <Form.Input
                    label='B2B Account ID:' 
                    control='select'
                    onChange={this.handleChange.bind(this)}>
                    {this.props.allAccounts.length===0? 
                        null :
                        this.props.allAccounts.map((account, i) => 
                        <option key={i} value={i} >{account.accountID}-{account.name}</option>
                    )}
                </Form.Input>
                </Form.Group>
                {this.props.account?
                    <AccountCard
                        account={this.props.account}
                        onClick={this.props.onClick}
                        isSearching={this.props.isSearching} /> : null}
            </Form>
        );
    } 
}

AccountForm.propTypes = {
    allAccounts: PropTypes.arrayOf(PropTypes.shape(AccountShape)),
    account: PropTypes.shape(AccountShape),
    isSearching: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    handleAccountChange: PropTypes.func.isRequired
}

export default AccountForm;