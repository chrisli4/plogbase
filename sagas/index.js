import { all } from 'redux-saga/effects';
import authSaga from './auth';
import imageSaga from './image';
import feedSaga from './feed';
import listenerSaga from './listener';

export default function* rootSaga() {
  yield all([authSaga(), imageSaga(), listenerSaga(), feedSaga()]);
}
