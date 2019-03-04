import {
  all,
  call,
  put,
  select,
  takeEvery,
} from 'redux-saga/effects';
import {
  listenToUserFeed,
  listenToPostFeed,
  removeUserFeedListenerRequested,
  removePostFeedListenerRequested,
} from '../actions/listener';
import { Firebase } from '../lib/firebase';
import { SYNC_USER, SYNC_USER_NULL } from '../constants/auth';
import { FIREBASE_LISTEN_FULFILLED, FIREBASE_LISTEN_CHILD_ADDED } from '../constants/listener';

function getPost(postId) {
  return Firebase.database().ref(`/posts/${postId}`).once('value');
}

function* getPostFromReference(action) {
  const { id } = action.payload;
  const post = yield call(getPost, id);
}

function* getPostsFromReference(action) {
  const { items, metaType } = action.payload;
  const promises = Object.keys(items).map(key => getPost(key));
  const posts = yield all(promises);
  const results = yield posts.forEach(post => console.log(post.val()));
}

function* startListeners() {
  const user = yield select(state => state.auth.user);
  if (user) {
    yield put(listenToUserFeed(user.uid));
    yield put(listenToPostFeed());
  }
}

function* stopListeners() {
  yield put(removeUserFeedListenerRequested());
  yield put(removePostFeedListenerRequested());
}

export default function* feedRoot() {
  yield all([
    takeEvery(SYNC_USER, startListeners),
    takeEvery(SYNC_USER_NULL, stopListeners),
    takeEvery(FIREBASE_LISTEN_CHILD_ADDED, getPostFromReference),
    takeEvery(FIREBASE_LISTEN_FULFILLED, getPostsFromReference),
  ]);
}
