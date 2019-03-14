import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import uuid from 'uuid';
import { Firebase } from '../lib/firebase';
import { POST_ADD_REQUEST } from '../constants/posts';
import { addPostSuccess, addPostFailure } from '../actions/posts';

function genFirebaseUpdate(updates) {
  return Firebase.database()
    .ref()
    .update(updates);
}

async function uploadImageAsync(dir, uri) {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function(e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const ref = Firebase.storage()
    .ref(dir)
    .child(uuid());
  const snapshot = await ref.put(blob);

  blob.close();

  return snapshot.ref.getDownloadURL();
}

function* uploadPostSaga(action) {
  const { post } = action.payload;
  try {
    const uri = yield select(state => state.image.result.uri);
    if (!uri || !post.name) {
      yield put(addPostFailure('URI and POST NAME required.'));
    } else {
      const uid = yield select(state => state.auth.user.uid);
      const newPostKey = Firebase.database()
        .ref()
        .push().key;
      const firebaseURI = yield call(uploadImageAsync, newPostKey, uri);
      const postData = {
        ...action.payload.post,
        id: newPostKey,
        uri: firebaseURI,
        time: Date.now(),
      };

      const updates = {};
      updates[`/posts/${newPostKey}`] = postData;
      updates[`/people/${uid}/posts/${newPostKey}`] = postData;

      yield call(genFirebaseUpdate, updates);
      yield put(addPostSuccess(newPostKey));
    }
  } catch (error) {
    yield put(addPostFailure(error));
  }
}

export default function* uploadRoot() {
  yield all([takeLatest(POST_ADD_REQUEST, uploadPostSaga)]);
}
