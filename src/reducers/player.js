import { combineReducers } from 'redux';
import { SYNC_CLEAR, SYNC_UPDATE, TOGGLE_REPEAT_MODE } from '../actions';

function nextRepeatMode(mode) {
  switch (mode) {
    case 'none': return 'track';
    case 'track': return 'playlist';
    case 'playlist': return 'none';
  }
}

export const initial = {
  playing: null,
  playlist: null,
  tracks: [],
  repeat: 'none',
  target: null,
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
      const next = nextRepeatMode(state.repeat);
      let target;
      if (next === 'playlist') {
        target = state.playlist;
      } else {
        target = null;
      }
      return { ...state, repeat: next, target };
  }
  return state;
}
