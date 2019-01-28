import React from 'react';
import PropTypes from 'prop-types';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

class PieChart extends React.Component {
    

    componentDidMount() {
        this.setUpChart();
    }

    componentDidUpdate(prevProps){
        if (this.props.data !== prevProps.data) {
            console.log(this.props.data);
            this.setUpChart();
        }
    }
    componentWillUnmount() {
      if (this.chart) {
        this.chart.dispose();
      }
    }

    setUpChart() {
        const dataJson = eval(JSON.stringify(this.props.data));
            
        am4core.useTheme(am4themes_animated);

        let chart = am4core.create(this.props.divId, am4charts.PieChart);

        let series = chart.series.push(new am4charts.PieSeries());
            series.dataFields.value = this.props.value;
            series.dataFields.category = this.props.category;

        chart.data = dataJson;
        
        // And, for a good measure, let's add a legend
        chart.legend = new am4charts.Legend();

        this.chart = chart;
    }

    render(){
        return (
            <div id={this.props.divId} style={{ width: "100%", height: "500px" }}></div>
            );
    }
}

PieChart.propTypes = {
    data: PropTypes.array.isRequired,
    value: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    divId: PropTypes.string.isRequired
};

export default PieChart;