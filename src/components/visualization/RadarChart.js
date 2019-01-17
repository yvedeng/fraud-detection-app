import React from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_kelly from "@amcharts/amcharts4/themes/kelly";


class RadarChart extends React.Component {
    componentDidMount() {
        /* Set themes */
        am4core.useTheme(am4themes_animated);
        am4core.useTheme(am4themes_kelly);

        /* Create chart instance */
        var chart = am4core.create("radar", am4charts.RadarChart);

        const importanceJson = eval(JSON.stringify(this.props.importances));
        /* Add data */
        chart.data = importanceJson;

        /* Create axes */
        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "feature";

        chart.yAxes.push(new am4charts.ValueAxis());

        /* Create and configure series */
        var series = chart.series.push(new am4charts.RadarColumnSeries());
        series.dataFields.valueY = "importance";
        series.dataFields.categoryX = "feature";
        series.name = "Importance";
        series.strokeWidth = 3;
        series.zIndex = 2;
        series.sequencedInterpolation = true;
        series.sequencedInterpolationDelay = 100;

        // var series2 = chart.series.push(new am4charts.RadarColumnSeries());
        // series2.dataFields.valueY = "units";
        // series2.dataFields.categoryX = "country";
        // series2.name = "Units";
        // series2.strokeWidth = 0;
        // series2.columns.template.tooltipText = "Series: {name}\nCategory: {categoryX}\nValue: {valueY}";
        // series2.sequencedInterpolation = true;
        // series2.sequencedInterpolationDelay = 100;

        /* Add legend */
        chart.legend = new am4charts.Legend();

        /* Add cursor */
        chart.cursor = new am4charts.RadarCursor();

        this.chart = chart;
    }
  
    componentWillUnmount() {
      if (this.chart) {
        this.chart.dispose();
      }
    }

    render(){
        return (
            <div id="radar" style={{ width: "100%", height: "500px" }}></div>
            );
    }
}

export default RadarChart;