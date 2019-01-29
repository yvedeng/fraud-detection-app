import React from 'react';
import PropTypes from 'prop-types';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

class LineChart extends React.Component {
    componentDidMount() {

        am4core.useTheme(am4themes_animated);

        let chart = am4core.create(this.props.divId, am4charts.XYChart);

        chart.colors.step = 5;

        const visualData = [];

        for(let i=0; i<this.props.data.length; i++) {
            const n_ols = this.props.data[i].orderLines.length;
            const ol = this.props.data[i].orderLines[0]; 
            let totalValue = 0;
            if (n_ols > 1) {
                totalValue = this.props.data[i].orderLines.reduce((sum, x) => {
                    return sum + parseInt(x.cardValue) * parseInt(x.quantity);
                }, 0)
                
            } else {
                totalValue = parseInt(ol.cardValue) * parseInt(ol.quantity);
            }
            if (isNaN(totalValue)) {
                console.error(this.props.data[i])
            }
            // since orderlines in the same order has the same timestamp, get the first orderline is enough
            var timestamp = new Date(ol.year, ol.month-1, ol.day, ol.hour, ol.minute, ol.second);
                
            visualData.push({"time": timestamp, "orderId": this.props.data[i].orderID.toString(), "n_orderLines": n_ols, "totalValue": totalValue});
            
        }
        console.log(visualData);
        chart.data = visualData;

        // Create axes
        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.minGridDistance = 50;

        function createAxisAndSeries(field, name, opposite, bullet) {
            let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            let series = chart.series.push(new am4charts.LineSeries());
            series.dataFields.valueY = field;
            series.dataFields.dateX = "time";
            series.strokeWidth = 2;
            series.yAxis = valueAxis;
            series.name = name;
            series.tooltipText = "{name}: [bold]{valueY}[/]\ntime: [bold]{time}[/]\norderId: {orderId}";
            series.tensionX = 0.8;

            let interfaceColors = new am4core.InterfaceColorSet();

            switch (bullet) {
                case "triangle":
                    let triangleBullet = series.bullets.push(new am4charts.Bullet());
                    triangleBullet.width = 12;
                    triangleBullet.height = 12;
                    triangleBullet.horizontalCenter = "middle";
                    triangleBullet.verticalCenter = "middle";

                    let triangle = triangleBullet.createChild(am4core.Triangle);
                    triangle.stroke = interfaceColors.getFor("background");
                    triangle.strokeWidth = 2;
                    triangle.direction = "top";
                    triangle.width = 12;
                    triangle.height = 12;
                    break;

                case "rectangle":
                    let rectangleBullet = series.bullets.push(new am4charts.Bullet());
                    rectangleBullet.width = 10;
                    rectangleBullet.height = 10;
                    rectangleBullet.horizontalCenter = "middle";
                    rectangleBullet.verticalCenter = "middle";
                    
                    let rectangle = rectangleBullet.createChild(am4core.Rectangle);
                    rectangle.stroke = interfaceColors.getFor("background");
                    rectangle.strokeWidth = 2;
                    rectangle.width = 10;
                    rectangle.height = 10;
                    break; 

                default:
                    let circleBullet = series.bullets.push(new am4charts.CircleBullet());
                    circleBullet.circle.stroke = interfaceColors.getFor("background");
                    circleBullet.circle.strokeWidth = 2;
                    break;
            }

            valueAxis.renderer.line.strokeOpacity = 1;
            valueAxis.renderer.line.strokeWidth = 2;
            valueAxis.renderer.line.stroke = series.stroke;
            valueAxis.renderer.labels.template.fill = series.stroke;
            valueAxis.renderer.opposite = opposite;
            valueAxis.renderer.grid.template.disabled = true;
        }

        
        // Create series
        createAxisAndSeries("n_orderLines", "numberOfOrderLines", true, "triangle");
        createAxisAndSeries("totalValue", "totalValue", false, "circle");

       // Add legend
        chart.legend = new am4charts.Legend();

        // Add cursor
        chart.cursor = new am4charts.XYCursor();
    
        // chart.cursor.snapToSeries = series;
        chart.cursor.xAxis = dateAxis;

        //chart.scrollbarY = new am4core.Scrollbar();
        chart.scrollbarX = new am4core.Scrollbar();
    }

    componentWillUnmount() {
        if (this.chart) {
          this.chart.dispose();
        }
      }
  
    render(){
        return (
            <div id={this.props.divId} style={{ width: "100%", height: "500px" }}></div>
        );
    }
}

LineChart.propTypes = {
    data: PropTypes.array.isRequired,
    divId: PropTypes.string.isRequired
};

export default LineChart;
