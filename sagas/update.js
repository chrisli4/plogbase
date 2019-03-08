import { put, take, call, fork } from 'redux-saga/effects';
import { Firebase } from '../lib/firebase';
import { FIREBASE_UPDATE_REQUESTED } from '../constants/update';
import {
  firebaseUpdateFulfilled,
  firebaseUpdateRejected,
} from '../actions/update';

export function* updateItems(updates, metaType) {
  try {
    const ref = Firebase.database().ref();
    yield call([ref, ref.update], updates);
    yield put(firebaseUpdateFulfilled(metaType));
  } catch (error) {
    yield put(firebaseUpdateRejected(error, metaType));
  }
}

const getPostUpdates = ({ postId, post }) => ({
  [`posts/${postId}`]: post,
});

export function* watchUpdateRequested() {
  while (true) {
    const action = yield take(FIREBASE_UPDATE_REQUESTED);
    let getUpdates = null;
    switch (action.payload.metaType) {
      case 'POSTS':
        getUpdates = getPostUpdates;
        break;
      default:
    }
    if (typeof getUpdates === 'function') {
      const updates = yield call(getUpdates, action.payload);
      yield fork(updateItems, updates, action.payload.metaType);
    }
  }
}
