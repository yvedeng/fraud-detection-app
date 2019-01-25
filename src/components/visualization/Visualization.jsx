import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Select } from 'semantic-ui-react';
import PieChart from './PieChart';
import XYChart from './XYChart';
import LineChart from './LineChart';

class Visualization extends React.Component {

    constructor() {
        super();

        this.state = {
            selectedFeature: null
        };
    }
    shouldComponentUpdate(nextProps) {
        if (this.props.importances !== nextProps.importances) {
            console.log(this.props.importances)
            return true;
        } else {
            return false;
        }
    }

    handleFeatureSelectChange(e) {
        this.setState({
            selectedFeature: e.target.value
        });
    }

    _getFeatureList(importances) {
        const features =  importances.map(importance => {
            return importance.feature
        });
        const options = features.map((f, i) => {
            return {key: i, value: f, text: f}
        })
        console.log(options);
        return options;
    }

    _getCompareList(orders, feature) {
        if(feature){
            const FeatureList = orders.map((order, i)=>{
                return {key: i, value: order[feature]};
            })
    
            return FeatureList;
        } else {
            return null
        }
       
    }

    _getSellReport(oldOrders, newOrders) {

    }

    render() {
        return (
            <div>
                <Grid.Column>
                    <h3> The Importance of Feature</h3>
                    <PieChart importances={this.props.importances}/> 
                </Grid.Column>
                <b></b>
                <Grid.Column>
                    <Select 
                        placeholder='Select a feature' 
                        options={this._getFeatureList(this.props.importances)}
                        onChange={this.handleFeatureSelectChange.bind(this)} />
                    <h3>Comparision between features</h3>
                    {this.state.selectedFeature?
                    <XYChart 
                        feature={this.state.selectedFeature}
                        newOrders={this._getCompareList(this.props.newOrders, this.state.selectedFeature)}
                        oldOrders={this._getCompareList(this.props.oldOrders, this.state.selectedFeature)}/>
                    : null}
                </Grid.Column>
                <Grid.Column>
                    <LineChart
                        sellReport={this._getSellReport(this.props.oldOrders, this.props.newOrders)}/>
                </Grid.Column>
            </div>
            
        )
    }
}

Visualization.prototypes={
    importances: PropTypes.array.isRequired,
    newOrders: PropTypes.array,
    oldOrders: PropTypes.array
};

export default Visualization;