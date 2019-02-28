import { all } from 'redux-saga/effects';
import authSaga from './auth';
import imageSaga from './image';
import uploadSaga from './upload';

export default function* rootSaga() {
  yield all([authSaga(), imageSaga(), uploadSaga()]);
}
