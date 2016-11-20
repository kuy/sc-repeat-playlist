import { createAction } from 'redux-actions';

export const SYNC_CHANGE_PLAY_STATE = 'SYNC_CHANGE_PLAY_STATE';
export const SYNC_CHANGE_TRACK = 'SYNC_CHANGE_TRACK';
export const SYNC_CHANGE_PLAYLIST = 'SYNC_CHANGE_PLAYLIST';
export const syncChangePlayState = createAction(SYNC_CHANGE_PLAY_STATE);
export const syncChangeTrack = createAction(SYNC_CHANGE_TRACK);
export const syncChangePlaylist = createAction(SYNC_CHANGE_PLAYLIST);

export const OUT_OF_PLAYLIST = 'OUT_OF_PLAYLIST';
export const TOGGLE_REPEAT_MODE = 'TOGGLE_REPEAT_MODE';
export const outOfPlaylist = createAction(OUT_OF_PLAYLIST);
export const toggleRepeatMode = createAction(TOGGLE_REPEAT_MODE);
