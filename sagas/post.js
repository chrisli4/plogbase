import { all, call, put, takeEvery } from 'redux-saga/effects';
import { Firebase } from '../lib/firebase';

function* getPaginatedPost(action) {
  const { cursor } = action.payload;
  if (!cursor) yield put(clearPost());

  try {
    const posts = yield call()
  }
}