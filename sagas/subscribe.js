import { all, put, takeEvery } from 'redux-saga/effects';
import { SYNC_USER } from '../constants/auth';
import {
  subscribeToUserPosts,
  subscribeToPosts,
} from '../actions/listenerWrapper';

function* subscribeToFeeds(action) {
  const { user } = action.payload;
  if (user && user.uid) {
    yield all([put(subscribeToUserPosts(user.uid)), put(subscribeToPosts())]);
  }
}

export default function* postRoot() {
  yield all([takeEvery(SYNC_USER, subscribeToFeeds)]);
}
