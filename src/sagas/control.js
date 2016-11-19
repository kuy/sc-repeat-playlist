import { fork, put, take, call, select } from 'redux-saga/effects';
import { OUT_OF_PLAYLIST } from '../actions';

function* handleOutOfPlaylist() {
  while (true) {
    yield take(OUT_OF_PLAYLIST);
    const { playlist, target } = yield select(state => state.player);
    if (playlist.id === target.id) {
      continue;
    }

    const links = document.querySelectorAll(`a[href="${target.slug}"]`);
    if (!links || links.length === 0) {
      console.warn(`No links: ${target.slug}`);
      continue;
    }

    let button;
    for (const link of links) {
      let header, current = link;
      while (current.parentNode) {
        current = current.parentNode;
        // console.log('current', current);
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

    // console.log('button', button);

    const event = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    });

    // console.log('event', event);
    button.dispatchEvent(event);
  }
}

export default function* controlSaga() {
  yield fork(handleOutOfPlaylist);
}
