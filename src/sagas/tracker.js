import { fork, put, take, select } from 'redux-saga/effects';
import { SYNC_UPDATE, outOfPlaylist } from '../actions';
import { isPlaylistChanged } from '../utils';

function* detectOutOfPlaylist() {
  while (true) {
    yield take(SYNC_UPDATE);
    if (isPlaylistChanged(yield select())) {
      yield put(outOfPlaylist());
    }
  }
}

export default function* trackerSaga() {
  yield fork(detectOutOfPlaylist);
}
