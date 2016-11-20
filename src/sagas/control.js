import { fork, take } from 'redux-saga/effects';
import { OUT_OF_PLAYLIST } from '../actions';
import $ from 'cash-dom';

function* handleOutOfPlaylist() {
  while (true) {
    const { payload: playlist } = yield take(OUT_OF_PLAYLIST);
    const links = document.querySelectorAll(`a[href="${playlist}"]`);
    if (!links || links.length === 0) {
      console.warn(`No playlist links: ${playlist}`);
      continue;
    }

    let button;
    for (const link of links) {
      const $header = $(link).parents('.sound__header, .audibleTile');
      if ($header.length === 0) {
        continue;
      }

      const $buttons = $header.find('button.sc-button-play');
      if (0 < $buttons.length) {
        button = $buttons.get(0);
        break;
      }
    }

    if (!button) {
      console.warn(`No play button: ${playlist}`);
      continue;
    }

    const event = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    });

    button.dispatchEvent(event);
  }
}

export default function* controlSaga() {
  yield fork(handleOutOfPlaylist);
}
