import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Select } from 'semantic-ui-react';
import XYChart from './XYChart';
import { OrderShape } from '../PropTypes';
import LineChart from './LineChart';
import PieChart from './PieChart';

export default class FeatureStatistic extends React.Component {

    constructor() {
        super();

        this.state = {
            selectedFeature: null
        };

        this._getFeatureOccupation = this._getFeatureOccupation.bind(this);
        this.handleFeatureSelectChange = this.handleFeatureSelectChange.bind(this);
    }

    handleFeatureSelectChange(e, {value}) {
        this.setState({
            selectedFeature: value
        });
    }

    _getFeatureList(importances) {
        const features =  importances.map(importance => {
            return importance.feature
        });
        const options = features.map((f, i) => {
            return {key: i, value: f, text: f}
        });

        // removed 'orderLineID' and 'orderID' since they are unique and not useful to 
        // see the pattern
        return options.slice(2); 
    }

    // needed to be fixed
    _getFeatureOccupation() {
        console.log(this.state.selectedFeature)
        const feature = this.state.selectedFeature;
        const orders = this.props.oldOrders;
        if(feature && orders) {
            let count = 0;
            const map = new Map();
            const FeatureList = orders.map((order)=>{
                const lines = order.orderLines.map((ol) => {
                    var timestamp = new Date(ol.year, ol.month, ol.day, ol.hour, ol.minute, ol.second);
                    return {key: count, value: ol[feature], time: timestamp};
                })
                return lines;
            })
            const flattenFeatureList = FeatureList.flat();
            flattenFeatureList.map(el =>{
                let num = map.get(el.value);
                if (!num && num!==0) {
                    map.set(el.value, 1);
                } else {
                    let newNum = num + 1;
                    map.set(el.value, newNum);;
                }
            });
            
            const data = [];
            map.forEach((v, k) => {
                data.push({"category": k, "value": v})
            })
            return data;
        } else {
            return null;
        }
    }

    render() {
        let oldData = this._getFeatureOccupation();
        console.log(oldData);
        return (
            <div>
            <Grid.Column>
                <Select 
                    placeholder='Select a feature' 
                    options={this._getFeatureList(this.props.importances)}
                    onChange={this.handleFeatureSelectChange} />
            </Grid.Column>
                {this.state.selectedFeature?
                <Grid.Column>
                    <h3 style={{justifyContent: 'center'}}>The situation on {this.state.selectedFeature} for normal orders</h3>
                    <PieChart 
                        data={oldData}
                        divId={"feature-div-" + this.state.selectedFeature}
                        value={"value"}
                        category={"category"}/>
                </Grid.Column>
                : null}
            
            </div>
        )
    }
}

FeatureStatistic.propTypes = {
    newOrders: PropTypes.arrayOf(PropTypes.shape(OrderShape)).isRequired,
    oldOrders: PropTypes.arrayOf(PropTypes.shape(OrderShape)).isRequired,
    importances: PropTypes.array
}