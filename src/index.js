import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './app';
import configureStore from './store';

const container = document.createElement('div');
container.setAttribute('id', 'sc-repeat-playlist-app');

const body = document.querySelector('body');
body.appendChild(container);

ReactDOM.render(
  <Provider store={configureStore()}>
    <App />
  </Provider>,
container);
