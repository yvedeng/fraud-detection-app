import React from 'react';
import { Checkbox } from 'semantic-ui-react';

class SlideBar extends React.Component{

    constructor() {
        super();

        this.state = {
            showAllOrderLines: false
        }
    }

    handleExpandAllClick(e) {
        this.setState({showAllOrderLines: !this.state.showAllOrderLines})
    }

    render() {
        return (
            <div >
                 <Checkbox checked={this.state.showAllOrderLines} label='Show All OrderLines' onChange={this.handleExpandAllClick} toggle />
            </div>
        )
    }
}

export default SlideBar;