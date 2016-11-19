import { delay } from 'redux-saga';
import { fork, put, take, call, select } from 'redux-saga/effects';
import { SYNC, sync, syncClear, syncUpdate } from '../actions';
import { determinePlaying, resolve, isPlaying, isSameTrack, isSamePlaylist } from '../utils';

function* doSyncState() {
  const button = document.querySelector('.playControls .playControl.playing');
  if (!button) {
    if (isPlaying(yield select())) {
      yield put(syncClear());
    }
    return;
  }

  const title = document.querySelector('.playControls .playbackSoundBadge__title');
  if (!title) {
    console.warn('Could not find title element');
    return;
  }

  const href = title.getAttribute('href');
  const { track, playlist } = determinePlaying(href);
  // console.log('playing', [track, playlist]);
  if (!track) {
    console.warn('Could not track what is playing');
    return;
  }

  let changed = false,
    state = yield select(),
    player = state.player;

  if (!isSameTrack(state, track)) {
    changed = true;
    const trackData = yield call(resolve, `https://soundcloud.com${track}`);
    // console.log('track', trackData);
    player = { ...player, playing: { id: trackData.id, slug: track } };
  }

  if (!isSamePlaylist(state, playlist)) {
    changed = true;
    const playlistData = yield call(resolve, `https://soundcloud.com${playlist}`);
    // console.log('playlist', playlistData);
    player = {
      ...player,
      playlist: { id: playlistData.id, slug: playlist },
      tracks: playlistData.tracks.map(t => t.id)
    };
  }

  if (changed) {
    yield put(syncUpdate(player));
  }
}

function* handleSync() {
  while (true) {
    yield take(SYNC);
    yield call(doSyncState);
  }
}

function* triggerSync() {
  while (true) {
    yield put(sync());
    yield call(delay, 5000);
  }
}

export default function* rootSaga() {
  yield fork(triggerSync);
  yield fork(handleSync);
}
