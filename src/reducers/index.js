// @flow

import { combineReducers } from 'redux';
import player from './player';
import type { PlayerState } from './player';

export type State = {
  player: PlayerState
};

export default combineReducers(
  { player }
);
