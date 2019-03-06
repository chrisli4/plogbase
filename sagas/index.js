import { all } from 'redux-saga/effects';
import { watchListener } from './listener';
import authSaga from './auth';
import syncSaga from './sync';

export default function* rootSaga() {
  yield all([
    authSaga(),
    syncSaga(),
    watchListener('people'),
    watchListener('posts'),
    watchListener('feed'),
  ]);
}
