import { all, put, select, takeLatest } from 'redux-saga/effects';
import { SYNC_USER_SUCCESS } from '../constants/auth';
import { listenToUserPosts } from '../actions/wrapper';
import { firebaseListenFailure } from '../actions/listener';

function* startListenerSaga() {
  try {
    const uid = yield select(state => state.auth.user.uid);
    yield put(listenToUserPosts(uid));
  } catch (error) {
    yield put(firebaseListenFailure);
  }
}

export default function* registerRoot() {
  yield all([takeLatest(SYNC_USER_SUCCESS, startListenerSaga)]);
};
