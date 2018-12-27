import React from 'react';
import PropTypes from 'prop-types';
import { Table, Menu, Icon } from 'semantic-ui-react';
import OrderRow from './OrderRow';

const OrderList = ({orders, handlePredict}) => (
    <div>
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell> OrderLine ID </Table.HeaderCell>
                    <Table.HeaderCell> Payment Type </Table.HeaderCell>
                    <Table.HeaderCell> Product ID </Table.HeaderCell>
                    <Table.HeaderCell> Card Value </Table.HeaderCell>
                    <Table.HeaderCell> Is Fraudulent? </Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {console.log(orders)}
                {
                    orders.map((order, i) => {
                        console.log(order, i);
                        return (<OrderRow order={order} key={i} handlePredict={handlePredict}/>);
                    })
                }
            </Table.Body>

            <Table.Footer>
            <Table.Row>
                <Table.HeaderCell colSpan='5'>
                <Menu floated='right' pagination>
                    <Menu.Item as='a' icon>
                        <Icon name='chevron left' />
                    </Menu.Item>
                    <Menu.Item as='a'>1</Menu.Item>
                    <Menu.Item as='a'>2</Menu.Item>
                    <Menu.Item as='a'>3</Menu.Item>
                    <Menu.Item as='a'>4</Menu.Item>
                    <Menu.Item as='a' icon>
                    <   Icon name='chevron right' />
                    </Menu.Item>
                </Menu>
                </Table.HeaderCell>
            </Table.Row>
            </Table.Footer>
        </Table>
    </div>
) 

OrderList.propTypes = {
    orders: PropTypes.array,
    handlePredict: PropTypes.func
}
  
export default OrderList;