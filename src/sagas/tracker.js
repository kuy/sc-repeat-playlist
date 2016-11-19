import { fork, put, take, select } from 'redux-saga/effects';
import { SYNC_UPDATE, outOfPlaylist } from '../actions';
import { isPlaylistChanged } from '../utils';

function* detectOutOfPlaylist() {
  while (true) {
    yield take(SYNC_UPDATE);
    const state = yield select();
    const { player: { repeat } } = state;
    if (repeat === 'playlist' && isPlaylistChanged(state)) {
      yield put(outOfPlaylist());
    }
  }
}

export default function* trackerSaga() {
  yield fork(detectOutOfPlaylist);
}
