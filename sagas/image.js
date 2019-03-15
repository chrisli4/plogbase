import { all, call, put, takeLatest } from 'redux-saga/effects';
import { ImagePicker, Permissions } from 'expo';
import { IMAGE_PICK_REQUEST } from '../constants/image';
import { pickImageSuccess, pickImageFailure } from '../actions/image';

function* permissionSaga() {
  yield call([Permissions, Permissions.askAsync], Permissions.CAMERA_ROLL);
  yield call([Permissions, Permissions.askAsync], Permissions.CAMERA);
}

function* pickImageSaga() {
  try {
    yield permissionSaga();
    const pickerResult = yield call(
      [ImagePicker, ImagePicker.launchImageLibraryAsync],
      { allowsEditing: true, aspect: [4, 3] }
    );
    yield put(pickImageSuccess(pickerResult));
  } catch (error) {
    yield put(pickImageFailure(error));
  }
}

export default function* imageRoot() {
  yield all([takeLatest(IMAGE_PICK_REQUEST, pickImageSaga)]);
}
