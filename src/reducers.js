import { combineReducers } from 'redux';
import { SYNC_PLAYING, SYNC_PLAYLIST, SYNC_TRACKS, TOGGLE_REPEAT_MODE } from './actions';

function nextRepeatMode(mode) {
  switch (mode) {
    case 'NONE': return 'TRACK';
    case 'TRACK': return 'PLAYLIST';
    case 'PLAYLIST': return 'NONE';
  }
}

const initial = {
  player: {
    playing: null,
    repeat: 'NONE',
    playlist: null,
    tracks: [],
  },
};

function player(state = initial.player, { type, payload }) {
  switch (type) {
    case SYNC_PLAYING:
      return { ...state, playing: payload };
    case SYNC_PLAYLIST:
      return { ...state, playlist: payload };
    case SYNC_TRACKS:
      return { ...state, tracks: payload };
    case TOGGLE_REPEAT_MODE:
      return { ...state, repeat: nextRepeatMode(state.repeat) };
  }
  return state;
}

export default combineReducers(
  { player }
);
