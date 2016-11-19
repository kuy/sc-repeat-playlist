import React, { Component } from 'react';
import { connect } from 'react-redux';
import Transport from 'react-transport';
import { toggleRepeatMode } from './actions';

class App extends Component {
  handleToggle() {
    this.props.dispatch(toggleRepeatMode());
  }

  render() {
    const { repeat } = this.props.player;
    return <Transport replace to="#sc-repeat-playlist-marker" wrapBy="span">
      <button title="Repeat playing track/playlist" className={`repeatControl sc-ir m-${repeat} scrp`} onClick={this.handleToggle.bind(this)}>
        Repeat track/playlist
      </button>
    </Transport>;
  }
}

function select({ player }) {
  return { player };
}

export default connect(select)(App);
