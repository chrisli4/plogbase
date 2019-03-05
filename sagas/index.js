import { all } from 'redux-saga/effects';
import { watchListener } from './listener';
import authSaga from './auth';
import registerSaga from './register';

export default function* rootSaga() {
  yield all([
    authSaga(),
    registerSaga(),
    watchListener('people'),
    watchListener('posts'),
    watchListener('feed'),
  ]);
}
