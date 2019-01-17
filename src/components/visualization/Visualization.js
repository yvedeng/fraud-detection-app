import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import PieChart from './PieChart';
import RadarChart from './RadarChart';
import XYChart from './XYChart';

class Visualization extends React.Component {

    shouldComponentUpdate(nextProps) {
        if (this.props.importances !== nextProps.importances) {
            console.log(this.props.importances)
            return true;
        } else {
            return false;
        }
    }

    render() {
        return (
            <Grid.Column>
                <h3> The Importance of Feature</h3>
                <PieChart importances={this.props.importances}/>
                {/* <RadarChart importances={this.props.importances}/> */}
                <XYChart />
            </Grid.Column>
            
        )
    }
}

Visualization.prototypes={
    importances: PropTypes.array.isRequired
};

export default Visualization;