import React from 'react'
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

class LineChart extends React.Component {
    componentDidMount() {

        am4core.useTheme(am4themes_animated);
        // Themes end

        let chart = am4core.create("linediv", am4charts.XYChart);

        let data = [];
        let value = 50;
        let value2 = 0;
        for(let i = 0; i < 300; i++){
            let date = new Date();
            date.setHours(0,0,0,0);
            date.setDate(i);
            value -= Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
            value2 += 1
            data.push({date:date, value: value, value2: value2});
        }

        chart.data = data;

        // Create axes
        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.minGridDistance = 60;

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

        // Create series
        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = "value";
        series.dataFields.dateX = "date";
        series.tooltipText = "{value}"

        let series2 = chart.series.push(new am4charts.LineSeries());
        series2.dataFields.valueY = "value2";
        series2.dataFields.dateX = "date";
        series2.tooltipText = "{value2}"

        series.tooltip.pointerOrientation = "vertical";
        series2.tooltip.pointerOrientation = "vertical";

        chart.cursor = new am4charts.XYCursor();
        chart.cursor.snapToSeries = series;
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
            <div id="linediv" style={{ width: "100%", height: "500px" }}></div>
        );
    }
}

export default LineChart;
