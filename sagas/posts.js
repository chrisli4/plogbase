import { all, call, put, takeEvery } from 'redux-saga/effects';
import { Firebase } from '../lib/firebase';
import { POSTS_FETCH_REQUEST } from '../constants/posts';
import {
  fetchPostsSuccess,
  fetchPostsFailure,
  clearPosts,
} from '../actions/posts';
import { setCursor } from '../actions/cursors';

function genFirebaseRef(uri, numberOfItems, cursor = null) {
  let ref = Firebase.database().ref(uri);
  if (cursor) {
    ref = ref.orderByKey().endAt(cursor);
  }
  return ref.limitToLast(numberOfItems).once('value');
}

function* getPaginatedFeed(action) {
  const { uri, cursor, metaType } = action.payload;
  if (!cursor) yield put(clearPosts(metaType));
  try {
    const posts = yield call(genFirebaseRef, uri, 3, cursor);
    let arrayOfKeys = Object.keys(posts.val())
      .sort()
      .reverse();

    if (cursor) {
      arrayOfKeys = arrayOfKeys.slice(1);
    }
    const results = arrayOfKeys.map(key => posts.val()[key]);
    const newCursor = arrayOfKeys[arrayOfKeys.length - 1];
    yield put(fetchPostsSuccess(results, metaType));
    yield put(setCursor(newCursor, metaType));
  } catch (error) {
    yield put(fetchPostsFailure(error));
  }
}

export default function* postsRoot() {
  yield all([takeEvery(POSTS_FETCH_REQUEST, getPaginatedFeed)]);
}
