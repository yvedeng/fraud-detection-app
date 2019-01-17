import React from 'react';
import PropTypes from 'prop-types';
import { Form, Card, Item } from 'semantic-ui-react';
import { AccountShape } from './PropTypes';

class AccountForm extends React.Component{  

    constructor(){
        super();
        this.state = {
            account: null
        };
    }

    handleSubmit(){
        if(this.state.account){
            this.props.onClick(this.state.account.accountID)
        }
    }

    handleChange(e){
        this.setState({account: this.props.allAccounts[e.target.value]})
    }
    render() {
        console.log(this.state.account)
        return(
            <Form 
                onSubmit={this.handleSubmit.bind(this)}>
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
                <Form.Button 
                    compact={true}
                    positive
                    content={this.props.isSearching? 'Searching':'Search'}
                    loading={this.props.isSearching}
                    disabled={this.props.isSearching}>
                </Form.Button>
                </Form.Group>
                {this.state.account?
                    <Card>
                    <Card.Content
                        header= { this.state.account.name + "  " + this.state.account.accountID}
                        meta={this.state.account.accountType}
                    />
                    <Card.Content extra>
                        <Item>
                            Number of Contacts: {this.state.account.nContacts}
                        </Item>
                        <Item>
                            Default Payment Method: {this.state.account.defaultPaymentMethod}
                        </Item>
                        <Item>
                            Shop ID: {this.state.account.shopID}
                        </Item>
                        <Item>
                            Is WhiteListed: {this.state.account.IsWhiteListed}
                        </Item>
                    </Card.Content>
                </Card> : null
                }
                    
            </Form>
        );
    } 
}

AccountForm.propTypes = {
    allAccounts: PropTypes.arrayOf(PropTypes.shape(AccountShape)),
    isSearching: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
}

export default AccountForm;