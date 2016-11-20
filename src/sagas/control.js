import { fork, take, select, call } from 'redux-saga/effects';
import { OUT_OF_PLAYLIST, TOGGLE_REPEAT_MODE } from '../actions';
import $ from 'cash-dom';

function* handleOutOfPlaylist() {
  while (true) {
    const { payload: playlist } = yield take(OUT_OF_PLAYLIST);
    const links = document.querySelectorAll(`a[href="${playlist}"]`);
    if (!links || links.length === 0) {
      console.warn(`No playlist links: ${playlist}`);
      continue;
    }

    let $button;
    for (const link of links) {
      const $header = $(link).parents('.sound__header, .audibleTile');
      if ($header.length === 0) {
        continue;
      }

      $button = $header.find('button.sc-button-play').first();
      if (0 < $button.length) {
        break;
      }
    }

    if ($button.length === 0) {
      console.warn(`No play button: ${playlist}`);
      continue;
    }

    $button.trigger('click');
  }
}

function toggleRepeat(newState) {
  const $button = $('.playControls .playControls__repeat button.repeatControl').not('.scrp').first();
  const state = $button.is('.m-one');
  if (state !== newState) {
    $button.trigger('click');
  }
}

function* handleToggleRepeatMode() {
  while (true) {
    yield take(TOGGLE_REPEAT_MODE);
    const repeat = yield select(state => state.player.repeat);
    yield call(toggleRepeat, repeat === 'track')
  }
}

export default function* controlSaga() {
  yield fork(handleOutOfPlaylist);
  yield fork(handleToggleRepeatMode);
}
