import React from 'react';
import {barChart} from './BarChart';

class Visualization extends React.Component {

    componentDidMount() {
        barChart();
    }

    render() {
        return <div></div>
    }
}

export default Visualization;