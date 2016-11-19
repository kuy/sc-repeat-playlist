import { createAction } from 'redux-actions';

export const SYNC = 'SYNC';
export const SYNC_CLEAR = 'SYNC_CLEAR';
export const SYNC_UPDATE = 'SYNC_UPDATE';
export const sync = createAction(SYNC);
export const syncClear = createAction(SYNC_CLEAR);
export const syncUpdate = createAction(SYNC_UPDATE);

export const TOGGLE_REPEAT_MODE = 'TOGGLE_REPEAT_MODE';
export const toggleRepeatMode = createAction(TOGGLE_REPEAT_MODE);
