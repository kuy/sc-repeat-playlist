// @flow

import { createAction } from 'redux-actions';

export type Action = {
  type: ActionType,
  payload?: any,
  meta?: any,
};

type ActionType =
  'SYNC_CHANGE_PLAY_STATE' |
  'SYNC_CHANGE_TRACK' | 'SYNC_CHANGE_TRACK_BEFORE' |
  'SYNC_CHANGE_PLAYLIST' | 'SYNC_CHANGE_PLAYLIST_BEFORE' |
  'OUT_OF_PLAYLIST' | 'TOGGLE_REPEAT_MODE';

export const SYNC_CHANGE_PLAY_STATE = 'SYNC_CHANGE_PLAY_STATE';
export const SYNC_CHANGE_TRACK = 'SYNC_CHANGE_TRACK';
export const SYNC_CHANGE_TRACK_BEFORE = 'SYNC_CHANGE_TRACK_BEFORE';
export const SYNC_CHANGE_PLAYLIST = 'SYNC_CHANGE_PLAYLIST';
export const SYNC_CHANGE_PLAYLIST_BEFORE = 'SYNC_CHANGE_PLAYLIST_BEFORE';
export const syncChangePlayState = createAction(SYNC_CHANGE_PLAY_STATE);
export const syncChangeTrack = createAction(SYNC_CHANGE_TRACK);
export const syncChangeTrackBefore = createAction(SYNC_CHANGE_TRACK_BEFORE);
export const syncChangePlaylist = createAction(SYNC_CHANGE_PLAYLIST);
export const syncChangePlaylistBefore = createAction(SYNC_CHANGE_PLAYLIST_BEFORE);

export const OUT_OF_PLAYLIST = 'OUT_OF_PLAYLIST';
export const TOGGLE_REPEAT_MODE = 'TOGGLE_REPEAT_MODE';
export const outOfPlaylist = createAction(OUT_OF_PLAYLIST);
export const toggleRepeatMode = createAction(TOGGLE_REPEAT_MODE);
