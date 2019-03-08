import { all, call, put, takeEvery } from 'redux-saga/effects';
import { Firebase } from '../lib/firebase';
import { FIREBASE_LISTEN_FULFILLED } from '../constants/listener';
import { fetchPostDetailsFulfilled } from '../actions/fetch';

function getPostData(id) {
  return Firebase.database()
    .ref(`/posts/${id}`)
    .once('value');
}

function* fetchPostDetails(action) {
  const { items, metaType, fetchPostDetails } = action.payload;
  if (fetchPostDetails) {
    try {
      const posts = yield all(
        Object.keys(items).map(id => call(getPostData, id))
      );
      yield put(fetchPostDetailsFulfilled(posts, metaType));
    } catch (error) {
      yield console.log(error);
    }
  }
}

export default function* postRoot() {
  yield all([takeEvery(FIREBASE_LISTEN_FULFILLED, fetchPostDetails)]);
}
