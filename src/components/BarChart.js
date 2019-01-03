import * as d3 from 'd3';
import { importance } from '../api/fakeData';

export function barChart() {
    
    const svg = d3.select('div.visual')
                  .append("svg")

    svg.selectAll("rect")
        .data(importance)
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * 70)
        .attr("y", 0)
        .attr("width", 25)
        .attr("height", (d, i) =>  d.value)
        .attr("text", (d, i) => d.axis)
        .attr("fill", "green");
};

