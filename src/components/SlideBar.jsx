import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Segment } from 'semantic-ui-react';

class SlideBar extends React.Component{

    handleExpandAllClick() {
        this.props.handleShow();
    };


    render() {
        return (
            <div>
                <Segment compact>
                <Checkbox 
                    checked={this.props.showAllOrderLines} 
                    label={this.props.showAllOrderLines? 'Show All OrderLines' : 'Hide All OrderLines'}
                    onChange={this.handleExpandAllClick.bind(this)} 
                    toggle />
                </Segment>
                <br></br>
            </div>
        )
    }
}

SlideBar.propTypes = {
    showAllOrderLines: PropTypes.bool.isRequired,
    handleShow: PropTypes.func.isRequired
}

export default SlideBar;