import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Header, Icon, Grid } from 'semantic-ui-react';
import PieChart from './PieChart';
import FeatureStatistic from './FeatureStatistic';

import { OrderShape } from '../PropTypes';
import XYChart from './XYChart';

class Visualization extends React.Component {

    render() {
        return (
            <div>
                {this.props.importances.length > 0?
                <div>
                    <Divider horizontal>
                    <Header as='h3' className="importance-visual">
                        <Icon name='area graph' />
                            The Importance of Feature
                    </Header>
                    </Divider>
                    <Grid.Column>
                        <PieChart 
                            data={this.props.importances}
                            value={"importance"}
                            category={"feature"}
                            divId={"importance-div"}/> 
                    </Grid.Column>
                    
                    <Divider horizontal>
                    <Header as='h3' className="feature-comparision">
                        <Icon name='area graph' />
                            Feature Comparision
                    </Header>
                    </Divider>
                    <FeatureStatistic 
                        importances={this.props.importances}
                        newOrders={this.props.newOrders}
                        oldOrders={this.props.oldOrders}
                    />
                </div>
                : null
                }

                
                {/* <Grid.Column>
                    <LineChart
                        sellReport={this._getSellReport(this.props.oldOrders, this.props.newOrders)}/>
                </Grid.Column> */}
            </div>
            
        )
    }
}

Visualization.prototypes={
    importances: PropTypes.array.isRequired,
    newOrders:  PropTypes.arrayOf(PropTypes.shape(OrderShape)).isRequired,
    oldOrders:  PropTypes.arrayOf(PropTypes.shape(OrderShape)).isRequired
};

export default Visualization;