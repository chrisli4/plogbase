import { all } from 'redux-saga/effects';
import authSaga from './auth';
import fetchSaga from './fetch';
import subscribeSaga from './subscribe';
import { watchListener } from './listener';
import { watchRemoveRequested } from './remove';
import { watchUpdateRequested } from './update';

export default function* rootSaga() {
  yield all([
    authSaga(),
    fetchSaga(),
    subscribeSaga(),
    watchListener('PEOPLE'),
    watchListener('POSTS'),
    watchListener('FOLLOW'),
    watchRemoveRequested(),
    watchUpdateRequested(),
  ]);
}
