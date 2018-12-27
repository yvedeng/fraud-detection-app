import React from 'react';
import * as d3 from "d3";

class Visualization extends React.Component {

    componentDidMount() {
        this.drawChart();
    }

    drawChart() {
        const data = [10,2,4,5];
        const svg = d3.select('div.visual')
                      .append("svg")
        svg.selectAll("rect")
           .data(data)
           .enter()
           .append("rect")
           .attr("x", (d, i) => i * 70)
           .attr("y", 0)
           .attr("width", 25)
           .attr("height", (d, i) => d)
           .attr("fill", "green");
    }

    render() {
        return <div></div>
    }
}

export default Visualization;