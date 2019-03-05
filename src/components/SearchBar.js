import React from 'react';
import { Icon, Input, AutoComplete } from 'antd';
import nba from 'nba';
import { PROFILE_PIC_URL_PREFIX } from '../constants';


const Option = AutoComplete.Option;

export class SearchBar extends React.Component {
  state = { 
    dataSource: [],
  }

  handleSearch = (value) => {
    this.setState({
      dataSource: nba.searchPlayers(value)
        .map(({playerId, fullName}) => 
        <Option key={playerId} value={fullName}>
          <img
            className="player-option-image"
            src={`${PROFILE_PIC_URL_PREFIX}/${playerId}.png`}
            alt={`${fullName}`}
          />
          <span className="player-option-label">{`${fullName}`}</span>
        </Option>)
    //   dataSource: !value ? [] : [
    //     value,
    //     value + value,
    //     value + value + value,
    //   ],
    });
  }

  onSelect = (value) => {
    console.log(value);
    this.props.loadPlayerInfo(value);
  }


  render() { 
    const { dataSource } = this.state;
      
    return (
      <AutoComplete
        dataSource={dataSource}
        style={{ width: '100%' }}
        size="large"
        onSelect={this.onSelect}
        onSearch={this.handleSearch}
        placeholder="Search NBA Player"
        className="search-bar"
        optionLabelProp="value"
        >
        <Input suffix={<Icon type="search" 
        className="certain-category-icon" />} />
      </AutoComplete>
    );
  }
}

export default SearchBar;
