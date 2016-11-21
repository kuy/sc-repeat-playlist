// @flow

import type { IOEffect } from 'redux-saga/effects';
import type { State } from '../reducers/index';
import { fork, put, take, select } from 'redux-saga/effects';
import { SYNC_CHANGE_PLAYLIST, SYNC_CHANGE_PLAYLIST_BEFORE, outOfPlaylist } from '../actions';

function* detectOutOfPlaylist(): Generator<IOEffect,void,*> {
  let target;
  while (true) {
    // Get target playlist before changing it
    const { payload: playlist } = yield take(SYNC_CHANGE_PLAYLIST_BEFORE);
    const repeat = yield select((state: State) => state.player.repeat);
    if (repeat !== 'playlist') {
      continue;
    }

    // Verify player is entering other playlist
    yield take(SYNC_CHANGE_PLAYLIST);

    // Back to target playlist
    yield put(outOfPlaylist(playlist));

    // Verify whether target playlist is playing
    yield take(SYNC_CHANGE_PLAYLIST);
  }
}

export default function* trackerSaga(): Generator<IOEffect,void,*> {
  yield fork(detectOutOfPlaylist);
}
