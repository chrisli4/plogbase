import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import { Firebase } from '../lib/firebase';
import { FIREBASE_LISTEN_FULFILLED } from '../constants/listener';
import { POST_FETCH_REQUESTED } from '../constants/posts';
import { subscribeToPosts } from '../actions/listenerWrapper';
import {
  fetchPostDetailsFulfilled,
  setPostsKey,
  setPeopleKey,
  setFollowKey,
} from '../actions/posts';

function getPostData(id) {
  return Firebase.database()
    .ref(`/posts/${id}`)
    .once('value');
}

function* fetchPosts() {
  const endAt = yield select(state => state.posts.peopleKey);
  yield put(subscribeToPosts(endAt));
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

function* getEndAtKey(action) {
  const { items, metaType } = action.payload;
  const arrayOfKeys = Object.keys(items)
    .sort()
    .reverse();
  const endAtKey = arrayOfKeys[arrayOfKeys.length - 1] || null;
  if (metaType === 'POSTS') yield put(setPostsKey(endAtKey));
  if (metaType === 'FOLLOW') yield put(setFollowKey(endAtKey));
  if (metaType === 'PEOPLE') yield put(setPeopleKey(endAtKey));
}

export default function* postRoot() {
  yield all([
    takeEvery(FIREBASE_LISTEN_FULFILLED, fetchPostDetails),
    takeEvery(FIREBASE_LISTEN_FULFILLED, getEndAtKey),
    takeEvery(POST_FETCH_REQUESTED, fetchPosts),
  ]);
}
