import React from 'react';
import {ShotChart} from './ShotChart';
import { Switch } from 'antd';
import "../styles/DataViewContainer.css"
import { Radio } from 'antd';
import _ from 'lodash';
import { CountSlider } from './CountSlider';

const RadioGroup = Radio.Group;

export class DataViewContainer extends React.Component {
  state = {
    minCount: 0,
    charType: "hexbin",
    displayToolTips: true
  }

  onChartTypeChange = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      charType: e.target.value,
    });
  }

  onToolTipChange = (value) => {
    this.setState({
      displayToolTips: value,
    });
  }

  onCountSliderChange = (value) => {
    if (isNaN(value)) {
      return;
    }
    this.setState({
      minCount: value,
    });
  }
  render() {
    const { minCount, charType } = this.state;

    return (
      <div className="data-view">
        <ShotChart 
          playerId={this.props.playerId}
          minCount={minCount}
          displayToolTips={this.state.displayToolTips}
          charType={charType} />
        
        {
          this.state.charType === "hexbin" ? 
            (<CountSlider 
                onCountSliderChange={_.debounce(this.onCountSliderChange, 500)}
                defaultValue={minCount}
                />
            ) : null
        }
        
        <RadioGroup onChange={this.onChartTypeChange} value={charType}>
        <Radio value={"hexbin"}>Hexbin</Radio>
        <Radio value={"scatter"}>Scatter</Radio>
      </RadioGroup>
      <Switch onChange={this.onToolTipChange} checkedChildren="ON" unCheckedChildren="OFF" defaultChecked />
      </div>
      
    );
  }
}