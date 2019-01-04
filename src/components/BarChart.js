import * as d3 from 'd3';
import { importance } from '../api/fakeData';

export function barChart() {
    
    // console.log(importance.length) // 18

    var margin = {top: 20, bottom: 20, right:20, left:20},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom,
        barWidth = Math.floor(width/(importance.length))-1;

    var xScale = d3.scaleLinear()
                   .domain([importance.map(function(d){return d.axis})])
                   .range([margin.left, width]);

    var yScale = d3.scaleLinear()
                   .domain([0, d3.max(importance.map(function(d){return parseInt(d.value)*1000}))])
                   .range([height, margin.top]);

    var xAxis = d3.axisBottom()
                  .scale(xScale)
                  .ticks(18)
                  .tickFormat(d3.format(".0s"));

    var yAxis = d3.axisLeft()
                  .scale(yScale) 
                  .ticks(10)
                  .tickFormat(d3.format(".0s"));
    
    const svg = d3.select('div.visual')
                  .append("svg")
                  .attr("class", "barchart")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom)
                  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
   
    svg.append("g")
       .attr("class", "element")
       .selectAll("rect")
       .data(importance)
       .enter()
       .append("rect")
       .attr("x", function(_, i){return i*barWidth + margin.left;})
       .attr("y", function(d){return d.value*1000})
       .attr("width", barWidth)
       .attr("height", function(d) {return height-d.value*1000} )
       .attr("fill", "green");

    svg.append("g")
       .attr("class", "x axis")
       .attr('transform', 'translate(0,' + height + ')')
       .call(xAxis)
       .selectAll("text")
       .style("text-anchor", "end")
       .attr("dx", "-.8em")
       .attr("dy", "-.55em")
       .attr("transform", "rotate(-90)");
    
    svg.append("g")
        .attr('transform', 'translate('+ margin.left + ', 0)')
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end");
};


// export function radarChart(id, d, options) {
//     var cfg = {
//         radius: 5,
//         w: 600,
//         h: 600,
//         factor: 1,
//         factorLegend: .85,
//         levels: 3,
//         maxValue: 0,
//         radians: 2 * Math.PI,
//         opacityArea: 0.5,
//         ToRight: 5,
//         TranslateX: 80,
//         TranslateY: 30,
//         ExtraWidthX: 100,
//         ExtraWidthY: 100,
//         color: d3.scale.category10()
//        };
       
//        if('undefined' !== typeof options){
//          for(var i in options){
//            if('undefined' !== typeof options[i]){
//              cfg[i] = options[i];
//            }
//          }
//        }
//        cfg.maxValue = Math.max(cfg.maxValue, d3.max(d, function(i){return d3.max(i.map(function(o){return o.value;}))}));
//        var allAxis = (d[0].map(function(i, j){return i.axis}));
//        var total = allAxis.length;
//        var radius = cfg.factor*Math.min(cfg.w/2, cfg.h/2);
//        var Format = d3.format('%');
//        d3.select(id).select("svg").remove();
       
//        var g = d3.select(id)
//                .append("svg")
//                .attr("width", cfg.w+cfg.ExtraWidthX)
//                .attr("height", cfg.h+cfg.ExtraWidthY)
//                .append("g")
//                .attr("transform", "translate(" + cfg.TranslateX + "," + cfg.TranslateY + ")");
//                ;
   
//        var tooltip;
       
//        //Circular segments
//        for(var j=0; j<cfg.levels-1; j++){
//          var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
//          g.selectAll(".levels")
//           .data(allAxis)
//           .enter()
//           .append("svg:line")
//           .attr("x1", function(d, i){return levelFactor*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
//           .attr("y1", function(d, i){return levelFactor*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
//           .attr("x2", function(d, i){return levelFactor*(1-cfg.factor*Math.sin((i+1)*cfg.radians/total));})
//           .attr("y2", function(d, i){return levelFactor*(1-cfg.factor*Math.cos((i+1)*cfg.radians/total));})
//           .attr("class", "line")
//           .style("stroke", "grey")
//           .style("stroke-opacity", "0.75")
//           .style("stroke-width", "0.3px")
//           .attr("transform", "translate(" + (cfg.w/2-levelFactor) + ", " + (cfg.h/2-levelFactor) + ")");
//        }
   
//        //Text indicating at what % each level is
//        for(var j=0; j<cfg.levels; j++){
//          var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
//          g.selectAll(".levels")
//           .data([1]) //dummy data
//           .enter()
//           .append("svg:text")
//           .attr("x", function(d){return levelFactor*(1-cfg.factor*Math.sin(0));})
//           .attr("y", function(d){return levelFactor*(1-cfg.factor*Math.cos(0));})
//           .attr("class", "legend")
//           .style("font-family", "sans-serif")
//           .style("font-size", "10px")
//           .attr("transform", "translate(" + (cfg.w/2-levelFactor + cfg.ToRight) + ", " + (cfg.h/2-levelFactor) + ")")
//           .attr("fill", "#737373")
//           .text(Format((j+1)*cfg.maxValue/cfg.levels));
//        }
   
//        var axis = g.selectAll(".axis")
//                .data(allAxis)
//                .enter()
//                .append("g")
//                .attr("class", "axis");
   
//        axis.append("line")
//            .attr("x1", cfg.w/2)
//            .attr("y1", cfg.h/2)
//            .attr("x2", function(d, i){return cfg.w/2*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
//            .attr("y2", function(d, i){return cfg.h/2*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
//            .attr("class", "line")
//            .style("stroke", "grey")
//            .style("stroke-width", "1px");
   
//        axis.append("text")
//            .attr("class", "legend")
//            .text(function(d){return d})
//            .style("font-family", "sans-serif")
//            .style("font-size", "11px")
//            .attr("text-anchor", "middle")
//            .attr("dy", "1.5em")
//            .attr("transform", function(d, i){return "translate(0, -10)"})
//            .attr("x", function(d, i){return cfg.w/2*(1-cfg.factorLegend*Math.sin(i*cfg.radians/total))-60*Math.sin(i*cfg.radians/total);})
//            .attr("y", function(d, i){return cfg.h/2*(1-Math.cos(i*cfg.radians/total))-20*Math.cos(i*cfg.radians/total);});
   
//     }
