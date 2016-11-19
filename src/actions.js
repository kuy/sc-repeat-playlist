import { createAction } from 'redux-actions';

export const SYNC = 'SYNC';
export const SYNC_CLEAR = 'SYNC_CLEAR';
export const SYNC_UPDATE = 'SYNC_UPDATE';
export const sync = createAction(SYNC);
export const syncClear = createAction(SYNC_CLEAR);
export const syncUpdate = createAction(SYNC_UPDATE);

export const OUT_OF_PLAYLIST = 'OUT_OF_PLAYLIST';
export const TOGGLE_REPEAT_MODE = 'TOGGLE_REPEAT_MODE';
export const outOfPlaylist = createAction(OUT_OF_PLAYLIST);
export const toggleRepeatMode = createAction(TOGGLE_REPEAT_MODE);
