import { all } from 'redux-saga/effects';
import authSaga from './auth';
import fetchSaga from './fetch';
import imageSaga from './image';
import uploadSaga from './upload';

export default function* rootSaga() {
  yield all([authSaga(), fetchSaga(), imageSaga(), uploadSaga()]);
}
