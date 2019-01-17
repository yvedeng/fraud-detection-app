import React from 'react';
import PropTypes from 'prop-types';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

class PieChart extends React.Component {
    
    componentDidMount(){
            const importanceJson = eval(JSON.stringify(this.props.importances));
            
            am4core.useTheme(am4themes_animated);

            let chart = am4core.create("piechart", am4charts.PieChart);

            let series = chart.series.push(new am4charts.PieSeries());
                series.dataFields.value = "importance";
                series.dataFields.category = "feature";

            chart.data = importanceJson;
            
            // [{
            //         "importance":0.011,
            //         "feature":"orderLineID"
            //     },{
            //         "importance":0.0139,
            //         "feature":"orderID"
            //     },{
            //         "importance":0.047,
            //         "feature":"customerContactID"
            //     },{
            //         "importance":0.5981,
            //         "feature":"paymentType"
            //     },{
            //         "importance":0.0871,
            //         "feature":"origin"
            //     },{
            //         "importance":0,
            //         "feature":"shopID"
            //     },{
            //         "importance":0.0024,
            //         "feature":"countryID"
            //     },{
            //         "importance":0.0221,
            //         "feature":"deliveryMethodID"
            //     },{
            //         "importance":0.0504,
            //         "feature":"productRelationID"
            //     },{
            //         "importance":0.0247,
            //         "feature":"cardValue"
            //     },{
            //         "importance":0.0034,
            //         "feature":"quantity"
            //     },{
            //         "importance":0.0828,
            //         "feature":"productID"
            //     },{
            //         "importance":0.0048,
            //         "feature":"isCredited"
            //     },{
            //         "importance":0.001,
            //         "feature":"year"
            //     },{
            //         "importance":0.0076,
            //         "feature":"month"
            //     },{
            //         "importance":0.0122,
            //         "feature":"day"
            //     },{
            //         "importance":0.0088,
            //         "feature":"hour"
            //     },{
            //         "importance":0.0095,
            //         "feature":"minute"
            //     },{
            //         "importance":0.0133,
            //         "feature":"second"
            //     }];
            
            console.log(chart.data)
            
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

PieChart.propTypes = {
    importances: PropTypes.array.isRequired
}

export default PieChart;