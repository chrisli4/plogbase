import { all, call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { Firebase } from '../lib/firebase';
import NavigationService from '../navigation/NavigationService';
import {
  LOGIN_REQUESTED,
  LOGOUT_REQUESTED,
  SIGNUP_REQUESTED,
} from '../constants/auth';
import {
  loginFulfilled,
  loginRejected,
  logoutFulfilled,
  logoutRejected,
  signUpFulfilled,
  signUpRejected,
  syncUser,
} from '../actions/auth';

function* loginSaga(action) {
  try {
    const { username, password } = action.payload;
    const auth = Firebase.auth();
    yield call([auth, auth.signInWithEmailAndPassword], username, password);
    yield put(loginFulfilled());
  } catch (error) {
    yield put(loginRejected(error));
  }
}

function* signUpSaga(action) {
  try {
    const { username, password } = action.payload;
    const auth = Firebase.auth();
    yield call([auth, auth.createUserWithEmailAndPassword], username, password);
    yield put(signUpFulfilled());
    yield call(NavigationService.navigate, 'Auth');
  } catch (error) {
    yield put(signUpRejected(error));
  }
}

function* logoutSaga() {
  try {
    const auth = Firebase.auth();
    yield call([auth, auth.signOut]);
    yield put(logoutFulfilled());
  } catch (error) {
    yield put(logoutRejected(error));
  }
}

function authChannel() {
  return eventChannel(emit => {
    const unsubscribe = Firebase.auth().onAuthStateChanged(
      user => emit({ user }),
      error => emit({ error })
    );
    return unsubscribe;
  });
}

function* syncUserSaga() {
  const channel = yield call(authChannel);

  while (true) {
    const { user } = yield take(channel);
    if (user) {
      yield put(syncUser(user));
      yield call(NavigationService.navigate, 'Drawer');
    } else {
      yield put(syncUser(null));
      yield call(NavigationService.navigate, 'Auth');
    }
  }
}

export default function* authRoot() {
  yield all([
    fork(syncUserSaga),
    takeEvery(LOGIN_REQUESTED, loginSaga),
    takeEvery(LOGOUT_REQUESTED, logoutSaga),
    takeEvery(SIGNUP_REQUESTED, signUpSaga),
  ]);
}
