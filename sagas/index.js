import { all } from 'redux-saga/effects';
import authSaga from './auth';
import postSaga from './posts';
import imageSaga from './image';
import uploadSaga from './upload';

export default function* rootSaga() {
  yield all([authSaga(), postSaga(), imageSaga(), uploadSaga()]);
}
