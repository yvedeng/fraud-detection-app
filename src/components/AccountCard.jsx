import React from 'react';
import PropTypes from 'prop-types';
import { AccountShape } from './PropTypes';
import { Card, Icon, Button } from 'semantic-ui-react';

export default class AccountCard extends React.Component {

    handleSubmit(){
        if(this.props.account){
            this.props.onClick(this.props.account.accountID)
        }
    }

    render() {
        return (
                <Card>
                <Card.Content
                    header= {this.props.account.name}
                    meta={'Joined in ' + this.props.account.accountCreated.substring(0, 10)}
                    description={this.props.account.accountType}
                />
                <Card.Content extra>
                    <Card.Description>
                        <Icon name="user outline" /> {this.props.account.nContacts + ' Contacts'} 
                    </Card.Description>
                    <Card.Description>
                       <Icon name="credit card outline" /> {this.props.account.defaultPaymentMethod}
                    </Card.Description>
                    <Card.Description>
                        <Icon name="cart"/> Shop ID: {this.props.account.shopID}
                    </Card.Description>
                    <Card.Description>
                        <Icon name="list alternate outline"/>Is WhiteListed: {this.props.account.IsWhiteListed}
                    </Card.Description>
                </Card.Content>

                <Card.Content extra>
                    <Button basic 
                    color='green'
                    onClick={this.handleSubmit.bind(this)}
                    loading={this.props.isSearching}
                    disabled={this.props.isSearching}
                    >
                        Search Order History
                    </Button>
                </Card.Content>
                <Card.Content extra>
                    <Button basic color='red'>
                        Push All New to Detected Order
                    </Button>
                </Card.Content>
            </Card>
        );
    }
}

AccountCard.propTypes = {
    account: PropTypes.shape(AccountShape),
    onClick: PropTypes.func.isRequired,
    isSearching: PropTypes.bool.isRequired
};