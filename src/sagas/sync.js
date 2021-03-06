// @flow

import type { IOEffect, Channel } from 'redux-saga/effects';
import type { State } from '../reducers/index';
import { delay, eventChannel } from 'redux-saga';
import { fork, put, take, call, select } from 'redux-saga/effects';
import {
  syncChangePlayState,
  syncChangeTrack, syncChangeTrackBefore,
  syncChangePlaylist, syncChangePlaylistBefore
} from '../actions';
import { determinePlaying } from '../utils';
import $ from 'cash-dom';

function* createObserver(selector, options: Object, valueFn?: Function): Generator<IOEffect,Channel,*> {
  // Wait until target element is shown
  let $target;
  while (true) {
    $target = $(selector);
    if (0 < $target.length) {
      break;
    }

    // TODO: Enable timeout to avoid inifinite loop
    yield call(delay, 500);
  }

  return eventChannel(emit => {
    let last;
    const observer = new MutationObserver(() => {
      if (typeof valueFn === 'function') {
        const value = valueFn($target);
        // Emit only if value is changed
        if (last !== value) {
          emit(last = value);
        }
      } else {
        emit($target);
      }
    });

    // Start observing target
    observer.observe($target.get(0), options);

    return () => {
      observer.disconnect();
    };
  });
}

function* watchPlayState(): Generator<IOEffect,void,*> {
  const ch = yield call(
    createObserver,
    '.playControls .playControls__playPauseSkip > button:nth-child(2)',
    { attributes: true, attributeFilter: ['class'] },
    $target => $target.hasClass('playing')
  );

  while (true) {
    const play = yield take(ch);
    // console.log('play', play);
    yield put(syncChangePlayState(play));
  }
}

function* watchCurrentTrack(): Generator<IOEffect,void,*> {
  const ch = yield call(
    createObserver,
    '.playControls .playControls__soundBadge .playbackSoundBadge',
    { childList: true, subtree: true },
    $target => $target.find('.playbackSoundBadge__title').attr('href')
  );

  while (true) {
    const href = yield take(ch);
    // console.log('track', href);
    const [ curTrack, curPlaylist ] = yield select((state: State) => ([ state.player.track, state.player.playlist ]));
    const { track, playlist } = determinePlaying(href);
    if (curTrack !== track) {
      yield put(syncChangeTrackBefore(curTrack));
      yield put(syncChangeTrack(track));
    }
    if (curPlaylist !== playlist) {
      yield put(syncChangePlaylistBefore(curPlaylist));
      yield put(syncChangePlaylist(playlist));
    }
  }
}

export default function* syncSaga(): Generator<IOEffect,void,*> {
  yield fork(watchPlayState);
  yield fork(watchCurrentTrack);
}
