import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './app';
import configureStore from './store';
import $ from 'cash-dom';

function render() {
  const container = document.createElement('div');
  container.setAttribute('id', 'sc-repeat-playlist-app');

  const body = document.querySelector('body');
  body.appendChild(container);

  ReactDOM.render(
    <Provider store={configureStore()}>
      <App />
    </Provider>,
  container);
}

function prepare() {
  const repeat = document.querySelector('.playControls__repeat');
  if (!repeat) {
    setTimeout(prepare, 2000);
  }

  // Insert entry point for our repeat button
  const marker = document.createElement('span');
  marker.setAttribute('id', 'sc-repeat-playlist-marker');

  repeat.appendChild(marker);

  // Hide original repeat button
  const $button = $('.playControls .playControls__repeat button.repeatControl').not('.scrp').first();
  $button.css('display', 'none');

  render();
}

setTimeout(prepare, 1000);
