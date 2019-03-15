import { all, call, put, takeEvery } from 'redux-saga/effects';
import Firebase from '../api/firebaseHelper';
import { POSTS_FETCH_REQUEST } from '../constants/posts';
import {
  fetchPostsSuccess,
  fetchPostsFailure,
  clearPosts,
} from '../actions/posts';
import { setCursor } from '../actions/cursors';

function* getPaginatedFeed(action) {
  const { uri, cursor, metaType } = action.payload;
  if (!cursor) yield put(clearPosts(metaType));
  try {
    const posts = yield call(
      [Firebase, Firebase.getPaginatedFeed],
      uri,
      Firebase.POSTS_PAGE_SIZE,
      cursor,
      false
    );
    let ids = Object.keys(posts)
      .sort()
      .reverse();
    if (cursor) {
      ids = ids.slice(1);
    }
    const results = ids.map(id => posts[id]);
    const newCursor = ids[ids.length - 1];
    yield put(fetchPostsSuccess(results, metaType));
    yield put(setCursor(newCursor, metaType));
  } catch (error) {
    yield put(fetchPostsFailure(error));
  }
}

export default function* postsRoot() {
  yield all([takeEvery(POSTS_FETCH_REQUEST, getPaginatedFeed)]);
}
