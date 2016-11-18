import { fork } from 'redux-saga/effects';
import sync from './sync';

export default function* rootSaga() {
  yield fork(sync);
}
