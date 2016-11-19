import { fork } from 'redux-saga/effects';
import sync from './sync';
import tracker from './tracker';
import control from './control';

export default function* rootSaga() {
  yield fork(sync);
  yield fork(tracker);
  yield fork(control);
}
