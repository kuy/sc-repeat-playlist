import { combineReducers } from 'redux';
import { SYNC_CLEAR, SYNC_UPDATE, TOGGLE_REPEAT_MODE } from '../actions';

function nextRepeatMode(mode) {
  switch (mode) {
    case 'NONE': return 'TRACK';
    case 'TRACK': return 'PLAYLIST';
    case 'PLAYLIST': return 'NONE';
  }
}

export const initial = {
  playing: null,
  playlist: null,
  tracks: [],
  repeat: 'NONE',
  history: []
};

export default function player(state = initial, { type, payload }) {
  let cur;
  switch (type) {
    case SYNC_CLEAR:
      cur = { playing: state.playing, playlist: state.playlist, tracks: state.tracks };
      return {
        ...state,
        playing: null,
        playlist: null,
        tracks: [],
        history: [ ...state.history, cur ],
      };
    case SYNC_UPDATE:
      cur = { playing: state.playing, playlist: state.playlist, tracks: state.tracks };
      return {
        ...state,
        ...payload,
        history: [ ...state.history, cur ],
      };
    case TOGGLE_REPEAT_MODE:
      return { ...state, repeat: nextRepeatMode(state.repeat) };
  }
  return state;
}
