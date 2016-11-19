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
};

export default function player(state = initial, { type, payload }) {
  switch (type) {
    case SYNC_CLEAR:
      return { ...state, playing: null, playlist: null, tracks: [] };
    case SYNC_UPDATE:
      return { ...state, ...payload };
    case TOGGLE_REPEAT_MODE:
      return { ...state, repeat: nextRepeatMode(state.repeat) };
  }
  return state;
}
