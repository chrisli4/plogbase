import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import FirebaseHelper from '../api/firebaseHelper';
import { PLANT_UPLOAD_REQUEST } from '../constants/upload';
import { plantUploadSuccess, plantUploadFailure } from '../actions/upload';

function* plantUploadSaga(action) {
  try {
    const uri = yield select(state => state.image.image.uri);
    yield console.log(uri);
    const { name } = action.payload;

    if (!uri || !name) {
      yield put(plantUploadFailure('Missing URI or NAME'));
    } else {
      const firebaseURI = yield call(
        [FirebaseHelper, FirebaseHelper.uploadImageAsync],
        uri
      );

      const post = {
        ...action.payload,
        uri: firebaseURI,
      };

      const newPostKey = yield call(
        [FirebaseHelper, FirebaseHelper.uploadNewPost],
        post
      );

      yield put(plantUploadSuccess(newPostKey));
    }
  } catch (error) {
    yield put(plantUploadFailure(error));
  }
}

export default function* imageRoot() {
  yield all([takeLatest(PLANT_UPLOAD_REQUEST, plantUploadSaga)]);
}
