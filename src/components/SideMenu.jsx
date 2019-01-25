import React, { Component } from 'react'
import { Input, Label, Menu } from 'semantic-ui-react'

export default class SideMenu extends Component {
  state = { activeItem: 'historyorders' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu vertical>
        <Menu.Item
          name='historyorders'
          active={activeItem === 'historyorders'}
          onClick={this.handleItemClick}
        >
          <Label color='teal'>1</Label>
          Historical orders
        </Menu.Item>

        <Menu.Item
          name='neworders'
          active={activeItem === 'neworders'}
          onClick={this.handleItemClick}
        >
          <Label>51</Label>
          New Orders
        </Menu.Item>

        <Menu.Item>
          <Input icon='search' placeholder='Search mail...' />
        </Menu.Item>
      </Menu>
    )
  }
}