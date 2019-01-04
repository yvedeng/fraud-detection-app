import React from 'react';
import { Grid } from 'semantic-ui-react';
import PieChart from './visualization/PieChart';
import RadarChart from './visualization/RadarChart';
import XYChart from './visualization/XYChart';

class Visualization extends React.Component {

    componentDidMount() {
        
    }

    render() {
        return (
            <Grid.Column>
                <PieChart />
                <RadarChart />
                <XYChart />
            </Grid.Column>
        )
    }
}

export default Visualization;