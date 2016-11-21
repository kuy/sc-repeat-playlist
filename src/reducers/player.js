// @flow

import { combineReducers } from 'redux';
import {
  SYNC_CHANGE_PLAY_STATE, SYNC_CHANGE_TRACK, SYNC_CHANGE_PLAYLIST,
  TOGGLE_REPEAT_MODE
} from '../actions';
import type { Action } from '../actions';

function nextRepeatMode(mode) {
  switch (mode) {
    case 'none': return 'track';
    case 'track': return 'playlist';
    case 'playlist': return 'none';
  }
}

export type PlayerState = {
  play: bool,
  track: ?string,
  playlist: ?string,
  repeat: string,
};

export const initial: PlayerState = {
  play: false,
  track: null,
  playlist: null,
  repeat: 'none',
};

export default function player(state: PlayerState = initial, { type, payload }: Action): PlayerState {
  switch (type) {
    case SYNC_CHANGE_PLAY_STATE:
      return { ...state, play: payload };
    case SYNC_CHANGE_TRACK:
      return { ...state, track: payload };
    case SYNC_CHANGE_PLAYLIST:
      return { ...state, playlist: payload };
    case TOGGLE_REPEAT_MODE:
      const next = nextRepeatMode(state.repeat);
      return { ...state, repeat: next };
  }
  return state;
}
