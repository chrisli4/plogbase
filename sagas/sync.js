import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import FirebaseHelper from '../api/firebaseHelper';
import { firebaseListenRejected } from '../actions/listener';
import { subscribeToUserPosts } from '../actions/wrapper';
import { syncPosts, syncUserPosts, syncFollowPosts } from '../actions/posts';
import { SYNC_USER } from '../constants/auth';
import { FIREBASE_LISTEN_FULFILLED } from '../constants/listener';

function* syncListeners(action) {
  const { user } = action.payload;
  if (user) {
    try {
      yield put(subscribeToUserPosts(user.uid));
    } catch (error) {
      yield put(firebaseListenRejected(error));
    }
  }
}

function* getPostData(action) {
  try {
    const { items, metaType } = action.payload;
    const posts = yield all(
      Object.keys(items).map(id =>
        call([FirebaseHelper, FirebaseHelper.getPostData], id)
      )
    );
    if (metaType === 'people') yield put(syncUserPosts(posts));
    if (metaType === 'follow') yield put(syncFollowPosts(posts));
    if (metaType === 'posts') yield put(syncPosts(posts));
  } catch (error) {
    yield console.log(error);
  }
}

export default function* syncRoot() {
  yield all([
    takeLatest(SYNC_USER, syncListeners),
    takeEvery(FIREBASE_LISTEN_FULFILLED, getPostData),
  ]);
}
