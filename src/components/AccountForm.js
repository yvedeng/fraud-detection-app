import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';

class AccountForm extends React.Component{  

    constructor(){
        super();
        this.state = {
            accountId: 0
        }
    }

    handleSubmit(){
        this.props.onClick(this.state.accountId)
        this.setState({accountId: 0});
    }

    handleChange(e){
        console.log(e.target.value);
        this.setState({accountId: e.target.value})
    }
    render() {
        return(
            <Form 
                onSubmit={this.handleSubmit.bind(this)}
            >
                <Form.Group inline>
                <Form.Input
                    label='B2B Account ID:' 
                    control='select'
                    onChange={this.handleChange.bind(this)}
                >
                    {this.props.allAccounts.map(account => 
                        <option key={account.key}
                            value={account.value}>{account.text}</option>
                    )}
                </Form.Input>
                <Form.Button 
                    compact={true}
                    positive
                    content={this.props.isSearching? 'Searching':'Search'}
                    loading={this.props.isSearching}>
                </Form.Button>
      
                </Form.Group>
                </Form>
        );
    } 
}

AccountForm.propTypes = {
    allAccounts: PropTypes.arrayOf(PropTypes.object),
    isSearching: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
}

export default AccountForm;