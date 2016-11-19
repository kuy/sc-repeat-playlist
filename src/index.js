import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './app';
import configureStore from './store';

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
    setTimeout(prepare, 3000);
  }

  const marker = document.createElement('span');
  marker.setAttribute('id', 'sc-repeat-playlist-marker');

  repeat.appendChild(marker);

  render();
}

setTimeout(prepare, 1500);
