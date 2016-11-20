import { fork, take } from 'redux-saga/effects';
import { OUT_OF_PLAYLIST } from '../actions';

function* handleOutOfPlaylist() {
  while (true) {
    const { payload: playlist } = yield take(OUT_OF_PLAYLIST);
    const links = document.querySelectorAll(`a[href="${playlist}"]`);
    if (!links || links.length === 0) {
      console.warn(`No links: ${playlist}`);
      continue;
    }

    let button;
    for (const link of links) {
      let header, current = link;
      while (current.parentNode) {
        current = current.parentNode;
        if (current && current.nodeType === 1 && current.getAttribute('class') === 'sound__header') {
          header = current;
          break;
        }
      }

      if (!header) {
        continue;
      }

      button = header.querySelector('button.sc-button-play.sc-button-xlarge');
      if (button) {
        break;
      }
    }

    if (!button) {
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
