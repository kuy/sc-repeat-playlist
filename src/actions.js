import { createAction } from 'redux-actions';

export const SYNC = 'SYNC';
export const SYNC_PLAYING = 'SYNC_PLAYING';
export const SYNC_PLAYLIST = 'SYNC_PLAYLIST';
export const SYNC_TRACKS = 'SYNC_TRACKS';
export const sync = createAction(SYNC);
export const syncPlaying = createAction(SYNC_PLAYING);
export const syncPlaylist = createAction(SYNC_PLAYLIST);
export const syncTracks = createAction(SYNC_TRACKS);

export const TOGGLE_REPEAT_MODE = 'TOGGLE_REPEAT_MODE';
export const toggleRepeatMode = createAction(TOGGLE_REPEAT_MODE);
