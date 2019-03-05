import React from 'react';
import { Slider, InputNumber, Row, Col } from 'antd';
import "../styles/DataViewContainer.css"


export class CountSlider extends React.Component {
  state = {
    value: this.props.defaultValue
  }

  onChange = (value) => {
    const cleanValue = parseInt(value, 10) ? parseInt(value, 10) : this.state.value;

    this.setState({
      value: cleanValue
    });
    this.props.onCountSliderChange(cleanValue);
  }

  render() {
    const {value} = this.state;
    return(
      <Row>
        <Col offset={4} span={12}>
          <Slider
            min={2}
            max={20}
            onChange={this.onChange}
            value={value}
            step={1}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            min={2}
            max={20}
            style={{ marginLeft: 16 }}
            step={1}
            value={value}
            onChange={this.onChange}
          />
        </Col>
      </Row>
    );
  }
}