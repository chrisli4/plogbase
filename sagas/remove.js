import { put, take, call, fork } from 'redux-saga/effects';
import { Firebase } from '../lib/firebase';
import { FIREBASE_REMOVE_REQUESTED } from '../constants/remove';
import { firebaseRemoveFulfilled, firebaseRemoveRejected } from '../actions/remove';

const getPostsPath = postId => ({
  [`posts/${postId}`]: null,
});

export function* removeItem(updates, metaType) {
  try {
    const ref = Firebase.database().ref();
    yield call([ref, ref.update], updates);
    yield put(firebaseRemoveFulfilled(metaType));
  } catch (error) {
    yield put(firebaseRemoveRejected(error, metaType));
  }
}

export function* watchRemoveRequested() {
  while (true) {
    const action = yield take(FIREBASE_REMOVE_REQUESTED);
    let getPath = null;
    switch (action.payload.metaType) {
      case 'POSTS':
        getPath = getPostsPath;
        break;
      default:
    }

    if (typeof getPath === 'function') {
      const path = yield call(getPath, action.payload);
      yield fork(removeItem, path, action.payload.metaType);
    }
  }
}
