import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import Firebase from '../api/firebaseHelper';
import { POST_ADD_REQUEST } from '../constants/posts';
import { addPostSuccess, addPostFailure } from '../actions/posts';

function* uploadPostSaga(action) {
  const { post } = action.payload;
  try {
    const uri = yield select(state => state.image.result.uri);
    yield console.log(uri);
    if (!uri || !post.name) {
      yield put(addPostFailure('URI and POST NAME required.'));
    } else {
      const uid = yield select(state => state.auth.user.uid);
      yield console.log(uid);
      const newPostKey = yield call([Firebase, Firebase.genKey]);
      yield console.log(newPostKey);
      const firebaseURI = yield call(
        Firebase.uploadImageAsync,
        newPostKey,
        uri
      );
      yield console.log(firebaseURI);
      const postData = {
        ...action.payload.post,
        id: newPostKey,
        uri: firebaseURI,
        time: Date.now(),
      };
      yield console.log(postData);
      const updates = {};
      updates[`/posts/${newPostKey}`] = postData;
      updates[`/people/${uid}/posts/${newPostKey}`] = postData;

      yield call([Firebase, Firebase.updateFeed], updates);
      yield put(addPostSuccess(newPostKey));
    }
  } catch (error) {
    yield put(addPostFailure(error));
  }
}

export default function* uploadRoot() {
  yield all([takeLatest(POST_ADD_REQUEST, uploadPostSaga)]);
}
