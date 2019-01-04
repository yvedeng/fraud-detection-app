import React from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

class PieChart extends React.Component {
    componentDidMount() {
        
        am4core.useTheme(am4themes_animated);

        let chart = am4core.create("piechart", am4charts.PieChart);
    
        let series = chart.series.push(new am4charts.PieSeries());
            series.dataFields.value = "litres";
            series.dataFields.category = "country";

        chart.data = [{
            "country": "Lithuania",
            "litres": 501.9
        }, {
            "country": "Czech Republic",
            "litres": 301.9
        }, {
            "country": "Ireland",
            "litres": 201.1
        }, {
            "country": "Germany",
            "litres": 165.8
        }, {
            "country": "Australia",
            "litres": 139.9
        }, {
            "country": "Austria",
            "litres": 128.3
        }, {
            "country": "UK",
            "litres": 99
        }, {
            "country": "Belgium",
            "litres": 60
        }, {
            "country": "The Netherlands",
            "litres": 50
        }];
        
        // And, for a good measure, let's add a legend
        chart.legend = new am4charts.Legend();

        this.chart = chart;
    }
  
    componentWillUnmount() {
      if (this.chart) {
        this.chart.dispose();
      }
    }

    render(){
        return (
            <div id="piechart" style={{ width: "100%", height: "500px" }}></div>
            );
    }
}

export default PieChart;