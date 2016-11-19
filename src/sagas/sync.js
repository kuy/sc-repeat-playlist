import { delay } from 'redux-saga';
import { fork, put, take, call, select } from 'redux-saga/effects';
import { SYNC, sync, syncPlaying, syncPlaylist, syncTracks } from '../actions';
import { determinePlaying, resolve } from '../utils';

function* syncState() {
  const button = document.querySelector('.playControls .playControl.playing');
  if (!button) {
    const current = yield select(state => state.player.playing);
    if (current) {
      console.log('playing', 'null');
      yield put(syncPlaying(null));
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
  if (!track) {
    console.warn('Could not track what is playing');
    return;
  }

  let current = yield select(state => state.player.playing);
  if (current && current.slug === track) {
    return;
  }

  console.log('playing', [track, playlist]);

  const trackData = yield call(resolve, `https://soundcloud.com${track}`);
  console.log('track', trackData);
  yield put(syncPlaying({ id: trackData.id, slug: track }));
  if (!playlist) {
    yield put(syncPlaylist(null));
    return;
  }

  current = yield select(state => state.player.playlist);
  if (current && current.slug === playlist) {
    return;
  }

  const playlistData = yield call(resolve, `https://soundcloud.com${playlist}`);
  console.log('playlist', playlistData);
  yield put(syncPlaylist({ id: playlistData.id, slug: playlist }));
  yield put(syncTracks(playlistData.tracks.map(t => t.id)));
}

function* handleSync() {
  while (true) {
    yield take(SYNC);
    yield call(syncState);
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
