import React from 'react';
import { Profile } from './Profile';
import nba from 'nba';
import { DataViewContainer } from './DataViewContainer';
import { SearchBar } from './SearchBar';
import { DEFAULT_PLAYER_INFO } from '../constants';


window.nba = nba;


export class Main extends React.Component {
  state = {
    playerInfo: DEFAULT_PLAYER_INFO
  }

  componentDidMount() {
    this.loadPlayerInfo(this.state.playerInfo.playerName);
    // nba.stats.playerInfo({ PlayerID: this.state.playerId }).then((info) => {
    //   const playerInfo = Object.assign(info.commonPlayerInfo[0], info.playerHeadlineStats[0]);
    //   console.log(playerInfo);
    //   this.setState({
    //     playerInfo: playerInfo,
    //   });
    // });
  }

  loadPlayerInfo = (playerName) => {
    const playerId = nba.findPlayer(playerName).playerId;

    nba.stats.playerInfo({ 
      PlayerID: playerId 
    }).then((info) => {
      const playerInfo = Object.assign(
        info.commonPlayerInfo[0], 
        info.playerHeadlineStats[0]);
      console.log(playerInfo);

      this.setState({
        playerInfo
      });
    });
  }

  render() {
    const { playerInfo } = this.state;
    return(
      <div className="main">
        <SearchBar loadPlayerInfo={this.loadPlayerInfo}/>
        <div className="player">
          <Profile 
            playerId={playerInfo.playerId} 
            playerInfo={playerInfo}/>
          <DataViewContainer playerId={playerInfo.playerId}/>
        </div>
      </div>
    );
  }
}